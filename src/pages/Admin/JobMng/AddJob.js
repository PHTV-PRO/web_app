import React, { useEffect, useState } from "react";
import { Form, Input, Button, notification, Select, DatePicker, Checkbox, Switch } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { getJobTypeListAction } from "../../../redux/actions/JobTypeAction";
import { getCompanyIdAction } from "../../../redux/actions/CompanyAction";
import { getLevelListAction } from '../../../redux/actions/LevelAction';
import { addJobAction } from "../../../redux/actions/JobAction";
import { getSkillListAction } from '../../../redux/actions/SkillAction';
import { addJobOfEmployerAction } from "../../../redux/actions/JobAction";
import { getCompanyAndJobByTokenAction } from '../../../redux/actions/AccountAction';
import { getCurrentUserAction } from '../../../redux/actions/UserAction';

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { TOKEN } from '../../../util/settings/config';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
dayjs.extend(customParseFormat);
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.guess()
const { Option } = Select;

const { RangePicker } = DatePicker;

const AddNewJob = (props) => {
    const [location, setLocation] = useState(0);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedSkillsId, setSelectedSkillsId] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState([]);
    const [selectedLevelId, setSelectedLevelId] = useState([]);
    const dateFormat = 'DD-MM-YYYY';
    const dispatch = useDispatch();

    let { arrLevel } = useSelector(state => state.LevelReducer);
    let { arrSkill } = useSelector(state => state.SkillReducer);
    let { arrJobType } = useSelector((state) => state.JobTypeReducer);
    let { userLogin } = useSelector(state => state.UserReducer);
    let { arrCompany } = useSelector((state) => state.CompanyReducer);

    const { companyDetail } = useSelector(state => state.CompanyReducer)
    const { employerCompanyJob } = useSelector(state => state.AccountReducer);

    let accessToken = {}
    if (localStorage.getItem(TOKEN)) {
        accessToken = localStorage.getItem(TOKEN)
    }

    useEffect(() => {
        dispatch(getJobTypeListAction());
        dispatch(getCompanyAndJobByTokenAction(TOKEN))
        dispatch(getLevelListAction())
        dispatch(getCurrentUserAction(accessToken))
        dispatch(getSkillListAction());

    }, [dispatch, location]);

    useEffect(() => {
        // dispatch(getCompanyIdAction(id));
        handleChangeCompany();
        if (userLogin?.role == "EMPLOYER") {
            dispatch(getCompanyAndJobByTokenAction(accessToken))
            console.log("check data", formik?.values?.company_id);
        }
    }, [userLogin])

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
            is_active: "true",
            company_id: employerCompanyJob?.companyForEmployer?.id

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
                if (userLogin?.role === "ADMIN") {
                    dispatch(addJobAction(formData));
                }
                else {
                    dispatch(addJobOfEmployerAction(formData));
                }
            }
        },
    });




    const handleChangeJobType = (value) => {
        formik.setFieldValue("job_type_id", value);
    };
    const handleChangeGender = (value) => {
        formik.setFieldValue("gender", value);
    };
    const handleChangeCompany = () => {
        formik.setFieldValue("company_id", employerCompanyJob?.companyForEmployer?.id);
    };


    const handleChangeActive = (checked) => {
        formik.setFieldValue("is_active", checked.toString());
    };

    const handleChangeInput = (e, editor, name) => {
        const data = editor.getData();
        formik.setFieldValue(name, data);
    };
    const onDateChange = (value) => {
        formik.setFieldValue('end_date', value[0].toString());
        formik.setFieldValue('start_date', value[1].toString());

    };


    const toggleSkill = async (skillName, id) => {
        const newSelectedSkills = [...selectedSkills];
        const newSelectedSkillsId = [...selectedSkillsId];

        if (newSelectedSkills.includes(skillName)) {
            newSelectedSkills.splice(newSelectedSkills.indexOf(skillName), 1);
            newSelectedSkillsId.splice(newSelectedSkillsId.indexOf(id), 1);

        } else {
            newSelectedSkills.push(skillName);
            newSelectedSkillsId.push(id);
        }
        setSelectedSkills(newSelectedSkills);
        setSelectedSkillsId(newSelectedSkillsId);

        let ListId = '';
        if (newSelectedSkillsId.length > 0) {
            newSelectedSkillsId.map(skill => {
                console.log("check");
                ListId += skill.toString() + ",";
            })
            await formik.setFieldValue("skill_id", ListId);
        };

    }

    const toggleLevel = async (name, id) => {
        const newSelectedLevels = [...selectedLevel];
        const newSelectedLevelId = [...selectedLevelId];

        if (newSelectedLevels.includes(name)) {
            newSelectedLevels.splice(newSelectedLevels.indexOf(name), 1);
            newSelectedLevelId.splice(newSelectedLevelId.indexOf(id), 1);

        } else {
            newSelectedLevels.push(name);
            newSelectedLevelId.push(id);
        }
        setSelectedLevel(newSelectedLevels);
        setSelectedLevelId(newSelectedLevelId);

        let ListId = '';
        if (newSelectedLevelId.length > 0) {
            newSelectedLevelId.map(level => {
                console.log("check");
                ListId += level.toString() + ",";
            })
            await formik.setFieldValue("level_id", ListId);
        };

    }

    const renderSelectedSkills = () => (
        <div>
            {selectedSkills.map((skillName) => (
                <Button key={skillName}>
                    {skillName}
                </Button>
            ))}
        </div>
    );
    const renderSkills = () => (
        <div className="grid grid-cols-3">
            {arrSkill?.data?.map((skill) => (
                <Checkbox
                    key={skill.id}
                    checked={selectedSkills.includes(skill.name)}
                    onChange={() => toggleSkill(skill.name, skill.id)}
                    className="mr-2"
                >
                    {skill.name}
                </Checkbox>
            ))}
        </div>
    );
    const renderSelectedLevel = () => (
        <div>
            {selectedLevel.map((level) => (
                <Button key={level}>
                    {level}
                </Button>
            ))}
        </div>
    );
    const renderLevel = () => (
        <div className="grid grid-cols-3">
            {arrLevel?.data?.map((level) => (
                <Checkbox
                    key={level.id}
                    checked={selectedLevel.includes(level.name)}
                    onChange={() => toggleLevel(level.name, level.id)}
                    className="mr-2"
                >
                    {level.name}
                </Checkbox>
            ))}
        </div>
    );

    const checkSalary = (value, salaryMin) => {
        console.log(value);
        if (value <= salaryMin) {
            return "Salary Max must be greater than Salary Min";
        }
        return true;
    };
    const salaryMin = formik.values.salary_min

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
            <h3 className="text-2xl">Add New Job : {companyDetail?.name}</h3>
            <div className="row">
                <div className="col-12">
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
                        <Input name="title" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Description"

                    >
                        <CKEditor
                            className="rounded-lg overflow-hidden"
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
                        <Input name="amount" type="number" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Experience Required"
                    >
                        <CKEditor
                            className="rounded-lg overflow-hidden"
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
                        <Input name="salary_min" type="number" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Salary Max"
                        style={{ minWidth: '100%' }}
                        rules={[
                            { required: true, message: 'Salary Max is required !', transform: (value) => value.trim() },
                            { type: 'number', min: 0, max: 99999 },
                            {
                                validator: checkSalary
                            },
                        ]}

                    >
                        <Input name="salary_max" type="number" onChange={formik.handleChange} />
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
                        <RangePicker format={day => day.tz("Asia/Saigon").format(dateFormat)} rules={[{ required: true, message: 'Date can not be blank!' }]} onChange={onDateChange} />
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
                        <Select name="gender" onChange={handleChangeGender} placeholder="Choose Gender" value={formik.values.gender == 0 ? "ALL" : (formik.values.gender == 1 ? "Male" : "Female")}>
                            <Option value={0}>ALl</Option>
                            <Option value={1}>Male</Option>
                            <Option value={2}>FeMale</Option>
                        </Select>
                    </Form.Item>

                    {userLogin?.role == "ADMIN" ? <Form.Item
                        label="Company"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Company is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Select value={formik.values.company_id} options={arrCompany?.data?.map((item, index) => ({ key: index, label: item.name, value: item.id }))} onChange={handleChangeCompany} />
                    </Form.Item> : ""
                    }
                    <Form.Item
                        label="Skill"
                        name="Skill"
                        style={{ minWidth: "100%" }}
                        rules={[
                            {
                                required: true,
                                message: "SKill is required!",
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        {renderSkills()}

                    </Form.Item>
                    <Form.Item
                        label="Skill Selected"
                        name="Skill"
                        style={{ minWidth: "100%" }}
                        rules={[
                            {
                                required: true,
                                message: "SKill is required!",
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        {renderSelectedSkills()}

                    </Form.Item>

                    <Form.Item
                        label="Level"
                        name="Level"
                        style={{ minWidth: "100%" }}
                        rules={[
                            {
                                required: true,
                                message: "SKill is required!",
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        {renderLevel()}

                    </Form.Item>

                    <Form.Item
                        label="Level Selected"
                        name="Level"
                        style={{ minWidth: "100%" }}
                        rules={[
                            {
                                required: true,
                                message: "SKill is required!",
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        {renderSelectedLevel()}

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
                        <Select value={formik.values.job_type_id} options={arrJobType?.data?.map((item, index) => ({ key: index, label: item.name, value: item.id }))} onChange={handleChangeJobType} />
                    </Form.Item>

                    <Form.Item label="Action">
                        <Button htmlType="submit">Add Job</Button>
                    </Form.Item>

                </div>
            </div>
        </Form>
    );
};

export default AddNewJob;
