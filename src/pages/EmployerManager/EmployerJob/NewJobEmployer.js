import React, { useEffect, useState } from 'react';
import { Button, Form, notification, Input, Select, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { TOKEN } from '../../../util/settings/config';
import { getCurrentUserAction } from '../../../redux/actions/UserAction';
import { getCompanyAndJobByTokenAction } from '../../../redux/actions/AccountAction';
import { getJobTypeListAction } from '../../../redux/actions/JobTypeAction';
import { getCompanyListAction, getCompanyIdAction } from '../../../redux/actions/CompanyAction';
import { addJobOfEmployerAction } from '../../../redux/actions/JobAction';



import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.guess()
const { Option } = Select;

const NewJobEmployer = () => {
    const dispatch = useDispatch();
    const [location, setLocation] = useState(0);
    const dateFormat = 'DD-MM-YYYY';
    const { companyDetail } = useSelector(state => state.CompanyReducer)
    let { arrJobType } = useSelector((state) => state.JobTypeReducer);
    const { employerCompanyJob } = useSelector(state => state.AccountReducer);
    console.log(companyDetail);
    console.log(employerCompanyJob?.company?.id);

    let accessToken = {}
    if (localStorage.getItem(TOKEN)) {
        accessToken = localStorage.getItem(TOKEN)
    }

    const listCompany = [companyDetail]


    useEffect(() => {
        if (accessToken != null) {
            dispatch(getCurrentUserAction(accessToken))
            dispatch(getCompanyAndJobByTokenAction(accessToken))
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch(getCompanyListAction());
        dispatch(getJobTypeListAction());
        dispatch(getCompanyIdAction(employerCompanyJob?.company?.id));
    }, [dispatch, location, employerCompanyJob?.company?.id]);



    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            reponsibility: "",
            skill_required: "",
            benefit: "",
            interview_steps: "",
            amount: 10,
            experience_required: "",
            salary_max: "",
            salary_min: "",
            start_date: "",
            end_date: "",
            is_active: "",
        },
        onSubmit: (values) => {
            if (
                values.title === "" ||
                values.description === "" ||
                values.reponsibility === "" ||
                values.skill_required === "" ||
                values.benefit === "" ||
                values.amount === "" ||
                values.experience_required === "" ||
                values.salary_max === "" ||
                values.salary_min === ""
            ) {
                notification.error({
                    closeIcon: true,
                    message: "Error",
                    description: <>Please fill in all required fields.</>,
                });
            } else {
                let formData = new FormData();
                for (let key in values) {
                    formData.append(key, values[key]);
                }
                console.table("formData", [...formData]);
                dispatch(addJobOfEmployerAction(formData));
            }
        },
    });

    const handleChangeCompany = (value) => {
        setLocation(value);
        formik.setFieldValue("company_id", value);
    };

    const handleChangeLocation = (value) => {
        setLocation(value);
        formik.setFieldValue("location_id", value);
    };


    const handleChangeJobType = (value) => {
        formik.setFieldValue("job_type_id", value);
    };

    const handleChangeGender = (value) => {
        formik.setFieldValue("gender", value);
    };

    const handleChangeActive = (value) => {
        formik.setFieldValue("is_active", value);
    };

    const onOkBeginDate = (values) => {
        formik.setFieldValue('start_date', values);
    }

    const onChangeBeginDate = (values) => {
        formik.setFieldValue('start_date', values);
    }
    const onChangeEndDate = (values) => {
        if (values < formik.values.start_date) {
            notification.error({
                closeIcon: true,
                message: 'Error',
                description: (
                    <>End Date must after Begin Date</>
                ),
            });
        } else {
            formik.setFieldValue('end_date', values);
        }
    }
    const onOkEndDate = (values) => {
        if (values < formik.values.start_date) {
            notification.error({
                closeIcon: true,
                message: 'Error',
                description: (
                    <>End Date must after Begin Date</>
                ),
            });
        } else {
            formik.setFieldValue('end_date', values);
        }
    }

    const handleChangeDescription = (e, editor) => {
        const data = editor.getData();
        formik.setFieldValue("description", data);
    };

    const handleChangeBenefit = (e, editor) => {
        const data = editor.getData();
        formik.setFieldValue("benefit", data);
    };

    const handleChangeReponsibility = (e, editor) => {
        const data = editor.getData();
        formik.setFieldValue("reponsibility", data);
    };

    const handleChangeSkillRequired = (e, editor) => {
        const data = editor.getData();
        formik.setFieldValue("skill_required", data);
    };

    const handleChangeInterviewSteps = (e, editor) => {
        const data = editor.getData();
        formik.setFieldValue("interview_steps", data);
    };

    const handleChangeExperienceRequired = (e, editor) => {
        const data = editor.getData();
        formik.setFieldValue("experience_required", data);
    };



    return (
        <div >
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
                <div className="">
                    <div className="">
                        <h2 className="">Create Job :</h2>
                        <Form.Item
                            label="Title"
                            name="title"
                            style={{ minWidth: "100%" }}
                            rules={[
                                {
                                    required: true,
                                    message: "Title is required!",
                                    transform: (value) => value.trim(),
                                },
                            ]}
                        >
                            <Input name="title" onChange={formik.handleChange} />
                        </Form.Item>

                        <Form.Item label="Description">
                            <CKEditor
                                className="rounded-lg overflow-hidden"
                                name="description"
                                editor={ClassicEditor}
                                onChange={(event, editor) => {
                                    handleChangeDescription(event, editor);
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
                        </Form.Item>


                        <Form.Item label="Reponsibility">
                            <CKEditor
                                className="rounded-lg overflow-hidden"
                                name="reponsibility"
                                editor={ClassicEditor}
                                onChange={(event, editor) => {
                                    handleChangeReponsibility(event, editor);
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
                        </Form.Item>

                        <Form.Item label="Skill Required">
                            <CKEditor
                                className="rounded-lg overflow-hidden"
                                name="skill_required"
                                editor={ClassicEditor}
                                onChange={(event, editor) => {
                                    handleChangeSkillRequired(event, editor);
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
                        </Form.Item>


                        <Form.Item
                            label="Benefit"
                        >
                            <CKEditor
                                className="rounded-lg overflow-hidden"
                                name="benefit"
                                editor={ClassicEditor}
                                onChange={(event, editor) => {
                                    handleChangeBenefit(event, editor);
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
                        </Form.Item>


                        <Form.Item
                            label="Interview Steps"
                        >
                            <CKEditor
                                className="rounded-lg overflow-hidden"
                                name="interview_steps"
                                editor={ClassicEditor}
                                onChange={(event, editor) => {
                                    handleChangeInterviewSteps(event, editor);
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
                        </Form.Item>

                        <Form.Item
                            label="Experience Required"
                        >
                            <CKEditor
                                className="rounded-lg overflow-hidden"
                                name="experience_required"
                                editor={ClassicEditor}
                                onChange={(event, editor) => {
                                    handleChangeExperienceRequired(event, editor);
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
                        </Form.Item>

                        <Form.Item
                            label="Amount (* Phải là số ! . Vd: 1,2,3)"
                            name="amount"
                            style={{ minWidth: "100%" }}
                            rules={[
                                {
                                    required: true,
                                    message: "Amount is required!",
                                    transform: (value) => value.trim(),
                                },
                            ]}
                        >
                            <Input name="amount" onChange={formik.handleChange} />
                        </Form.Item>

                        <Form.Item
                            label="Salary Max"
                            name="salary_max"
                            style={{ minWidth: "100%" }}
                            rules={[
                                {
                                    required: true,
                                    message: "Salary Max is required!",
                                    transform: (value) => value.trim(),
                                },
                            ]}
                        >
                            <Input name="salary_max" onChange={formik.handleChange} />
                        </Form.Item>

                        <Form.Item
                            label="Salary Min"
                            name="salary_min"
                            style={{ minWidth: "100%" }}
                            rules={[
                                {
                                    required: true,
                                    message: "Salary Min is required!",
                                    transform: (value) => value.trim(),
                                },
                            ]}
                        >
                            <Input name="salary_min" onChange={formik.handleChange} />
                        </Form.Item>

                        <Form.Item
                            label="Start Date"
                            name="start_date"
                            rules={[
                                {
                                    required: true,
                                    message: 'Start Date can not be blank!',
                                },
                            ]}
                        >
                            <DatePicker name="start_date" rules={[{ required: true, message: 'Start Date can not be blank!' }]} format={day => day.tz("Asia/Saigon").format(dateFormat)} onChange={onChangeBeginDate} onOk={onOkBeginDate} />
                        </Form.Item>

                        <Form.Item
                            label="End Date"
                            name=" end_date"
                            rules={[
                                {
                                    required: true,
                                    message: 'End date can not be blank!',
                                },
                            ]}
                        >
                            <DatePicker format={day => day.tz("Asia/Saigon").format(dateFormat)} onChange={onChangeEndDate} onOk={onOkEndDate} />
                        </Form.Item>

                        <Form.Item
                            label="Active"
                            rules={[
                                {
                                    required: true,
                                    message: "Active cannot be blank!",
                                },
                            ]}
                        >
                            <Select
                                name="enable"
                                onChange={handleChangeActive}
                                placeholder="Choose Active"
                            >
                                <Option value={0}>On</Option>
                                <Option value={1}>Off</Option>
                            </Select>
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
                            <Select
                                name="gender"
                                onChange={handleChangeGender}
                                placeholder="Choose Gender"
                            >
                                <Option value={1}>Male</Option>
                                <Option value={2}>FeMale</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Company"
                            name="company"
                            style={{ minWidth: "100%" }}
                            rules={[
                                {
                                    required: true,
                                    message: "Company is required!",
                                    transform: (value) => value.trim(),
                                },
                            ]}
                        >
                            <Select
                                rules={[{ required: true }]}
                                options={
                                    listCompany ? listCompany?.map((item, index) => ({
                                        key: index,
                                        label: item.name,
                                        value: item.id,
                                    }))
                                        : ""
                                }
                                onChange={handleChangeCompany}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Location"
                            name="location"
                            style={{ minWidth: "100%" }}
                            rules={[
                                {
                                    required: true,
                                    message: "Location is required!",
                                    transform: (value) => value.trim(),
                                },
                            ]}
                        >
                            <Select
                                rules={[{ required: true }]}
                                options={
                                    companyDetail ? companyDetail?.locations?.map((item, index) => ({
                                        key: index,
                                        label: item.name,
                                        value: item.id,
                                    }))
                                        : ""
                                }
                                onChange={handleChangeLocation}
                            />
                        </Form.Item>


                        <Form.Item
                            label="Job Type"
                            name="jobtype"
                            style={{ minWidth: "100%" }}
                            rules={[
                                {
                                    required: true,
                                    message: "Job Type is required!",
                                    transform: (value) => value.trim(),
                                },
                            ]}
                        >
                            <Select
                                rules={[{ required: true }]}
                                options={
                                    arrJobType
                                        ? arrJobType?.data?.map((item, index) => ({
                                            key: index,
                                            label: item.name,
                                            value: item.id,
                                        }))
                                        : ""
                                }
                                onChange={handleChangeJobType}
                            />
                        </Form.Item>

                        <Form.Item label="Action">
                            <Button htmlType="submit">Add New Job</Button>
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default NewJobEmployer;