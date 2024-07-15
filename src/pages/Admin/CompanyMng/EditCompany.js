import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, notification } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyIdAction, updateCompanyByIdAction } from '../../../redux/actions/CompanyAction';
import { getListAccountAction } from '../../../redux/actions/AccountAction';

const { Option } = Select;

const EditCompany = (props) => {
    const [logoSrc, setLogoSrc] = useState("");
    const [backgroundImageSrc, setBackgroundImageSrc] = useState("");

    const dispatch = useDispatch();
    const { companyDetail } = useSelector(state => state.CompanyReducer)
    let { arrAccount } = useSelector(state => state.AccountReducer);

    let { id } = props.match.params;
    useEffect(() => {
        dispatch(getListAccountAction())
        dispatch(getCompanyIdAction(id))
    }, [dispatch, id])


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: companyDetail?.name,
            introduction: companyDetail?.introduction,
            benefit: companyDetail?.benefit,
            profession: companyDetail?.profession,
            size: companyDetail?.size,
            link_website: companyDetail?.link_website,
            nationnality: companyDetail?.nationnality,
            logo_image: companyDetail?.logo_image,
            // chuyen thanh mang chua image
            background_image: companyDetail?.background_image,
            enable: companyDetail?.enable,
            account: companyDetail?.account?.name
        },
        onSubmit: (values) => {
            if (values.name == '' || values.introduction == '' || values.benefit == '') {
                notification.error({
                    closeIcon: true,
                    message: 'Error',
                    description: (
                        <>Please fill in all required fields.</>
                    ),
                });
            } else {
                let formData = new FormData();
                for (let key in values) {
                    formData.append(key, values[key]);
                }
                console.table('formData', [...formData])
                dispatch(updateCompanyByIdAction(id, formData))
                // localStorage.removeItem("busStaionDefault");
            }
        }
    })

    const handleChangeEnable = (value) => {
        formik.setFieldValue("enable", value);
    };


    const handleChangeAccount = (value) => {
        formik.setFieldValue('account_id', value)
    }

    const handleChangeLogo = (e) => {
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

    const handleChangeBackgroundImage = (e) => {
        let file = e.target.files[0];

        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setBackgroundImageSrc(e.target.result); //Hình base 64
            };
            formik.setFieldValue("UploadFileBackground", file);
        }
    };

    // const handleChangeStation = (value) => {
    //     formik.setFieldValue('stationId', value)
    // };


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
            <h3 className="text-2xl">Edit Company: {formik.values.name}</h3>
            <div className='row'>
                <div className='col-12'>
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
                        label="Introduction"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Introduction is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="introduction" onChange={formik.handleChange} value={formik.values.introduction} />
                    </Form.Item>

                    <Form.Item
                        label="Benefit"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Benefit is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="benefit" onChange={formik.handleChange} value={formik.values.benefit} />
                    </Form.Item>

                    <Form.Item
                        label="Profession"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Profession is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="profession" onChange={formik.handleChange} value={formik.values.profession} />
                    </Form.Item>

                    <Form.Item
                        label="Size "
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Size  is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="size" onChange={formik.handleChange} value={formik.values.size} />
                    </Form.Item>

                    {/* <Form.Item
                        label="Skill"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Skill is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="skill" onChange={formik.handleChange} value={formik.values.skill} />
                    </Form.Item> */}

                    <Form.Item
                        label="Link Website"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Link Website is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="link_website" onChange={formik.handleChange} value={formik.values.link_website} />
                    </Form.Item>

                    <Form.Item
                        label="Nationnality"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Nationnality is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="nationnality" onChange={formik.handleChange} value={formik.values.nationnality} />
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
                        <Select name="Enable" onChange={handleChangeEnable} placeholder="Choose Enable" value={formik.values.enable}>
                            <Option value={0}>On</Option>
                            <Option value={1}>Off</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Account"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Account is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Select value={formik.values.account} options={arrAccount?.data?.map((item, index) => ({ key: index, label: item.name, value: item.id }))} onChange={handleChangeAccount} />
                    </Form.Item>

                    <Form.Item label="Logo Company">
                        <input
                            name="UploadFileLogo"
                            type="file"
                            onChange={handleChangeLogo}
                            accept="image/png, image/jpeg,image/gif,image/png"
                        />
                        <br />
                        <img style={{ width: 500, height: 400, objectFit: 'cover', borderRadius: '10%', border: "0.1px solid #ccc" }} src={logoSrc === '' ? `${formik.values.logo_image}` : logoSrc} alt="..." />
                    </Form.Item>

                    <Form.Item label="Background Image Company">
                        <input
                            name="UploadFileBackground"
                            type="file"
                            onChange={handleChangeBackgroundImage}
                            accept="image/png, image/jpeg,image/gif,image/png"
                        />
                        <br />
                        <img style={{ width: 500, height: 400, objectFit: 'cover', borderRadius: '10%', border: "0.1px solid #ccc" }} src={backgroundImageSrc === '' ? `${formik.values.background_image}` : backgroundImageSrc} alt="..." />
                    </Form.Item>


                    <Form.Item label="Action">
                        <Button htmlType="submit" >Update Company</Button>
                    </Form.Item>
                </div>
            </div>

        </Form>
    );
};

export default EditCompany;