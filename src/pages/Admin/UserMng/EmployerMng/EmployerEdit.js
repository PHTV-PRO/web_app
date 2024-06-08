import React, { useState } from "react";
import { Form, Input, Button, Select, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmployerByIdAction,
  updateEmployerByIdAction,
} from "../../../../redux/actions/EmployerAction";
import { useFormik } from "formik";
import { useEffect } from "react";
const { Option } = Select;

const ModEdit = (props) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const { empDetail } = useSelector((state) => state.EmployerReducer);
  let { id } = props.match.params;
  useEffect(() => {
    dispatch(getEmployerByIdAction(id));
  }, [dispatch, id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: empDetail?.name,
      email: empDetail?.email,
      password: null,
      address: empDetail?.address,
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
      dispatch(updateEmployerByIdAction(id, formData));
    },
  });


  const onChangeCheck = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <div>
      <h3 className="mb-5">Update infomation mod: {formik.values.name}</h3>
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

export default ModEdit;
