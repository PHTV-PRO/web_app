import React, { useEffect } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';

import { getSubscriptionPlanByAccountAction } from '../../redux/actions/SubscriptionPlanAction';
import { TOKEN } from '../../util/settings/config';



export default function EmployerSubcriptionPlanMng() {
    let { subscriptionPlanByAccount } = useSelector(state => state.SubscriptionPlanReducer);

    console.log(subscriptionPlanByAccount);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSubscriptionPlanByAccountAction(accessToken))
    }, [dispatch])


    let accessToken = {}
    if (localStorage.getItem(TOKEN)) {
        accessToken = localStorage.getItem(TOKEN)
    }

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

    const parseSubsObjecTotArray = [subscriptionPlanByAccount?.subcriptionPlanDTO]
    console.log(parseSubsObjecTotArray);
    const data2 = parseSubsObjecTotArray;

    const data1 = subscriptionPlanByAccount?.subcriptionPlanDTOs;
    console.log(data1);

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
            width: '15%',
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Expiry',
            dataIndex: 'expiry',
            key: 'expiry',
            width: '20%',
            ...getColumnSearchProps('expiry'),
            sorter: (a, b) => a.expiry - b.expiry,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            ...getColumnSearchProps('name'),
            sorter: (a, b) => a.name - b.name,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: '20%',
            ...getColumnSearchProps('price'),
            sorter: (a, b) => a.price - b.price,
            sortDirections: ['descend', 'ascend'],
        },

    ]
    return <div>
        <div className='d-flex mb-3'>
            <h3 className='text-xl'>SubcriptionPlan Management</h3>
            {/* <Button href='/admin/subplanmng/addsubplan' type="primary" className='ml-3 small bg-primary'>+ Add New SubcriptionPlan</Button> */}
        </div>
        <div>
            <div className='mb-20'>
                <h3 className='text-lg italic text-gray-500'>Registered</h3>
                <Table columns={columns} dataSource={data2} rowKey={'id'} />
            </div>
            <div>
                <h3 className='text-lg italic text-gray-500'>Out of Date</h3>
                <Table columns={columns} dataSource={data1} rowKey={'id'} />
            </div>
        </div>
    </div>
}