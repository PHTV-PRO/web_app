import React, { useEffect } from 'react';
import { Form, Input, Button, notification, Select } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { getJobTypeListAction } from '../../../redux/actions/JobTypeAction';
import { getCompanyListAction } from '../../../redux/actions/CompanyAction';
import { addJobAction } from '../../../redux/actions/JobAction';
const { Option } = Select;


const AddNewJob = () => {
    const dispatch = useDispatch();
    let { arrJobType } = useSelector(state => state.JobTypeReducer);
    let { arrCompany } = useSelector(state => state.CompanyReducer);


    console.log(arrJobType);
    console.log(arrCompany);

    useEffect(() => {
        dispatch(getCompanyListAction())
        dispatch(getJobTypeListAction())

    }, [dispatch]);




    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            reponsibility: '',
            skill_required: '',
            benefit: '',
            interview_steps: '',
            amount: 10,
            experience_required: '',
            salary_max: '',
            salary_min: '',
            start_date: "2025-09-05T17:00:00.000+00:00",
            end_date: "2025-09-05T17:00:00.000+00:00",
            is_active: 0,
            location_id: 1,
        },
        onSubmit: (values) => {
            if (values.title == '' || values.description == '' || values.reponsibility == '') {
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
                dispatch(addJobAction(formData));
            }

        }
    })

    const handleChangeCompany = (value) => {
        formik.setFieldValue('company_id', value)
    }
    const handleChangeJobType = (value) => {
        formik.setFieldValue('jobType_id', value)
    }
    const handleChangeGender = (value) => {
        formik.setFieldValue("gender", value);
    }
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
            <h3 className="text-2xl">Add New Job</h3>
            <div className='row'>
                <div className='col-8'>
                    <Form.Item
                        label="Title"
                        name="title"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Title is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="title" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Description is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="description" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Reponsibility"
                        name="reponsibility"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Reponsibility is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="reponsibility" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Skill Required"
                        name="skill_required"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Skill Required is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="skill_required" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Benefit"
                        name="benefit"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Benefit is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="benefit" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Interview Steps"
                        name="interview_steps"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Intervie Steps is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="interview_steps" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Amount"
                        name="amount"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Amount is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="amount" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Experience Required"
                        name="experience_required"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Experience Required is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="experience_required" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Salary Max"
                        name="salary_max"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Salary Max is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="salary_max" onChange={formik.handleChange} />
                    </Form.Item>
                    <Form.Item
                        label="Salary Min"
                        name="salary_min"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Salary Min is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="salary_min" onChange={formik.handleChange} />
                    </Form.Item>

                    {/* <Form.Item
                        label="Start Date"
                        name="start_date"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Start Date is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="start_date" onChange={formik.handleChange} />
                    </Form.Item>
                    <Form.Item
                        label="End Date"
                        name="end_date"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'End Date is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="end_date" onChange={formik.handleChange} />
                    </Form.Item> */}

                    {/* <Form.Item
                        label="Is Active"
                        name="is_active"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Is Active is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="is_active" onChange={formik.handleChange} />
                    </Form.Item> */}

                    <Form.Item
                        label="Gender"
                        rules={[
                            {
                                required: true,
                                message: "Gender cannot be blank!",
                            },
                        ]}
                    >
                        <Select name="gender" onChange={handleChangeGender} placeholder="Choose Gender">
                            <Option value={1}>Male</Option>
                            <Option value={2}>FeMale</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Reponsibility"
                        name="reponsibility"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Reponsibility is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="reponsibility" onChange={formik.handleChange} />
                    </Form.Item>


                    <Form.Item
                        label="Company"
                        name='company'
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Company is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Select
                            rules={[{ required: true }]}
                            options={arrCompany ? arrCompany?.data?.map((item, index) => ({ key: index, label: item.name, value: item.id })) : ''}
                            onChange={handleChangeCompany}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Job Type"
                        name='jobtype'
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Job Type is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Select
                            rules={[{ required: true }]}
                            options={arrJobType ? arrJobType?.data?.map((item, index) => ({ key: index, label: item.name, value: item.id })) : ''}
                            onChange={handleChangeJobType}
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

export default AddNewJob;