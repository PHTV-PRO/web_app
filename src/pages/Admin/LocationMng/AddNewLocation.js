import React, { useEffect } from 'react';
import { Form, Input, Button, notification, Select } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addLocationAction } from '../../../redux/actions/LocationAction';
import { getCityProvinceListAction } from '../../../redux/actions/CityProvinceAction';
import { getCompanyListAction } from '../../../redux/actions/CompanyAction';



const AddNewLocation = () => {
    const dispatch = useDispatch();
    let { arrCompany } = useSelector(state => state.CompanyReducer);
    let { arrCityProvince } = useSelector(state => state.CityProvinceReducer);
    useEffect(() => {
        dispatch(getCityProvinceListAction())
        dispatch(getCompanyListAction())
    }, [dispatch]);


    const formik = useFormik({
        initialValues: {
            name: '',
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
                dispatch(addLocationAction(formData));
            }

        }
    })

    const handleChangeCompany = (value) => {
        formik.setFieldValue('company_id', value)
    }

    const handleChangeCityProvince = (value) => {
        formik.setFieldValue('city_provence_id', value)
    }


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
            <h3 className="text-2xl">Add New Location</h3>
            <div className='row'>
                <div className='col-8'>
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

                    <Form.Item
                        label="Company"
                        name='company'
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Company is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Select
                            rules={[{ required: true }]}
                            options={arrCompany ? arrCompany?.data?.map((item, index) => ({ key: index, label: item.name, value: item.id })) : ''}
                            onChange={handleChangeCompany}
                        />
                    </Form.Item>

                    <Form.Item
                        label="City Province"
                        name='cityProvince'
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'City Province is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Select
                            rules={[{ required: true }]}
                            options={arrCityProvince ? arrCityProvince?.data?.map((item, index) => ({ key: index, label: item.name, value: item.id })) : ''}
                            onChange={handleChangeCityProvince}
                        />
                    </Form.Item>

                    <Form.Item label="Action">
                        <Button htmlType="submit" >Add New Location</Button>
                    </Form.Item>
                </div>
            </div>

        </Form>
    );
};

export default AddNewLocation;