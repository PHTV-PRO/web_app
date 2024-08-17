import React, { useState } from 'react'
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { EnvironmentOutlined, EuroCircleOutlined, AuditOutlined } from '@ant-design/icons';

import './company.css'
import { registerCompanyAction } from '../../../redux/actions/CompanyAction';


export default function RegisterCompany() {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);
    const [logoSrc, setLogoSrc] = useState("");
    const [backgroundSrc, setBackgroundSrc] = useState("");

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            name_company: '',
            introduction: '',
            benefit: '',
            profession: '',
            size: '',
            link_website: '',
            nationnality: '',
            location: '',
            logo_image: "",
            background_image: "",
        },
        onSubmit: async (values) => {
            if (
                values.name === "" ||
                values.nationnality === ""
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
                dispatch(registerCompanyAction(formData));
            }
        }
    })

    const handleChangeFileLogo = (e) => {
        let file = e.target.files[0];

        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setLogoSrc(e.target.result); //Hình base 64
            };
            formik.setFieldValue("logo_image", file);
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
            formik.setFieldValue("background_image", file);
        }
    };

    // check failed image
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    const onChange = (e) => {
        setChecked(e.target.checked);
    };
    return (
        // py-8 px-8  rounded-2xl mt-5 
        <div className="shadow-xl z-10 flex" >
            <div
                className='w-[500px]  py-8 px-8 rounded-l-lg flex flex-col items-center bg-blue-200/10 justify-around' style={{
                    backgroundImage: 'url(./img/signUpImage.gif)',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            >
                {/* <div className='flex justify-center items-center gap-4'>
                    <div className='p-9 rounded-full bg-red-700'>
                        <div className='text-white text-4xl font-bold flex items-center justify-center'>
                            <AuditOutlined />
                        </div>
                    </div>
                    <div>
                        <h1 className='text-xl text-gray-100 uppercase' style={{ textShadow: '0 0 2px #111' }}>Job announcement</h1>
                        <h1 className='text-lg font-normal text-gray-100' style={{ textShadow: '0 0 2px #111' }}>Get updated with the latest job opportunities from many leading companies</h1>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-4'>
                    <div className='p-9 rounded-full bg-green-500'>
                        <div className='text-white text-4xl font-bold flex items-center justify-center'>
                            <EuroCircleOutlined />
                        </div>
                    </div>
                    <div>
                        <h1 className='text-xl text-gray-100 uppercase' style={{ textShadow: '0 0 2px #111' }}>Find a job easily</h1>
                        <h1 className='text-lg font-normal text-gray-100' style={{ textShadow: '0 0 2px #111' }}>Find a job you love that matches your skills and interests</h1>
                    </div>
                </div>

                <div className='flex justify-center items-center gap-4'>
                    <div className='p-9 rounded-full bg-orange-400'>
                        <div className='text-white text-4xl font-bold flex items-center justify-center'>
                            <EnvironmentOutlined />
                        </div>
                    </div>
                    <div>
                        <h1 className='text-xl text-gray-100 uppercase' style={{ textShadow: '0 0 2px #111' }}>Apply quickly</h1>
                        <h1 className='text-lg font-normal text-gray-100' style={{ textShadow: '0 0 2px #111' }}>Easily apply for multiple positions without wasting time</h1>
                    </div>
                </div> */}
            </div>
            <div className='py-8 px-8  bg-gray-50/80 rounded-r-lg'>
                <h1 className="text-2xl font-bold text-black text-center mb-4">Sign Up Company</h1>
                <Form
                    onSubmitCapture={formik.handleSubmit}
                    className="myScrollBar"
                    id="myScrollBar1"
                >
                    {/* style={{ display: "flex", justifyContent: "space-between" }} */}
                    <div className=''>
                        <div
                            name="basic"
                            className='d-flex flex-col'
                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                            style={{
                                maxWidth: 600,
                                width: 600,
                                marginRight: 10
                            }}
                            initialValues={{
                                remember: false,
                            }}


                            autoComplete="off"
                        >


                            <Form.Item
                                name="email"
                                label=""
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'E-mail is invalid!',
                                    },
                                    {
                                        required: true,
                                        message: 'E-mail is required!',
                                        transform: (value) => value.trim(),
                                    },
                                ]}
                            >
                                <Input name='email' onChange={formik.handleChange} className="d-flex block text-sm py-2.5 px-4 mt-2 rounded-lg w-full border outline-none" placeholder="Email" />
                            </Form.Item>


                            <Form.Item
                                label=""
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Password is required!',
                                        transform: (value) => value.trim(),
                                    },
                                ]}
                            >
                                <Input.Password className="d-flex block text-sm py-2.5 px-4 mt-2 rounded-lg w-full border outline-none" placeholder="Password" />
                            </Form.Item>

                            <Form.Item
                                name="password_confirmation"
                                label=""
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please re-enter your password!',
                                        transform: (value) => value.trim(),
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Password do not match, please try again!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password name="password" onChange={formik.handleChange} className="d-flex block text-sm py-2.5 px-4 mt-2 rounded-lg w-full border outline-none" placeholder="Password confirm" />
                            </Form.Item>

                            <Form.Item
                                name="name_company"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Name Company is required!',
                                        transform: (value) => value.trim(),
                                    },
                                ]}
                            >
                                <Input name="name_company" onChange={formik.handleChange} className="d-flex block text-sm py-2.5 px-4 mt-2 rounded-lg w-full border outline-none" placeholder="Name Company" />

                            </Form.Item>

                            <Form.Item
                                name="introduction"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Introduction is required!',
                                        transform: (value) => value.trim(),
                                    },
                                ]}
                            >
                                <Input name="introduction" onChange={formik.handleChange} className="d-flex block text-sm py-2.5 px-4 mt-2 rounded-lg w-full border outline-none" placeholder="Introduction" />
                            </Form.Item>
                            <Form.Item
                                name="benefit"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Benefit is required!',
                                        transform: (value) => value.trim(),
                                    },
                                ]}
                            >
                                <Input name="benefit" onChange={formik.handleChange} className="d-flex block text-sm py-2.5 px-4 mt-2 rounded-lg w-full border outline-none" placeholder="Benefit" />
                            </Form.Item>

                            <Form.Item
                                name="Profession"
                                rules={[
                                    {
                                        required: true,
                                        message: 'profession is required!',
                                        transform: (value) => value.trim(),
                                    },
                                ]}
                            >
                                <Input name="profession" onChange={formik.handleChange} className="d-flex block text-sm py-2.5 px-4 mt-2 rounded-lg w-full border outline-none" placeholder="Profession" />
                            </Form.Item>

                            <Form.Item
                                name="Size"
                                rules={[
                                    {
                                        required: true,
                                        message: 'size is required!',
                                        transform: (value) => value.trim(),
                                    },
                                ]}
                            >
                                <Input name="size" onChange={formik.handleChange} className="d-flex block text-sm py-2.5 px-4 mt-2 rounded-lg w-full border outline-none" placeholder="Size" />
                            </Form.Item>

                            <Form.Item
                                name="Link website"
                                rules={[
                                    {
                                        required: true,
                                        message: 'link_website is required!',
                                        transform: (value) => value.trim(),
                                    },
                                ]}
                            >
                                <Input name="link_website" onChange={formik.handleChange} className="d-flex block text-sm py-2.5 px-4 mt-2 rounded-lg w-full border outline-none" placeholder="Link website" />
                            </Form.Item>

                            <Form.Item
                                name="nationnality"
                                rules={[
                                    {
                                        required: true,
                                        message: 'National is required!',
                                        transform: (value) => value.trim(),
                                    },
                                ]}
                            >
                                <Input name="nationnality" onChange={formik.handleChange} className="d-flex block text-sm py-2.5 px-4 mt-2 rounded-lg w-full border outline-none" placeholder="National" />
                            </Form.Item>

                            <Form.Item
                                name="location"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Location is required!',
                                        transform: (value) => value.trim(),
                                    },
                                ]}
                            >
                                <Input name="location" onChange={formik.handleChange} className="d-flex block text-sm py-2.5 px-4 mt-2 rounded-lg w-full border outline-none" placeholder="Location" />
                            </Form.Item>

                            <div>
                                <Form.Item label="Logo Company">
                                    <input
                                        name="UploadFileLogo"
                                        type="file"
                                        onChange={handleChangeFileLogo}
                                        accept="image/png, image/jpeg,image/gif,image/png"
                                    />
                                    <br />
                                    {logoSrc ? (
                                        <img style={{ width: 300, height: 200, objectFit: "cover", borderRadius: "10%", }} src={logoSrc} alt="..." />
                                    ) : (
                                        <img style={{ width: 300, height: 200, border: "0.1px solid #ccc", borderRadius: "10%", }} src="/img/placeholder-image.jpg" alt="..." />
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
                                        <img style={{ width: 300, height: 200, objectFit: "cover", borderRadius: "10%", }} src={backgroundSrc} alt="..." />
                                    ) : (
                                        <img style={{ width: 300, height: 200, border: "0.1px solid #ccc", borderRadius: "10%", }} src="/img/placeholder-image.jpg" alt="..." />
                                    )}
                                </Form.Item>
                            </div>



                            <Checkbox checked={checked} onChange={onChange}>
                                Please ensure your information is accurate!!
                            </Checkbox>

                            <div className="text-center">
                                {checked ? <Button htmlType='submit' type='primary' >Sign Up</Button> : <Button htmlType='submit' disabled type='primary' >Sign Up</Button>}
                                <div className="mt-2 text-sm">Already registered? <a href='/' className="underline  cursor-pointer"> Sign In</a></div>
                            </div>
                        </div>

                    </div>
                </Form>
            </div>


        </div>
    )
}




