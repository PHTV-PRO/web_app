import React, { useEffect } from 'react'
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyListAction, deleteCompanyAction } from '../../../redux/actions/CompanyAction';


export default function CompanyMng() {
    let { arrCompany } = useSelector(state => state.CompanyReducer);
    console.log(arrCompany);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCompanyListAction())
    }, [dispatch])


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


    const data = arrCompany.data;

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
        // {
        //     title: 'Background Image',
        //     dataIndex: 'background_image',
        //     key: 'background_image',
        //     width: '10%',
        //     ...getColumnSearchProps('background_image'),
        //     sorter: (a, b) => a.background_image - b.background_image,
        //     sortDirections: ['descend', 'ascend'],

        // },
        {
            title: 'Benifit',
            dataIndex: 'benefit',
            key: 'benefit',
            width: '10%',
            ...getColumnSearchProps('benefit'),
            sorter: (a, b) => a.benefit - b.benefit,
            sortDirections: ['descend', 'ascend'],
            render: (text, index) => { return <p key={index} className='text-ellipsis overflow-hidden line-clamp-2'>{'' || text.replace(/<[^>]+>/g, '')}</p> }
        },
        {
            title: 'Enable',
            dataIndex: 'enable',
            key: 'enable',
            width: '5%',
            ...getColumnSearchProps('enable'),
            sorter: (a, b) => a.enable - b.enable,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '5%',
            ...getColumnSearchProps('name'),
            sorter: (a, b) => a.name - b.name,
            sortDirections: ['descend', 'ascend'],
            render: (text, index) => { return <p key={index} className='text-ellipsis overflow-hidden line-clamp-2'>{'' || text.replace(/<[^>]+>/g, '')}</p> }

        },
        {
            title: 'Nationality',
            dataIndex: 'nationnality',
            key: 'nationnality',
            width: '5%',
            ...getColumnSearchProps('nationnality'),
            sorter: (a, b) => a.nationnality - b.nationnality,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Profession',
            dataIndex: 'profession',
            key: 'profession',
            width: '5%',
            ...getColumnSearchProps('profession'),
            sorter: (a, b) => a.profession - b.profession,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Skill',
            dataIndex: 'skill',
            key: 'skill',
            width: '5%',
            ...getColumnSearchProps('skill'),
            sorter: (a, b) => a.skill - b.skill,
            sortDirections: ['descend', 'ascend'],
            render: (text, index) => { return <p key={index} className='text-ellipsis overflow-hidden line-clamp-2'>{'' || text.replace(/<[^>]+>/g, '')}</p> }

        },
        {
            title: "Logo Company",
            dataIndex: "logo_image",
            key: "logo_image",
            width: '5%',

            render: (text, data, index) => {
                return data.logo_image != "null" && data.logo_image != null ? (
                    <img key={index} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: "10%", }}
                        src={`${data.logo_image}`} alt={data.logo_image}
                    />
                ) : (
                    <div>No Image</div>
                );
            },
        },
        {
            title: "Background Company",
            dataIndex: "background_image",
            key: "background_image",
            width: '5%',

            render: (text, data, index) => {
                return data.background_image != "null" && data.background_image != null ? (
                    <img key={index} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: "10%", }}
                        src={`${data.background_image}`} alt={data.background_image}
                    />
                ) : (
                    <div>No Image</div>
                );
            },
        },
        {
            title: 'Account',
            dataIndex: 'account_id ',
            key: 'account_id ',
            width: '5%',
            ...getColumnSearchProps('account_id '),
            sorter: (a, b) => a.account_id - b.account_id,
            sortDirections: ['descend', 'ascend'],
            render: (text, account) => {
                return (<>
                    <span>{account.account?.name}</span>
                </>)
            },
        },
        {
            title: 'Manage',
            width: '5%',
            render: (text, company) => {
                return <>
                    <Button key={1} href={`/admin/companymng/edit/${company.id}`} type="link" icon={<EditOutlined />} onClick={() => {
                    }}></Button>
                    <Button key={2} type="link" danger icon={<DeleteOutlined />} onClick={() => {
                        if (window.confirm('Do you want to delete ' + company.name + '?')) {
                            dispatch(deleteCompanyAction(company.id))
                        }
                    }}></Button>
                </>

            }
        },
    ]
    return <div>
        <div className='d-flex mb-3'>
            <h3 className='text-lg'>Company Management</h3>
            <Button href='/admin/companymng/addcom' type="primary" className='ml-3 small bg-primary'>+ Add New Company</Button>
        </div>
        <Table columns={columns} dataSource={data} rowKey={'id'} />
    </div>
}
