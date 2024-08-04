import React, { useEffect, useRef, useState } from "react";
// import { getCompanyIdAction } from "../../../../redux/actions/CompanyAction";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Space, Table } from "antd";
import { SearchOutlined } from '@ant-design/icons';

import Highlighter from "react-highlight-words";
import { getApplicationByJob } from "../../../redux/actions/JobAction";



const ModalApplicationByJob = (props) => {
    console.log(props);
    const dispatch = useDispatch();
    const { arrApplication } = useSelector(state => state.JobReducer)
    const id = props.jobId;
    useEffect(() => {
        dispatch(getApplicationByJob(id))
    }, [dispatch, id])

    console.log(arrApplication);

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
            width: '10%',
            ...getColumnSearchProps('note'),
            sorter: (a, b) => a.note - b.note,
            sortDirections: ['descend', 'ascend'],
            render: (text, index) => { return <p key={index} className='text-ellipsis overflow-hidden line-clamp-2'>{text == null ? "" : text.replace(/<[^>]+>/g, '')}</p> }

        },
        {
            title: 'Name of Candidate',
            dataIndex: 'account',
            key: 'account',
            width: '5%',
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
            width: '5%',
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
            width: '5%',
            ...getColumnSearchProps('account'),
            sorter: (a, b) => a.account - b.account,
            sortDirections: ['descend', 'ascend'],
            render: (text, cv) => {
                return (<>
                    {/* <Link to={cv.cv?.file_name}>Xem CV</Link> */}
                    <a href={cv.cv?.file_name} target="_blank" rel="noopener noreferrer">
                        View Of Curriculum Vitae of Candidate
                    </a>
                </>)
            },

        },
    ]
    return <div>
        <div className='d-flex mb-3'>
            <h3 className='text-lg'>Applcation Job Management</h3>
            {/* <Button href={`/employer/emplnewjob/${companyDetail.id}`} type="primary" className='ml-3 small bg-primary'>+ Add New Job</Button> */}
        </div>
        <Table columns={columns} dataSource={data} rowKey={'id'} />
    </div>

};

export default ModalApplicationByJob;