import React, { useEffect } from 'react'
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLocationAction, getLocationListAction } from '../../../redux/actions/LocationAction';


export default function LocationMng() {
    let { arrLocation } = useSelector(state => state.LocationReducer);
    console.log(arrLocation);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getLocationListAction())
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


    const data = arrLocation.data;

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
            width: '25%',
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            ...getColumnSearchProps('name'),
            sorter: (a, b) => a.name - b.name,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Company',
            dataIndex: 'company_id ',
            key: 'company_id ',
            width: '20%',
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
            title: 'City Province',
            dataIndex: 'city_provence_id ',
            key: 'city_provence_id ',
            width: '20%',
            ...getColumnSearchProps('city_provence_id '),
            sorter: (a, b) => a.city_provence_id - b.city_provence_id,
            sortDirections: ['descend', 'ascend'],
            render: (text, cityProvince) => {
                return (<>
                    <span>{cityProvince.cityProvince?.name}</span>
                </>)
            },
        },
        {
            title: 'Manage',
            width: '25%',
            render: (text, location) => {
                return <>
                    <Button key={1} href={`/admin/locationmng/edit/${location.id}`} type="link" icon={<EditOutlined />} onClick={() => {
                    }}></Button>
                    <Button key={2} type="link" danger icon={<DeleteOutlined />} onClick={() => {
                        if (window.confirm('Do you want to delete ' + location.name + '?')) {
                            dispatch(deleteLocationAction(location.id))
                        }
                    }}></Button>
                </>

            }
        },
    ]
    return <div>
        <div className='d-flex mb-3'>
            <h3 className='text-lg'>Location Management</h3>
            <Button href='/admin/locationmng/addlocation' type="primary" className='ml-3 small bg-primary'>+ Add New Location</Button>
        </div>
        <Table columns={columns} dataSource={data} rowKey={'id'} />
    </div>
}
