import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { addCityProvinceAction } from '../../../redux/actions/CityProvinceAction';


const AddNewCityProvince = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: ''
        },
        onSubmit: (values) => {
            if (values.name === '') {
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
                // console.log(formData);
                dispatch(addCityProvinceAction(formData));
            }

        }
    })


    return (
        <Form
            onSubmitCapture={formik.handleSubmit}
            labelCol={{
                span: 6,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
        >
            <h3 className="text-2xl">Add New City Province</h3>
            <div className='row'>
                <div className='col-12'>
                    <Form.Item
                        label="Name"
                        name="name"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'City Province is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="name" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item label="Action">
                        <Button htmlType="submit" >Add New City Province</Button>
                    </Form.Item>
                </div>
            </div>

        </Form>
    );
};

export default AddNewCityProvince;