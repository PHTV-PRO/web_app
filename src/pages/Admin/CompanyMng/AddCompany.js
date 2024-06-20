import React, { useEffect } from 'react';
import { Form, Input, Button, notification, Select } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getListAccountAction } from '../../../redux/actions/AccountAction';
import { addCompanyAction } from '../../../redux/actions/CompanyAction';

const { Option } = Select;


const AddNewCompany = () => {
    const dispatch = useDispatch();
    let { arrAccount } = useSelector(state => state.AccountReducer);
    console.log(arrAccount);
    useEffect(() => {
        dispatch(getListAccountAction())
    }, [dispatch]);




    const formik = useFormik({
        initialValues: {
            name: '',
            introduction: '',
            benefit: '',
            profession: '',
            size_min: '',
            size_max: '',
            skill: '',
            link_website: '',
            nationnality: '',
            logo_image: '',
            background_image: '',
            enable: '',
        },
        onSubmit: (values) => {
            if (values.name == '' || values.introduction == '' || values.benefit == '') {
                notification.error({
                    closeIcon: true,
                    message: 'Error',
                    description: (
                        <>Please fill in all required fields.</>
                    ),
                });
            } else {
                let formData = new FormData();
                for (let key in values) {
                    formData.append(key, values[key]);
                }
                console.table('formData', [...formData])
                dispatch(addCompanyAction(formData));
            }

        }
    })

    const handleChangeAccount = (value) => {
        formik.setFieldValue('account_id', value)
    }

    const handleChangeEnable = (value) => {
        formik.setFieldValue("enable", value);
    };

    return (
        <Form
            onSubmitCapture={formik.handleSubmit}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 16,
            }}
            layout="horizontal"
        >
            <h3 className="text-2xl">Add New Company</h3>
            <div className='row'>
                <div className='col-8'>
                    <Form.Item
                        label="Name"
                        name="name"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Name is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="name" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Introduction"
                        name="introduction"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Introduction is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="introduction" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Benifit"
                        name="benefit"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Benifit is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="benefit" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Profession"
                        name="profession"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Profession is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="profession" onChange={formik.handleChange} />
                    </Form.Item>


                    <Form.Item
                        label="Size Min"
                        name="size_min"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Size Min is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="size_min" onChange={formik.handleChange} />
                    </Form.Item>


                    <Form.Item
                        label="Size Max"
                        name="size_max"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Size Max is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="size_max" onChange={formik.handleChange} />
                    </Form.Item>


                    <Form.Item
                        label="Skill"
                        name="skill"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Skill is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="skill" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Link Website"
                        name="link_website"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Link Website is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="link_website" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="National"
                        name="nationnality"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'National is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="nationnality" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Logo"
                        name="logo_image"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Logo is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="logo_image" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Background"
                        name="background_image"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Background is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="background_image" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Enable"
                        rules={[
                            {
                                required: true,
                                message: "Enable cannot be blank!",
                            },
                        ]}
                    >
                        <Select name="enable" onChange={handleChangeEnable} placeholder="Choose Enable">
                            <Option value={0}>On</Option>
                            <Option value={1}>Off</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Account"
                        name='account'
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Account is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Select
                            rules={[{ required: true }]}
                            options={arrAccount ? arrAccount?.data?.map((item, index) => ({ key: index, label: item.name, value: item.id })) : ''}
                            onChange={handleChangeAccount}
                        />
                    </Form.Item>

                    <Form.Item label="Action">
                        <Button htmlType="submit" >Add Company</Button>
                    </Form.Item>
                </div>
            </div>

        </Form>
    );
};

export default AddNewCompany;