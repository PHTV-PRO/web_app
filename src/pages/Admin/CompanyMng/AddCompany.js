import React, { useEffect, useState } from "react";
import { Form, Input, Button, notification, Select } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getListAccountAction } from "../../../redux/actions/AccountAction";
import { addCompanyAction } from "../../../redux/actions/CompanyAction";

const { Option } = Select;

const AddNewCompany = () => {
    const [logoSrc, setLogoSrc] = useState("");
    const [backgroundSrc, setBackgroundSrc] = useState("");

    const dispatch = useDispatch();
    let { arrAccount } = useSelector((state) => state.AccountReducer);
    console.log(arrAccount);
    useEffect(() => {
        dispatch(getListAccountAction());
    }, [dispatch]);

    const formik = useFormik({
        initialValues: {
            name: "",
            introduction: "",
            benefit: "",
            profession: "",
            size_min: "",
            size_max: "",
            skill: "",
            link_website: "",
            nationnality: "",
            logo_image: "",
            background_image: "",
            enable: "",
        },
        onSubmit: (values) => {
            if (
                values.name === "" ||
                values.introduction === "" ||
                values.benefit === "" ||
                values.profession === "" ||
                values.size_min === "" ||
                values.size_max === "" ||
                values.skill === "" ||
                values.nationnality === "" ||
                // values.background_image === "" ||
                values.introduction === ""
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
                dispatch(addCompanyAction(formData));
            }
        },
    });

    const handleChangeAccount = (value) => {
        formik.setFieldValue("account_id", value);
    };

    const handleChangeEnable = (value) => {
        formik.setFieldValue("enable", value);
    };


    const handleChangeFileLogo = (e) => {
        let file = e.target.files[0];

        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setLogoSrc(e.target.result); //Hình base 64
            };
            formik.setFieldValue("UploadFileLogo", file);
        }
    };

    const handleChangeFileBackground = (e) => {
        let file = e.target.files[0];

        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setBackgroundSrc(e.target.result); //Hình base 64
            };
            formik.setFieldValue("UploadFileBackground", file);
        }
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
            <div className="row">
                <div className="col-8">
                    <Form.Item
                        label="Name"
                        name="name"
                        style={{ minWidth: "100%" }}
                        rules={[
                            {
                                required: true,
                                message: "Name is required!",
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="name" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Introduction"
                        name="introduction"
                        style={{ minWidth: "100%" }}
                        rules={[
                            {
                                required: true,
                                message: "Introduction is required!",
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="introduction" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Benifit"
                        name="benefit"
                        style={{ minWidth: "100%" }}
                        rules={[
                            {
                                required: true,
                                message: "Benifit is required!",
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="benefit" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Profession"
                        name="profession"
                        style={{ minWidth: "100%" }}
                        rules={[
                            {
                                required: true,
                                message: "Profession is required!",
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="profession" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Size Min"
                        name="size_min"
                        style={{ minWidth: "100%" }}
                        rules={[
                            {
                                required: true,
                                message: "Size Min is required!",
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="size_min" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Size Max"
                        name="size_max"
                        style={{ minWidth: "100%" }}
                        rules={[
                            {
                                required: true,
                                message: "Size Max is required!",
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="size_max" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Skill"
                        name="skill"
                        style={{ minWidth: "100%" }}
                        rules={[
                            {
                                required: true,
                                message: "Skill is required!",
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="skill" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Link Website"
                        name="link_website"
                        style={{ minWidth: "100%" }}
                        rules={[
                            {
                                required: true,
                                message: "Link Website is required!",
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="link_website" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="National"
                        name="nationnality"
                        style={{ minWidth: "100%" }}
                        rules={[
                            {
                                required: true,
                                message: "National is required!",
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="nationnality" onChange={formik.handleChange} />
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
                        <Select
                            name="enable"
                            onChange={handleChangeEnable}
                            placeholder="Choose Enable"
                        >
                            <Option value={0}>On</Option>
                            <Option value={1}>Off</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Account"
                        name="account"
                        style={{ minWidth: "100%" }}
                        rules={[
                            {
                                required: true,
                                message: "Account is required!",
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Select
                            rules={[{ required: true }]}
                            options={
                                arrAccount
                                    ? arrAccount?.data?.map((item, index) => ({
                                        key: index,
                                        label: item.name,
                                        value: item.id,
                                    }))
                                    : ""
                            }
                            onChange={handleChangeAccount}
                        />
                    </Form.Item>

                    <Form.Item label="Logo Company">
                        <input
                            name="UploadFileLogo"
                            type="file"
                            onChange={handleChangeFileLogo}
                            accept="image/png, image/jpeg,image/gif,image/png"
                        />
                        <br />
                        {logoSrc ? (
                            <img style={{ width: 500, height: 400, objectFit: "cover", borderRadius: "10%", }} src={logoSrc} alt="..." />
                        ) : (
                            <img style={{ width: 500, height: 400, border: "0.1px solid #ccc", borderRadius: "10%", }} src="/img/placeholder-image.jpg" alt="..." />
                        )}
                    </Form.Item>

                    <Form.Item label="Background Company">
                        <input
                            name="UploadFileBackground"
                            type="file"
                            onChange={handleChangeFileBackground}
                            accept="image/png, image/jpeg,image/gif,image/png"
                        />
                        <br />
                        {backgroundSrc ? (
                            <img style={{ width: 500, height: 400, objectFit: "cover", borderRadius: "10%", }} src={backgroundSrc} alt="..." />
                        ) : (
                            <img style={{ width: 500, height: 400, border: "0.1px solid #ccc", borderRadius: "10%", }} src="/img/placeholder-image.jpg" alt="..." />
                        )}
                    </Form.Item>


                    <Form.Item label="Action">
                        <Button htmlType="submit">Add Company</Button>
                    </Form.Item>
                </div>
            </div>
        </Form>
    );
};

export default AddNewCompany;
