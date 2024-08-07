import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, notification, DatePicker } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { getJobIdAction, updateJobByIdAction } from '../../../redux/actions/JobAction';
import { getCompanyListAction, getCompanyIdAction } from '../../../redux/actions/CompanyAction';
import { getJobTypeListAction } from "../../../redux/actions/JobTypeAction";

dayjs.extend(customParseFormat);
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.guess()
const { RangePicker } = DatePicker;

const { Option } = Select;

const EmployerEditJob = (props) => {
    const dispatch = useDispatch();
    const dateFormat = 'DD-MM-YYYY';
    const [location, setLocation] = useState(0);

    let { jobDetail } = useSelector(state => state.JobReducer)
    let { arrCompany } = useSelector((state) => state.CompanyReducer);
    let { arrJobType } = useSelector((state) => state.JobTypeReducer);
    const { companyDetail } = useSelector(state => state.CompanyReducer);
    const [selectedDates, setSelectedDates] = useState([
        dayjs(jobDetail?.start_date), // Initial start date (today)
        dayjs(jobDetail?.end_date), // Initial end date (5 days from today)
    ]);
    console.log("check date for all:", selectedDates);


    let { id } = props.match.params;
    useEffect(() => {
        dispatch(getCompanyListAction())
        dispatch(getJobIdAction(id))
        dispatch(getJobTypeListAction())
        dispatch(getCompanyIdAction(location))
    }, [dispatch, id, location])

    // const parseEnddateToString = jobDetail?.end_date?.toString();
    // const parseStartdateToString = jobDetail?.start_date?.toString();
    // console.log(location);
    // console.log(jobDetail?.company?.id);
    // console.log(jobDetail?.location?.id);
    // console.log(typeof (parseEnddateToString));
    // console.log(parseStartdateToString);


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: jobDetail?.title,
            description: jobDetail?.description || 'Không Có',
            reponsibility: jobDetail?.reponsibility,
            skill_required: jobDetail?.skill_required,
            benefit: jobDetail?.benefit,
            interview_steps: jobDetail?.interview_steps,
            amount: jobDetail?.amount,
            salary_max: jobDetail?.salary_max,
            salary_min: jobDetail?.salary_min,
            start_date: dayjs(jobDetail?.start_date),
            end_date: dayjs(jobDetail?.end_date),
            gender: jobDetail?.gender,
            experience_required: jobDetail?.experience_required,
            company_id: jobDetail?.company?.id,
            location_id: jobDetail?.location?.id,
            job_type_id: jobDetail?.jobType?.id,
            _active: jobDetail?._active
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
                dispatch(updateJobByIdAction(id, formData))
            }
        }
    })

    const onDateChange = (value) => {
        formik.setFieldValue('end_date', dayjs(value[0]));
        formik.setFieldValue('start_date', dayjs(value[1]));
    };

    const handleChangeGender = (value) => {
        formik.setFieldValue("gender", value);
    };

    // const handleChangeActive = (value) => {
    //     formik.setFieldValue("is_active", value);
    // };

    // const handleChangeCompany = (value) => {
    //     setLocation(value);
    //     formik.setFieldValue('company_id', value)
    // }

    // const handleChangeLocation = (value) => {
    //     setLocation(value);
    //     formik.setFieldValue("location_id", value);
    // };

    const handleChangeJobType = (value) => {
        formik.setFieldValue('job_type_id', value)
    }




    const handleChangeInput = (e, editor, name) => {
        const data = editor.getData();
        formik.setFieldValue(name, data);
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
            <h3 className="text-2xl">Edit Job: {formik.values.title}</h3>
            <div className='row'>
                <div className='col-12'>
                    <Form.Item
                        label="Title"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Title is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="title" onChange={formik.handleChange} value={formik.values.title} />
                    </Form.Item>

                    <Form.Item
                        label="Description"

                    >
                        <CKEditor
                            className="rounded-lg overflow-hidden"
                            data={formik.values.description}
                            name="description"
                            editor={ClassicEditor}
                            onChange={(event, editor) => {
                                handleChangeInput(event, editor, 'description')
                            }}
                            onReady={(editor) => {
                                editor.editing.view.change((writer) => {
                                    writer.setStyle(
                                        "height",
                                        "200px",
                                        editor.editing.view.document.getRoot()
                                    );
                                });
                            }}
                        ></CKEditor>
                        {/* <Input name="description" onChange={formik.handleChange} value={formik.values.description} /> */}
                    </Form.Item>

                    <Form.Item
                        label="Reponsibility"
                    >
                        <CKEditor
                            className="rounded-lg overflow-hidden"
                            data={formik.values.reponsibility}
                            name="reponsibility"
                            editor={ClassicEditor}
                            onChange={(event, editor) => {
                                handleChangeInput(event, editor, 'reponsibility')
                            }}
                            onReady={(editor) => {
                                editor.editing.view.change((writer) => {
                                    writer.setStyle(
                                        "height",
                                        "200px",
                                        editor.editing.view.document.getRoot()
                                    );
                                });
                            }}
                        ></CKEditor>
                        {/* <Input name="reponsibility" onChange={formik.handleChange} value={formik.values.reponsibility} /> */}
                    </Form.Item>

                    <Form.Item
                        label="Skill Required"
                    >
                        <CKEditor
                            className="rounded-lg overflow-hidden"
                            data={formik.values.skill_required}
                            name="skill_required"
                            editor={ClassicEditor}
                            onChange={(event, editor) => {
                                handleChangeInput(event, editor, 'skill_required')
                            }}
                            onReady={(editor) => {
                                editor.editing.view.change((writer) => {
                                    writer.setStyle(
                                        "height",
                                        "200px",
                                        editor.editing.view.document.getRoot()
                                    );
                                });
                            }}
                        ></CKEditor>
                        {/* <Input name="skill_required" onChange={formik.handleChange} value={formik.values.skill_required} /> */}
                    </Form.Item>

                    <Form.Item
                        label="Benefit "
                    >
                        <CKEditor
                            className="rounded-lg overflow-hidden"
                            data={formik.values.benefit}
                            name="benefit"
                            editor={ClassicEditor}
                            onChange={(event, editor) => {
                                handleChangeInput(event, editor, 'benefit')
                            }}
                            onReady={(editor) => {
                                editor.editing.view.change((writer) => {
                                    writer.setStyle(
                                        "height",
                                        "200px",
                                        editor.editing.view.document.getRoot()
                                    );
                                });
                            }}
                        ></CKEditor>
                        {/* <Input name="benefit" onChange={formik.handleChange} value={formik.values.benefit} /> */}
                    </Form.Item>

                    <Form.Item
                        label="Interview Steps"
                    >
                        <CKEditor
                            className="rounded-lg overflow-hidden"
                            data={formik.values.interview_steps}
                            name="interview_steps"
                            editor={ClassicEditor}
                            onChange={(event, editor) => {
                                handleChangeInput(event, editor, 'interview_steps')
                            }}
                            onReady={(editor) => {
                                editor.editing.view.change((writer) => {
                                    writer.setStyle(
                                        "height",
                                        "200px",
                                        editor.editing.view.document.getRoot()
                                    );
                                });
                            }}
                        ></CKEditor>
                        {/* <Input name="interview_steps" onChange={formik.handleChange} value={formik.values.interview_steps} /> */}
                    </Form.Item>

                    <Form.Item
                        label="Amount"
                        style={{ minWidth: '100%' }}
                        rules={[
                            { required: true, message: 'Amount is required !', transform: (value) => value.trim() },
                            { type: 'number', min: 0, max: 99999 },
                        ]}
                    >
                        <Input name="amount" type="number" onChange={formik.handleChange} value={formik.values.amount} />
                    </Form.Item>

                    <Form.Item
                        label="Experience Required"
                    >
                        <CKEditor
                            className="rounded-lg overflow-hidden"
                            data={formik.values.experience_required}
                            name="experience_required"
                            editor={ClassicEditor}
                            onChange={(event, editor) => {
                                handleChangeInput(event, editor, 'experience_required')
                            }}
                            onReady={(editor) => {
                                editor.editing.view.change((writer) => {
                                    writer.setStyle(
                                        "height",
                                        "200px",
                                        editor.editing.view.document.getRoot()
                                    );
                                });
                            }}
                        ></CKEditor>
                        {/* <Input name="experience_required" onChange={formik.handleChange} value={formik.values.experience_required} /> */}
                    </Form.Item>

                    <Form.Item
                        label="Salary Min"
                        style={{ minWidth: '100%' }}
                        rules={[
                            { required: true, message: 'Salary Min is required !', transform: (value) => value.trim() },
                            { type: 'number', min: 0, max: 99999 },
                        ]}
                    >
                        <Input name="salary_min" type="number" onChange={formik.handleChange} value={formik.values.salary_min} />
                    </Form.Item>

                    <Form.Item
                        label="Salary Max"
                        style={{ minWidth: '100%' }}
                        rules={[
                            { required: true, message: 'Salary Max is required !', transform: (value) => value.trim() },
                            { type: 'number', min: 0, max: 99999 },
                        ]}
                    >
                        <Input name="salary_max" type="number" onChange={formik.handleChange} value={formik.values.salary_max} />
                    </Form.Item>

                    <Form.Item
                        label="Date"
                        name="date"
                        rules={[
                            {
                                required: true,
                                message: ' Date can not be blank!',
                            },
                        ]}
                    >
                        <RangePicker format={day => day.tz("Asia/Saigon").format(dateFormat)} rules={[{ required: true, message: 'Date can not be blank!' }]} onChange={onDateChange} defaultValue={selectedDates} />
                        {/* <DatePicker name="start_date"  format={day => day.tz("Asia/Saigon").format(dateFormat)}   /> */}
                    </Form.Item>


                    <Form.Item
                        label="Gender"
                        rules={[
                            {
                                required: true,
                                message: "Gender cannot be blank!",
                            },
                        ]}
                    >
                        <Select name="gender" onChange={handleChangeGender} placeholder="Choose Gender" value={formik.values.gender}>
                            <Option value={1}>Male</Option>
                            <Option value={2}>FeMale</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Job Type"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Job Type is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Select value={formik.values.jobType} options={arrJobType?.data?.map((item, index) => ({ key: index, label: item.name, value: item.id }))} onChange={handleChangeJobType} />
                    </Form.Item>


                    <Form.Item label="Action">
                        <Button htmlType="submit" >Update Job</Button>
                    </Form.Item>
                </div>
            </div>

        </Form>
    );
};

export default EmployerEditJob;