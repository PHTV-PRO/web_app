import React, { useEffect } from 'react'
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tabs } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';

import { TOKEN } from '../../../util/settings/config';
// import { getCurrentUserAction } from '../../../redux/actions/UserAction';
import { getCompanyAndJobByTokenAction } from '../../../redux/actions/AccountAction';
import { deleteJobAction } from '../../../redux/actions/JobAction';


export default function EmployerJobMng() {
    let { employerCompanyJob } = useSelector(state => state.AccountReducer);
    console.log(employerCompanyJob);
    console.log(employerCompanyJob?.limit_job);
    console.log(employerCompanyJob?.count_jobs);


    const dispatch = useDispatch();
    let accessToken = {}
    if (localStorage.getItem(TOKEN)) {
        accessToken = localStorage.getItem(TOKEN)
    }
    useEffect(() => {
        dispatch(getCompanyAndJobByTokenAction(accessToken))
    }, []);


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


    const data = employerCompanyJob?.companyForEmployer;

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
            render: (text, index) => { return <p key={index} className='text-ellipsis overflow-hidden line-clamp-2'>{text == null ? "" : text.replace(/<[^>]+>/g, '')}</p> }

        },
        {
            title: 'Skill Required',
            dataIndex: 'skill_required',
            key: 'skill_required',
            width: '5%',
            ...getColumnSearchProps('skill_required'),
            sorter: (a, b) => a.skill_required - b.skill_required,
            sortDirections: ['descend', 'ascend'],
            render: (text, index) => { return <p key={index} className='text-ellipsis overflow-hidden line-clamp-2'>{text == null ? "" : text.replace(/<[^>]+>/g, '')}</p> }

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
            dataIndex: 'company_id',
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
    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
            key: '1',
            label: 'Job Posted',
            children: data?.jobsOpened ? <Table columns={columns} dataSource={data.jobsOpened} defaultDataSource={[]} rowKey={'id'} /> : "",
        },
        {
            key: '2',
            label: 'Upcoming Job',
            children: data?.jobsNotOpen ? <Table columns={columns} dataSource={data.jobsNotOpen} rowKey={'id'} /> : "",
        },
        {
            key: '3',
            children: data?.jobsOpening ? <Table columns={columns} dataSource={data.jobsOpening} rowKey={'id'} /> : "",
            label: 'Jobs Are Recruiting',
        },
    ];

    return <div>
        {/* d-flex mb-3 items-center */}
        <div className=''>
            <div className='d-flex mb-1 items-center'>
                <h3 className='text-lg'>Job Management : </h3>
                {
                    employerCompanyJob?.count_jobs >= employerCompanyJob?.limit_job ?
                        <h3 className=' ml-2 text-base text-gray-500 italic underline'>
                            <a href='/employer/buyScPl'>You've reached your creation limit for job. Upgrade to create more job.</a>
                        </h3> :
                        <Button href='/jobmng/addjob' type="primary" className='ml-3 small bg-primary'>+ Add New Job</Button>
                }
            </div>
            <div className='flex items-center '>
                <h3 className='text-lg text-gray-600 italic'> Jobs created : </h3>
                <h5 className='ml-2 text-base text-gray-500'>{employerCompanyJob?.count_jobs} / {employerCompanyJob?.limit_job}</h5>
            </div>

        </div>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
}
