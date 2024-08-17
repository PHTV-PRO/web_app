import React, { useEffect } from 'react';
import { Form, Input, Button, notification, Select } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getLocationIdAction, updateLocationByIdAction } from '../../../redux/actions/LocationAction';
import { getCompanyListAction } from '../../../redux/actions/CompanyAction';
import { getCityProvinceListAction } from '../../../redux/actions/CityProvinceAction';




const EditLocation = (props) => {
    const dispatch = useDispatch();
    const { locationDetail } = useSelector(state => state.LocationReducer)
    let { arrCompany } = useSelector(state => state.CompanyReducer);
    let { arrCityProvince } = useSelector(state => state.CityProvinceReducer);
    console.log(arrCompany, arrCityProvince);
    console.log(locationDetail);

    let { id } = props.match.params;
    useEffect(() => {
        dispatch(getLocationIdAction(id));
        dispatch(getCityProvinceListAction());
        dispatch(getCompanyListAction());
    }, [dispatch, id])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: locationDetail?.name
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
                dispatch(updateLocationByIdAction(id, formData))
            }
        }
    })

    const handleChangeCompany = (value) => {
        formik.setFieldValue('company_id', value)
    }

    const handleChangeCityProvince = (value) => {
        formik.setFieldValue('city_province_id', value)
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
            <h3 className="text-2xl">Edit Location:</h3>
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

                    <Form.Item
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
                        <Select value={formik.values.company} options={arrCompany?.data?.map((item, index) => ({ key: index, label: item.name, value: item.id }))} onChange={handleChangeCompany} />
                    </Form.Item>

                    <Form.Item
                        label="City Province"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'City Province is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Select value={formik.values.cityProvince} options={arrCityProvince?.data?.map((item, index) => ({ key: index, label: item.name, value: item.id }))} onChange={handleChangeCityProvince} />
                    </Form.Item>
                    <Form.Item label="Action">
                        <Button htmlType="submit">Update Location</Button>
                    </Form.Item>
                </div>
            </div>
        </Form>
    );
};

export default EditLocation;