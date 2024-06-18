import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";
import {
  createAccountAction
} from "../../../../redux/actions/AccountAction";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
const { Option } = Select;

const AddEmployer = () => {
  let userLogin = {};
  const dispatch = useDispatch();
  const [imgSrc, setImgSrc] = useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      gender: "",
      address: "",
      password: "",
      image: "",
      role: "EMPLOYER"
    },
    onSubmit: async (values) => {
      let formData = new FormData();
      for (let key in values) {
        if (key !== "image") {
          formData.append(key, values[key]);
        } else {
          formData.append("image", values["image"]);
        }
      }
      console.table("formData", [...formData]);
      dispatch(createAccountAction(formData));
    },
  });

  const handleChangeGender = (value) => {
    formik.setFieldValue("gender", value);
  }

  const handleChangeFile = (e) => {
    let file = e.target.files[0];

    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result); //Hình base 64
      };
      formik.setFieldValue("UploadFile", file);
    }
  };

  // const handleChangeRole = (value) => {
  //     formik.setFieldValue("role", value);
  // };

  return (
    <div>
      <h3>Add New Employer</h3>
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
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              message: "E-mail is not in the correct format!",
            },
            {
              required: true,
              message: "E-mail cannot be blank!",
            },
          ]}
        >
          <Input name="email" onChange={formik.handleChange} placeholder="Email" />
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
          <Select name="gender" onChange={handleChangeGender} placeholder="Choose Gender">
            <Option value={1}>Male</Option>
            <Option value={2}>FeMale</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          style={{ minWidth: '100%' }}
          rules={[
            {
              required: true,
              message: 'Address is required!',
              transform: (value) => value.trim(),
            },
          ]}
        >
          <Input name="address" onChange={formik.handleChange} />
        </Form.Item>


        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Password cannot be blank!",
            },
          ]}
        >
          <Input.Password name="password" onChange={formik.handleChange} placeholder="Password" />
        </Form.Item>


        <Form.Item label="Image">
          <input
            name="UploadFile"
            type="file"
            onChange={handleChangeFile}
            accept="image/png, image/jpeg,image/gif,image/png"
          />
          <br />
          {imgSrc ? (
            <img style={{ width: 200, height: 200, objectFit: "cover", borderRadius: "50%", }} src={imgSrc} alt="..." />
          ) : (
            <img style={{ width: 200, height: 200, border: "0.1px solid #ccc", borderRadius: "50%", }} src="/img/placeholder-image.jpg" alt="..." />
          )}
        </Form.Item>


        {/* <Form.Item
          name="role"
          label="Role"
          rules={[
            {
              required: true,
              message: " Role User cannot be blank!",
            },
          ]}
        >
          <Select name="role" onChange={handleChangeRole} placeholder="Choose Role User" >
            <Option value="Admin">Admin</Option>
            <Option value="Mod">Mod</Option>
            <Option value="User">User</Option>
          </Select>
        </Form.Item> */}

        <Form.Item label="Action">
          <Button htmlType="submit" className="btn-primary bg-primary" type="primary" > Add User </Button>
        </Form.Item>
      </Form>
    </div>

  );
};


export default AddEmployer;


