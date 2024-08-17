import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Space, Table } from "antd";
import { SearchOutlined, EyeOutlined, MailOutlined } from '@ant-design/icons';

import Highlighter from "react-highlight-words";
import { getApplicationByJob, sendMailToCandidateAction } from "../../../redux/actions/JobAction";



const ModalApplicationByJob = (props) => {
    console.log(props);
    const dispatch = useDispatch();
    const { arrApplication } = useSelector(state => state.JobReducer)
    const id = props.jobId;
    useEffect(() => {
        dispatch(getApplicationByJob(id))
    }, [dispatch, id])

    console.log(arrApplication?.data);

    // con

    const data = arrApplication?.data;



    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const resetSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0] = '');
        setSearchedColumn(dataIndex);
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8, }} onKeyDown={(e) => e.stopPropagation()} >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        className='bg-primary'
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && resetSearch(selectedKeys, confirm, dataIndex)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>

                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text, index) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    key={index}
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width: '5%',
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Content',
            dataIndex: 'note',
            key: 'note',
            width: '15%',
            ...getColumnSearchProps('note'),
            sorter: (a, b) => a.note - b.note,
            sortDirections: ['descend', 'ascend'],
            render: (text, index) => { return <p key={index} className='text-ellipsis overflow-hidden line-clamp-2'>{text == null ? "" : text.replace(/<[^>]+>/g, '')}</p> }

        },
        {
            title: 'Name of Candidate',
            dataIndex: 'account',
            key: 'account',
            width: '15%',
            ...getColumnSearchProps('account'),
            sorter: (a, b) => a.account - b.account,
            sortDirections: ['descend', 'ascend'],
            render: (text, account) => {
                return (<>
                    <span>{account.account?.name}</span>
                </>)
            },

        },
        {
            title: 'Email of Candidate',
            dataIndex: 'account',
            key: 'account',
            width: '15%',
            ...getColumnSearchProps('account'),
            sorter: (a, b) => a.account - b.account,
            sortDirections: ['descend', 'ascend'],
            render: (text, account) => {
                return (<>
                    <span>{account.account?.email}</span>
                </>)
            },

        },
        {
            title: 'Curriculum Vitae of Candidate',
            dataIndex: 'account',
            key: 'account',
            width: '40%',
            ...getColumnSearchProps('account'),
            sorter: (a, b) => a.account - b.account,
            sortDirections: ['descend', 'ascend'],
            render: (text, cv) => {
                return (<div className="flex">
                    <a href={cv.cv?.file_name} target="_blank" rel="noopener noreferrer" className="text-xl hover:no-underline text-blue flex items-end justify-center hover:cursor-pointer no-underline border-r-2 pr-4 border-gray-400">
                        <EyeOutlined /> <text className="text-sm ml-2 my-0 py-0 "> View CV</text>
                    </a>
                    <div className="flex text-xl items-center justify-between hover:cursor-pointer pl-4 gap-3 hover:text-blue-400">

                        <Button
                            icon={<MailOutlined />}
                            onClick={() => {
                                dispatch(sendMailToCandidateAction(cv?.id))
                            }}
                        >
                            <text className="text-sm ml-2 my-0 py-0 "> Click! . Send Mail to Candidate</text>
                        </Button>
                    </div>
                </div>)
            },

        },
    ]
    return <div>
        <div className='d-flex mb-3'>
            <h3 className='text-lg'>Applcation Job Management</h3>
        </div>
        <Table columns={columns} dataSource={data} rowKey={'id'} />
    </div>

};

export default ModalApplicationByJob;