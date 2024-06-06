import React, { useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getCityProvinceByIdAction, updateCityProvinceByIdAction } from '../../../redux/actions/CityProvinceAction';


const EditCityProvince = (props) => {
    const dispatch = useDispatch();
    const { cityProvinceDetail } = useSelector(state => state.CityProvinceReducer)
    console.log(cityProvinceDetail);

    let { id } = props.match.params;
    useEffect(() => {
        dispatch(getCityProvinceByIdAction(id));
    }, [dispatch, id])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: cityProvinceDetail?.name
        },
        onSubmit: (values) => {
            if (values.name.trim() === '') {
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
                dispatch(updateCityProvinceByIdAction(id, formData))
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
            <h3 className="text-2xl">Edit Level:</h3>
            <div className='row'>
                <div className='col-8'>
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
                    <Form.Item label="Action">
                        <Button htmlType="submit">Update Level</Button>
                    </Form.Item>
                </div>
            </div>
        </Form>
    );
};

export default EditCityProvince;