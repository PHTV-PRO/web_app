import React from "react";
import { Form, Input, Button, notification } from "antd";
import { createEmployerAction } from "../../../../redux/actions/EmployerAction";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";

const AddEmployer = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      address: ""
    },
    onSubmit: (values) => {
      if (values.name === '' && values.email === '' && values.password === '' && values.address === '') {
        notification.error({
          closeIcon: true,
          message: 'Error',
          description: (
            <>
              Please fill in all required fields.
            </>
          ),
        });
      } else {
        let formData = new FormData();
        for (let key in values) {
          formData.append(key, values[key]);
        }
        console.table('formData', [...formData])
        console.log(formData);
        dispatch(createEmployerAction(formData));
      }

    }
  });

  return (
    <div>
      <h3>Add New Employer </h3>
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
              message: 'Name of seat is required!',
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
          <Input
            name="email"
            onChange={formik.handleChange}
            placeholder="Email"
          />
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
          <Input.Password
            name="password"
            onChange={formik.handleChange}
            placeholder="Password"
          />
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

        <Form.Item label="Action">
          <Button
            htmlType="submit"
            className="btn-primary bg-primary"
            type="primary"
          >
            {" "}
            Add Employer{" "}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddEmployer;
