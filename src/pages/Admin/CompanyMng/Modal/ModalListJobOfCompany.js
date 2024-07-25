import React, { useEffect, useRef, useState } from "react";
import { getCompanyIdAction } from "../../../../redux/actions/CompanyAction";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Space, Table } from "antd";
import { SearchOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

import Highlighter from "react-highlight-words";
import { deleteJobAction } from "../../../../redux/actions/JobAction";


const ModalListJobOfCompany = (props) => {
    const dispatch = useDispatch();
    const { companyDetail } = useSelector(state => state.CompanyReducer)

    const id = props.companyId;
    useEffect(() => {
        dispatch(getCompanyIdAction(id))
    }, [dispatch, id])

    const data = companyDetail.jobs



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
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: '5%',
            ...getColumnSearchProps('title'),
            sorter: (a, b) => a.title - b.title,
            sortDirections: ['descend', 'ascend'],
            render: (text, index) => { return <p key={index} className='text-ellipsis overflow-hidden line-clamp-2'>{text = null ? "" : text.replace(/<[^>]+>/g, '')}</p> }

        },
        {
            title: 'Skill Required',
            dataIndex: 'skill_required',
            key: 'skill_required',
            width: '5%',
            ...getColumnSearchProps('skill_required'),
            sorter: (a, b) => a.skill_required - b.skill_required,
            sortDirections: ['descend', 'ascend'],
            render: (text, index) => { return <p key={index} className='text-ellipsis overflow-hidden line-clamp-2'>{text = null ? "" : text.replace(/<[^>]+>/g, '')}</p> }

        },
        {
            title: 'Benefit',
            dataIndex: 'benefit',
            key: 'benefit',
            width: '5%',
            ...getColumnSearchProps('benefit'),
            sorter: (a, b) => a.benefit - b.benefit,
            sortDirections: ['descend', 'ascend'],
            render: (text, index) => { return <p key={index} className='text-ellipsis overflow-hidden line-clamp-2'>{text = null ? "" : text.replace(/<[^>]+>/g, '')}</p> }

        },
        {
            title: 'Company',
            dataIndex: 'company_id ',
            key: 'company_id ',
            width: '5%',
            ...getColumnSearchProps('company_id '),
            sorter: (a, b) => a.company_id - b.company_id,
            sortDirections: ['descend', 'ascend'],
            render: (text, company) => {
                return (<>
                    <span>{company.company?.name}</span>
                </>)
            },
        },
        {
            title: 'Location',
            dataIndex: 'location_id ',
            key: 'location_id ',
            width: '5%',
            ...getColumnSearchProps('location_id '),
            sorter: (a, b) => a.location_id - b.location_id,
            sortDirections: ['descend', 'ascend'],
            render: (text, location) => {
                return (<>
                    <span>{location.location?.name}</span>
                </>)
            },
        },
        {
            title: 'JobType',
            dataIndex: 'job_type_id ',
            key: 'job_type_id ',
            width: '5%',
            ...getColumnSearchProps('job_type_id '),
            sorter: (a, b) => a.job_type_id - b.job_type_id,
            sortDirections: ['descend', 'ascend'],
            render: (text, jobType) => {
                return (<>
                    <span>{jobType.jobType?.name}</span>
                </>)
            },
        },
        {
            title: 'Manage',
            width: '5%',
            render: (text, job) => {
                return <>
                    <Button key={1} href={`/jobmng/edit/${job.id}`} type="link" icon={<EditOutlined />} onClick={() => {
                    }}></Button>

                    <Button key={2} type="link" danger icon={<DeleteOutlined />} onClick={() => {
                        if (window.confirm('Do you want to delete ' + job.title + '?')) {
                            dispatch(deleteJobAction(job.id))
                        }
                    }}></Button>
                </>

            }
        },
    ]
    return <div>
        <div className='d-flex mb-3'>
            <h3 className='text-lg'>Job Management</h3>
            <Button href={`/employer/emplnewjob/${companyDetail.id}`} type="primary" className='ml-3 small bg-primary'>+ Add New Job</Button>
        </div>
        <Table columns={columns} dataSource={data} rowKey={'id'} />
    </div>

};

export default ModalListJobOfCompany;