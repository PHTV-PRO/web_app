import { Fragment, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { HomeOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Button } from 'antd';
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { TOKEN } from "../util/settings/config";
import { history } from "../App";
import UserAvatar from "../components/UserAvatar/UserAvatar";
import { getCurrentUserAction } from "../redux/actions/UserAction";
const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}



export const ProfileTemplate = (props) => { //path, exact, Component
  const dispatch = useDispatch();
  let { userLogin } = useSelector(state => state.UserReducer);
  const { Component, ...restProps } = props;
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer }, } = theme.useToken();

  const selectedKeys = ['/users/profile', '/users/ordershistory']
  const selectedKey = (selectedKeys.indexOf(props.path) + 1).toString();


  let accessToken = {}
  if (localStorage.getItem(TOKEN)) {
    accessToken = localStorage.getItem(TOKEN)
  } else {
    history.replace('/')
  }

  useEffect(() => {
    if (accessToken != null) {
      dispatch(getCurrentUserAction(accessToken))
    }
    window.scrollTo(0, 0);
  }, [dispatch])

  if (userLogin && _.isEmpty(userLogin)) {
    history.replace('/')
  }

  const items = [
    getItem('Your Profile Detail', '1', <NavLink className='text-decoration-none' to="/employer/emprofile"><i className="fa-solid fa-user"></i></NavLink>),
    getItem('Your Job', '2', <NavLink className='text-decoration-none' to="/employer/empljobmng"><i className="fa-solid fa-ticket"></i></NavLink>),
    // getItem('Your Subcription Plan', '3', <NavLink className='text-decoration-none' to="/employer/emplsubmng"><i className="fa-solid fa-ticket"></i></NavLink>),

  ];

  const operations = <Fragment>
    <div className="d-flex">
      <Button type="link" href="/"><HomeOutlined style={{ fontSize: '24px' }} /></Button>
      <UserAvatar />
    </div>
  </Fragment>


  return <Route {...restProps} render={(propsRoute) => { //props.location, props.history, props.match
    return <Fragment>
      <Layout style={{ minHeight: '100vh' }} >
        <Sider width={300} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical text-white text-2xl text-center my-10" >Employer Management</div>
          <Menu theme="dark" defaultSelectedKeys={selectedKey} mode="inline" items={items} />
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
          <Content
            style={{
              margin: '16px',
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              <Component {...propsRoute} />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Fragment>
  }} />
}