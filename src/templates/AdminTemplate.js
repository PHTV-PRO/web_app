import { Fragment, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import {
  HomeOutlined, UserOutlined, SearchOutlined, AuditOutlined,
  ApartmentOutlined, BankOutlined, AimOutlined, CompassOutlined,
  HomeFilled, ContainerOutlined, WalletOutlined, IssuesCloseOutlined
} from '@ant-design/icons';

import { Layout, Menu, theme, Button, Input, Modal, Descriptions } from 'antd';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TOKEN } from "../util/settings/config";
import { history } from "../App";
import UserAvatar from "../components/UserAvatar/UserAvatar";
import { getCurrentUserAction } from "../redux/actions/UserAction";
import { checkTicketAction } from "../redux/actions/OrderAction";
import dayjs from "dayjs";
const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}


export const AdminTemplate = (props) => { //path, exact, Component
  const dispatch = useDispatch();
  let { userLogin } = useSelector(state => state.UserReducer);
  let { ticketDetail } = useSelector(state => state.OrderReducer)
  const { Component, ...restProps } = props;
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  let [code, setCode] = useState(null)
  const { token: { colorBgContainer }, } = theme.useToken();

  const selectedKeys = ['/admin/busmng', '/admin/stationmng', '/admin/theatremng', '/admin/theatrechildmng', '/admin/users',]
  const selectedKey = (selectedKeys.indexOf(props.path) + 1).toString();

  let accessToken = {}
  if (localStorage.getItem(TOKEN)) {
    accessToken = localStorage.getItem(TOKEN)
  } else {
    history.replace('/')
  }

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOnChange = (e) => {
    const searchCode = e.target.value;
    setCode(searchCode.trim());
  }

  const handleCheckTicket = (e) => {
    e.preventDefault();
    showModal()
    if (code !== null) {
      dispatch(checkTicketAction(code.split(' ')));
    }
  }


  useEffect(() => {
    if (accessToken != null) {
      dispatch(getCurrentUserAction(accessToken))
    }
    window.scrollTo(0, 0);
  }, [dispatch])

  if (userLogin && (userLogin?.role !== 'ADMIN' && userLogin?.role !== 'EMPLOYER')) {
    history.replace('/')
  }



  const itemsAdmin = [
    getItem('Industry Management', 'sub1', <IssuesCloseOutlined />, [
      getItem('Industry ', '1', <NavLink className='text-decoration-none' to="/admin/industry"><i className="fa fa-check"></i></NavLink>),
      getItem('Skill ', '11', <NavLink className='text-decoration-none' to="/admin/skillmng"><i className="fa fa-check"></i></NavLink>),
    ]),

    getItem('User Management', 'sub2', <UserOutlined />, [
      getItem('Employer', '2', <NavLink className='text-decoration-none' to="/admin/empmng"><UserOutlined /></NavLink>),
      getItem("Candidate", "3", <NavLink className="text-decoration-none" to="/admin/accmng"><UserOutlined /></NavLink>),
    ]),
    getItem('Areea Management', 'sub3', <CompassOutlined />, [
      getItem('City Province ', '4', <NavLink className='text-decoration-none' to="/admin/cityprovincemng"><BankOutlined /></NavLink>),
      getItem('Location ', '5', <NavLink className='text-decoration-none' to="/admin/locationmng"><AimOutlined /></NavLink>),
    ]),
    getItem('Job Type Management', '6', <NavLink className='text-decoration-none' to="/admin/jobtypemng"><AuditOutlined /></NavLink>),
    getItem('Level Management', '7', <NavLink className='text-decoration-none' to="/admin/levelmng"><ApartmentOutlined /></NavLink>),
    getItem('SubscriptionPlan Management', '8', <NavLink className='text-decoration-none' to="/admin/subplanmng"><ContainerOutlined /></NavLink>),
    getItem('Company Management', '9', <NavLink className='text-decoration-none' to="/admin/companymng"><HomeFilled /></NavLink>),
    getItem('Job Management', '10', <NavLink className='text-decoration-none' to="/admin/jobmng"><WalletOutlined /></NavLink>),
  ]


  const itemsEmployer = [
    getItem('Level Management', '1', <NavLink className='text-decoration-none' to="/admin/levelmng"><ApartmentOutlined /></NavLink>),
    getItem('Areea Management', 'sub1', <CompassOutlined />, [
      getItem('City Province ', '2', <NavLink className='text-decoration-none' to="/admin/cityprovincemng"><BankOutlined /></NavLink>),
      getItem('Location ', '3', <NavLink className='text-decoration-none' to="/admin/locationmng"><AimOutlined /></NavLink>),
    ]),
    getItem('Job Type Management', '4', <NavLink className='text-decoration-none' to="/admin/jobtypemng"><AuditOutlined /></NavLink>),
    getItem('Level Management', '5', <NavLink className='text-decoration-none' to="/admin/levelmng"><ApartmentOutlined /></NavLink>),
    getItem('SubscriptionPlan Management', '6', <NavLink className='text-decoration-none' to="/admin/subplanmng"><ContainerOutlined /></NavLink>),
    getItem('Company Management', '7', <NavLink className='text-decoration-none' to="/admin/companymng"><HomeFilled /></NavLink>),
    getItem('Job Management', '8', <NavLink className='text-decoration-none' to="/admin/jobmng"><WalletOutlined /></NavLink>),
  ]

  let remainHour = dayjs(ticketDetail?.trips?.startTime).diff(dayjs(new Date()), 'hour')

  const operations = <Fragment>
    <div className="d-flex items-center">
      <form className="m-auto" onSubmit={handleCheckTicket}>
        <Input style={{ width: 350 }} onChange={handleOnChange} value={code} placeholder="Check ticket status" prefix={<SearchOutlined />}></Input>
      </form>
      <Button type="link" href="/"><HomeOutlined style={{ fontSize: '24px' }} /></Button>
      <UserAvatar />
    </div>
  </Fragment>

  return <Route {...restProps} render={(propsRoute, index) => {
    return <Fragment key={index}>
      <Layout style={{ minHeight: '100vh', }}>
        <Sider collapsible width={300} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          {userLogin?.role === "ADMIN" ? <div className="demo-logo-vertical text-white text-2xl text-center my-10" >Admin Page</div>
            : <div className="demo-logo-vertical text-white text-2xl text-center my-10" >Employer Page</div>}

          <Menu theme="dark" defaultSelectedKeys={selectedKey} mode="inline" items={userLogin?.role === "ADMIN" ? itemsAdmin : itemsEmployer} />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center',
              paddingRight: '30px'
            }}
          >
            <div>{operations}</div>
          </Header>
          <Content style={{ margin: '16px' }} >
            <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, }} >
              <Component {...propsRoute} />
            </div>
          </Content>
        </Layout>
      </Layout>
      <Modal title={`Check ticket ${ticketDetail?.code || code}`} open={isModalOpen} maskClosable={true} afterClose={() => { code = "" }} footer={null} width={850} onOk={handleOk} onCancel={handleCancel}>
        {ticketDetail?.isCancel ?
          <Descriptions className="text-center mt-3" title="Ticket is already canceled"></Descriptions>
          : ticketDetail != null && ticketDetail != "undefined" ? <div className="pt-3">
            <Descriptions title="Ticket Info">
              <Descriptions.Item label="Customer">{ticketDetail.users.email}</Descriptions.Item>
              <Descriptions.Item label="Seat List">{ticketDetail.seatsList}</Descriptions.Item>
              <Descriptions.Item label="Route">{ticketDetail.trips.fromStation.name} - {ticketDetail.trips.toStation.name}</Descriptions.Item>
              <Descriptions.Item label="Departure Time">{dayjs(ticketDetail.trips.startTime).format("DD-MM-YYYY h:mm A")}</Descriptions.Item>
              <Descriptions.Item label="Arrival Time">{dayjs(ticketDetail.trips.finishTime).format("DD-MM-YYYY h:mm A")}</Descriptions.Item>
              <Descriptions.Item label="Bus Number">{ticketDetail.trips.bus.busPlate}</Descriptions.Item>
              <Descriptions.Item label="Status"><span className="text-green-500 font-semibold">{remainHour < 0 ? "Your bus already departed" : `Your bus is going to depart on next ${remainHour} hour(s)`}</span>  </Descriptions.Item>
            </Descriptions>
          </div> : <Descriptions className="text-center mt-3" title="Ticket not found"></Descriptions>}
      </Modal>
    </Fragment>
  }} />
}