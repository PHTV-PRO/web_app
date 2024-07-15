import React, { useEffect, useState } from "react";
import { faCamera, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Input, Button, notification, Select } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getListAccountAction } from "../../../redux/actions/AccountAction";
import { addCompanyAction, apiUploadImages } from "../../../redux/actions/CompanyAction";
import LoadingImage from "../../../components/LoadingImage";

const { Option } = Select;

const AddNewCompany = () => {
    const [logoSrc, setLogoSrc] = useState("");
    const [backgroundSrc, setBackgroundSrc] = useState("");
    const [imagePreview, setImagePreview] = useState([]);
    const [loading, setIsLoading] = useState(false);


    const dispatch = useDispatch();

    let { arrAccount } = useSelector((state) => state.AccountReducer);
    console.log(arrAccount);
    useEffect(() => {
        dispatch(getListAccountAction());
    }, [dispatch]);


    const formik = useFormik({
        initialValues: {
            name: "",
            introduction: "",
            benefit: "",
            profession: "",
            size: "",
            // skill: "",
            link_website: "",
            nationnality: "",
            logo_image: "",
            background_image: "",
            enable: "",
            // images: ""
        },
        onSubmit: (values) => {
            if (
                values.name === "" ||
                values.introduction === "" ||
                values.benefit === "" ||
                values.profession === "" ||
                values.size === "" ||
                // values.skill === "" ||
                values.nationnality === "" ||
                // values.background_image === "" ||
                values.introduction === ""
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
                dispatch(addCompanyAction(formData));
            }
        },
    });

    const [payload, setPayload] = useState();

    const handleChangeAccount = (value) => {
        formik.setFieldValue("account_id", value);
    };

    const handleChangeEnable = (value) => {
        formik.setFieldValue("enable", value);
    };

    const handleDeleteImage = (image) => {
        // 20:14/64
        setImagePreview((pre) => pre?.filter((item) => item !== image));
        setPayload((pre) => ({
            ...pre,
            images: pre.images?.filter((item) => item !== image),
        }));
    };


    const handleChangeFileLogo = (e) => {
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

    const handleChangeFileBackground = (e) => {
        let file = e.target.files[0];

        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setBackgroundSrc(e.target.result); //Hình base 64
            };
            formik.setFieldValue("UploadFileBackground", file);
        }
    };

    const handleFiles = async (e) => {
        // e.stopPropagation();
        setIsLoading(true);
        let images = [];
        const files = e.target.files;
        console.log(files);

        const formData = new FormData();
        for (let i of files) {
            formData.append("file", i);
            formData.append(
                "upload_preset",
                "m7gp003p"
            );
            const response = await apiUploadImages(formData);
            console.log(response);
            if (response.status === 200)
                images = [...images, response.data?.secure_url];
        }
        console.log(images);
        setIsLoading(false);
        setImagePreview((pre) => [...pre, ...images]);
        // setPayload((pre) => ({ ...pre, images: [...pre.formik?.images, ...formik?.images] }));
        formik.setFieldValue("imagesTest", JSON.stringify(images));
        console.log(images);
        console.log(typeof (images));
    };

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
            <h3 className="text-2xl">Add New Company</h3>
            <div className="row">
                <div className="col-12">
                    <Form.Item
                        label="Name"
                        name="name"
                        style={{ minWidth: "100%" }}
                        rules={[
                            {
                                required: true,
                                message: "Name is required!",
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="name" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Introduction"
                        name="introduction"
                        style={{ minWidth: "100%" }}
                        rules={[
                            {
                                required: true,
                                message: "Introduction is required!",
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="introduction" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Benifit"
                        name="benefit"
                        style={{ minWidth: "100%" }}
                        rules={[
                            {
                                required: true,
                                message: "Benifit is required!",
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="benefit" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Profession"
                        name="profession"
                        style={{ minWidth: "100%" }}
                        rules={[
                            {
                                required: true,
                                message: "Profession is required!",
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="profession" onChange={formik.handleChange} />
                    </Form.Item>



                    <Form.Item
                        label="Size "
                        name="size"
                        style={{ minWidth: "100%" }}
                        rules={[
                            {
                                required: true,
                                message: "Size  is required!",
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="size" onChange={formik.handleChange} />
                    </Form.Item>

                    {/* <Form.Item
                        label="Skill"
                        name="skill"
                        style={{ minWidth: "100%" }}
                        rules={[
                            {
                                required: true,
                                message: "Skill is required!",
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="skill" onChange={formik.handleChange} />
                    </Form.Item> */}

                    <Form.Item
                        label="Link Website"
                        name="link_website"
                        style={{ minWidth: "100%" }}
                        rules={[
                            {
                                required: true,
                                message: "Link Website is required!",
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="link_website" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="National"
                        name="nationnality"
                        style={{ minWidth: "100%" }}
                        rules={[
                            {
                                required: true,
                                message: "National is required!",
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="nationnality" onChange={formik.handleChange} />
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
                        <Select
                            name="enable"
                            onChange={handleChangeEnable}
                            placeholder="Choose Enable"
                        >
                            <Option value={0}>On</Option>
                            <Option value={1}>Off</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Account"
                        name="account"
                        style={{ minWidth: "100%" }}
                        rules={[
                            {
                                required: true,
                                message: "Account is required!",
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Select
                            rules={[{ required: true }]}
                            options={
                                arrAccount
                                    ? arrAccount?.data?.map((item, index) => ({
                                        key: index,
                                        label: item.name,
                                        value: item.id,
                                    }))
                                    : ""
                            }
                            onChange={handleChangeAccount}
                        />
                    </Form.Item>

                    <Form.Item label="Logo Company">
                        <input
                            name="UploadFileLogo"
                            type="file"
                            onChange={handleChangeFileLogo}
                            accept="image/png, image/jpeg,image/gif,image/png"
                        />
                        <br />
                        {logoSrc ? (
                            <img style={{ width: 500, height: 400, objectFit: "cover", borderRadius: "10%", }} src={logoSrc} alt="..." />
                        ) : (
                            <img style={{ width: 500, height: 400, border: "0.1px solid #ccc", borderRadius: "10%", }} src="/img/placeholder-image.jpg" alt="..." />
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
                            <img style={{ width: 500, height: 400, objectFit: "cover", borderRadius: "10%", }} src={backgroundSrc} alt="..." />
                        ) : (
                            <img style={{ width: 500, height: 400, border: "0.1px solid #ccc", borderRadius: "10%", }} src="/img/placeholder-image.jpg" alt="..." />
                        )}
                    </Form.Item>

                    {/* image */}
                    <Form.Item label="Image">
                        <div className="w-full mb-6">
                            {/* <h2 className="font-semibold text-xl py-2">Hình Ảnh</h2> */}
                            <span className="italic">
                                Cập Nhật Hình Ảnh Rõ Ràng Sẽ Cho Thuê Nhanh Hơn
                            </span>
                            <div className="w-full">
                                <label
                                    className="w-full border-4 border-blue-200 text-5xl text-gray-300 flex-col gap-6  my-4 items-center justify-center h-[300px] flex border-dashed rounded-md"
                                    htmlFor="file"
                                >
                                    {loading ? (
                                        <LoadingImage></LoadingImage>
                                    ) : (
                                        <span className="flex flex-col items-center justify-center gap-6">
                                            <FontAwesomeIcon icon={faCamera}></FontAwesomeIcon>
                                            <div className="text-black text-3xl">Thêm Ảnh</div>
                                        </span>
                                    )}
                                </label>
                                <input
                                    onChange={handleFiles}
                                    type="file"
                                    id="file"
                                    hidden
                                    multiple
                                ></input>
                                {/* <small className="text-red-500 block w-full">
                                    {invalidFields?.some((item) => item.name === "images") &&
                                        invalidFields?.find((item) => item.name === "images")
                                            ?.message}
                                </small> */}
                                <h3 className="font-medium py-2 text-xl">Ảnh Đã Chọn</h3>
                                <div className="flex gap-4 items-center">
                                    {imagePreview?.map((item) => {
                                        return (
                                            <div className="relative " key={item}>
                                                <img
                                                    key={item}
                                                    alt="img-preview"
                                                    src={item}
                                                    className="w-60 h-60 object-cover rounded-md"
                                                ></img>
                                                <span
                                                    title="Xoá"
                                                    className="top-0 text-2xl bg-gray-700 hover:bg-slate-900 text-white rounded-[60%] cursor-pointer right-0 p-2 absolute "
                                                    onClick={() => handleDeleteImage(item)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </Form.Item>


                    <Form.Item label="Action">
                        <Button htmlType="submit">Add Company</Button>
                    </Form.Item>
                </div>
            </div>
        </Form>
    );
};

export default AddNewCompany;
