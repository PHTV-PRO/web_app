import React, { useState } from "react";
import { Form, Input, Button, Select, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    getAccountByIdAction,
    updateAccountByIdAction,
} from "../../../../redux/actions/AccountAction";
import { useFormik } from "formik";
import { useEffect } from "react";
const { Option } = Select;

const AccountEdit = (props) => {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);
    const { accountDetail } = useSelector((state) => state.AccountReducer);
    let { id } = props.match.params;
    useEffect(() => {
        dispatch(getAccountByIdAction(id));
    }, [dispatch, id]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: accountDetail?.name,
            email: accountDetail?.email,
            password: null,
            gender: accountDetail?.gender,
            address: accountDetail?.address,
            image: accountDetail?.image,
            role: accountDetail?.role
        },
        onSubmit: async (values) => {
            let formData = new FormData();
            for (let key in values) {
                if (key !== "avatar") {
                    formData.append(key, values[key]);
                } else {
                    formData.append("avatar", values["avatar"]);
                }
            }
            console.table("formData", [...formData]);
            dispatch(updateAccountByIdAction(id, formData));
        },
    });


    const onChangeCheck = (e) => {
        setChecked(e.target.checked);
    };

    const handleChangeGender = (value) => {
        formik.setFieldValue("gender", value);
    };

    return (
        <div>
            <h3 className="mb-5">Update infomation Candidate: {formik.values.name}</h3>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                onSubmitCapture={formik.handleSubmit}
            >
                <Form.Item
                    label="Name"
                    style={{ minWidth: '100%' }}
                    rules={[
                        {
                            required: true,
                            message: 'Name is required!',
                            transform: (value) => value.trim(),
                        },
                    ]}
                >
                    <Input name="name" onChange={formik.handleChange} value={formik.values.name} />
                </Form.Item>
                <Form.Item
                    label="Email"
                    rules={[
                        {
                            type: "email",
                            message: " E-mail is not in the correct format!",
                        },
                        {
                            required: true,
                            message: "E-mail  cannot be blank!",
                        },
                    ]}
                >
                    <Input
                        disabled
                        className="text-dark"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        placeholder="Email"
                    />
                </Form.Item>

                <Form.Item label="Change password?">
                    <Checkbox checked={checked} onChange={onChangeCheck}></Checkbox>
                </Form.Item>

                {checked ? (
                    <Form.Item
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: "Password  cannot be blank!",
                            },
                        ]}
                    >
                        <Input.Password
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            placeholder="Password"
                        />
                    </Form.Item>
                ) : (
                    ""
                )}

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
                    label="Address"
                    style={{ minWidth: '100%' }}
                    rules={[
                        {
                            required: true,
                            message: 'Address is required!',
                            transform: (value) => value.trim(),
                        },
                    ]}
                >
                    <Input name="address" onChange={formik.handleChange} value={formik.values.address} />
                </Form.Item>

                <Form.Item
                    label="Image"
                    style={{ minWidth: '100%' }}
                    rules={[
                        {
                            required: true,
                            message: 'Image is required!',
                            transform: (value) => value.trim(),
                        },
                    ]}
                >
                    <Input name="image" onChange={formik.handleChange} value={formik.values.image} />
                </Form.Item>

                <Form.Item label="Action">
                    <Button
                        htmlType="submit"
                        className="btn-primary bg-primary"
                        type="primary"
                    >
                        {" "}
                        Update{" "}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AccountEdit;
