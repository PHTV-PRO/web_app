import React, { useEffect } from 'react'
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Form, Table, Drawer,} from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBusAction, enableBusAction, addIndustryAction, getIndustryListAction } from '../../../redux/actions/IndustryAction';


export default function IndustryMng() {
  let { arrIndustry } = useSelector(state => state.IndustryReducer);
  const dispatch = useDispatch();
  const [openIndustry, setOpenIndustry] = useState(false);
  const [openSkill, setOpenSkill] = useState(false);


  useEffect(() => {
    dispatch(getIndustryListAction())
  }, [dispatch])

  const data = arrIndustry.data;
  const showDrawerIndustry = (id) => {
    setOpenIndustry(true);
  };
  const onCloseIndustry = () => {
    setOpenIndustry(false);
  };
  const showDrawerSkill = (id) => {
    console.log("industry id:",id)
    setOpenSkill(true);
  };
  const onCloseSKill = () => {
    setOpenSkill(false);
  };
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id, // Sorter for ID column
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name), // Sorter for Name column
       
    },
    {
      title: 'Skills',
      dataIndex: 'skills',
      key: 'skills',
      render: (skills) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ul style={{ marginRight: '10px' }}>
            { skills.map((skill, index) => (
              <span key={skill.id}>
                {index === skills.length - 1 ? skill.name : skill.name + ', '}
              </span>
            ))}
          </ul>
        </div>
      ),
    },
    {
      key: 'id',
      render: (id, record) => (
        <Button onClick={() => showDrawerSkill(record.id)}>+</Button>
      ),
    },
    {
      title: 'Manage',
      width: '20%',
      render: (text, item) => {
        return <>
          <Button key={1} href={`/admin/industry/edit/${item.id}`}  type="link" icon={<EditOutlined />} onClick={() => {
          }}></Button>
          <Button key={2} type="link" danger icon={<DeleteOutlined />} onClick={() => {
            if (window.confirm('Do you want to delete Industry ' + item.id + '?')) {
              // dispatch(deleteNewsAction(item.id))
            }
          }}></Button>
        </>

      }
    },
  ];
  const onFinishIndustry = (values) => {
    dispatch(addIndustryAction(values))
    console.log('Success:', values);
  };
  const onFinishSkill = (values) => {
    dispatch(addIndustryAction(values))
    console.log('Success:', values);
  };
  
  return <div>
    <div className='d-flex mb-3'>
      <h3 className='text-lg'>Industry Management</h3>
      <Button  type="primary" className='ml-3 small bg-primary' onClick={showDrawerIndustry}>+ Add New Industry</Button>
    </div>

   
    <Table dataSource={data} columns={columns} />
    <Drawer title={"Insert Skill"}  placement="right" onClose={onCloseSKill} open={openSkill}>
        <Form
          name="basic"
          labelCol={{
            span: 10,
          }}
          wrapperCol={{
            span: 25,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinishSkill}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input Industry name!',
              },
            ]}
          >
            <Input placeholder='Enter Industry'/>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 9,
              span: 25,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

      <Drawer title="Insert Industry" placement="right" onClose={onCloseIndustry} open={openIndustry}>
        <Form
          name="basic"
          labelCol={{
            span: 10,
          }}
          wrapperCol={{
            span: 25,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinishIndustry}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input Industry name!',
              },
            ]}
          >
            <Input placeholder='Enter Industry'/>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 9,
              span: 25,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    
  </div>

}
