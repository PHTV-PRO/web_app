import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { getTicketByUserAction } from '../../../redux/actions/OrderAction'
import { Button, Input, Space, Table, Tag, Modal } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words'
import TicketLeaf from '../../../components/TicketLeaf/TicketLeaf'
import dayjs from "dayjs";
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export default function OrderHistory() {
  // const { arrTicket } = useSelector(state => state.OrderReducer)
  let { userLogin } = useSelector(state => state.UserReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donHang, setDonHang] = useState({});
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTicketByUserAction(userLogin?.id))
  }, [dispatch]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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

  const data = arrTicket.reverse();

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
            Tìm
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
      title: 'Ticket Code',
      dataIndex: 'code',
      key: 'code',
      ...getColumnSearchProps('code'),
      sorter: (a, b) => a.code - b.code,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Book Date',
      dataIndex: 'bookDate',
      key: 'bookDate',
      ...getColumnSearchProps('bookDate'),
      sorter: (a, b) => a.bookDate - b.bookDate,
      sortDirections: ['descend', 'ascend'],
      render: (text, ticket) => {
        return dayjs(ticket.bookDate).format("DD-MM-YYYY")
      }
    },
    {
      title: 'From',
      dataIndex: 'trips',
      key: 'trips',
      ...getColumnSearchProps('stations'),
      sortDirections: ['descend', 'ascend'],
      render: (text, ticket) => {
        return ticket.trips.fromStation.name
      }
    },
    {
      title: 'To',
      dataIndex: 'trips',
      key: 'trips',
      ...getColumnSearchProps('trips'),
      sortDirections: ['descend', 'ascend'],
      render: (text, ticket) => {
        return ticket.trips.toStation.name
      }
    },
    {
      title: 'Departure Time',
      dataIndex: 'startTime',
      key: 'startTime',
      ...getColumnSearchProps('startTime'),
      sortDirections: ['descend', 'ascend'],
      render: (text, ticket) => {
        return dayjs(ticket.trips.startTime).format("DD-MM-YYYY h:mm A")
      }
    },
    {
      title: 'Seat List',
      dataIndex: 'seatsList',
      key: 'seatsList',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Status',
      dataIndex: 'isCancel',
      key: 'isCancel',
      ...getColumnSearchProps('isCancel'),
      sortDirections: ['descend', 'ascend'],
      render: (text, ticket) => {
        return ticket.isCancel ? <Tag bordered={false}>Canceled</Tag> : ''
      }
    },
    {
      title: 'Manage',
      width: '15%',
      render: (text, ticket) => {
        let remainDay = dayjs(ticket.trips.startTime).get('date') - dayjs().get('date')
        return <>
          <Button hidden={ticket.isCancel} key={1} icon={<i className="fa-solid fa-ticket"></i>} onClick={() => {
            setDonHang(ticket)
            showModal()
          }}>View Ticket</Button>
          {remainDay < 0 ? ''
            : <Button hidden={ticket.isCancel} key={2} type="link" href={`/users/ordershistory/cancel/` + ticket.code} danger onClick={() => {
            }}>Cancel Ticket</Button>
          }
        </>
      }
    },
  ]
  return <div>
    <div className='d-flex mb-3'>
      <h3 className='text-lg'>Ticket Management</h3>
    </div>
    <Table columns={columns} dataSource={data} rowKey={'id'} />
    <Modal title="View Ticket" open={isModalOpen} width={700} footer={null} maskClosable={true} onOk={handleOk} onCancel={handleCancel}>
      <TicketLeaf donHang={donHang} />
    </Modal>
  </div>
}
