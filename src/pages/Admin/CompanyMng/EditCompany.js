import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, notification, Checkbox } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { faCamera, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { getCompanyIdAction, updateCompanyByIdAction, apiUploadImages } from '../../../redux/actions/CompanyAction';
import { getListAccountAction } from '../../../redux/actions/AccountAction';
import { getLevelListAction } from '../../../redux/actions/LevelAction';
import { getSkillListAction } from '../../../redux/actions/SkillAction';
import LoadingImage from "../../../components/LoadingImage";
const { Option } = Select;

const EditCompany = (props) => {
    const [logoSrc, setLogoSrc] = useState("");
    const [backgroundImageSrc, setBackgroundImageSrc] = useState("");
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedSkillsId, setSelectedSkillsId] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState([]);
    const [selectedLevelId, setSelectedLevelId] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);
    const [loading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const { companyDetail } = useSelector(state => state.CompanyReducer)
    let { arrAccount } = useSelector(state => state.AccountReducer);
    let { arrLevel } = useSelector(state => state.LevelReducer);
    let { arrSkill } = useSelector(state => state.SkillReducer);

    let { id } = props.match.params;
    useEffect(() => {
        dispatch(getListAccountAction())
        dispatch(getLevelListAction())
        dispatch(getSkillListAction());
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
            location: companyDetail?.location,
            nationnality: companyDetail?.nationnality,
            logo_image: companyDetail?.logo_image,
            background_image: companyDetail?.background_image,
            enable: companyDetail?.enable,
            account: companyDetail?.account?.name,
            list_image: companyDetail?.list_image ? companyDetail?.list_image : null
            // backgroundImageSrc:companyDetail?.
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

            }
        }
    })


    // hàm lấy imge khi update
    useEffect(() => {
        const images = companyDetail?.list_image ? JSON.parse(companyDetail?.list_image) : [];
        console.log(images);
        images && setImagePreview(images);
    }, [companyDetail?.list_image])


    const handleChangeEnable = (value) => {
        console.log(value);
        formik.setFieldValue("enable", value);
    };


    const handleChangeSize = (value) => {
        formik.setFieldValue("size", value);
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
    const handleChangeInput = (e, editor, name) => {
        const data = editor.getData();
        formik.setFieldValue(name, data);
    };
    const renderSelectedSkills = () => (
        <div>
            {selectedSkills.map((skillName) => (
                <Button key={skillName} className="mr-2 mb-2">
                    {skillName}
                </Button>
            ))}
        </div>
    );

    const handleFiles = async (e) => {
        // setImagePreview(companyDetail?.list_image);
        e.stopPropagation();
        setIsLoading(true);
        let images = [];
        const files = e.target.files;

        const formData = new FormData();
        for (let i of files) {
            formData.append("file", i);
            formData.append(
                "upload_preset",
                "m7gp003p"
            );
            const response = await apiUploadImages(formData);
            if (response.status === 200)
                images = [...images, response.data?.secure_url];
        }
        setIsLoading(false);
        setImagePreview((pre) => [...pre, ...images]);

        if (formik?.values?.list_image !== null) {
            formik.setFieldValue("list_image", JSON.stringify([...JSON.parse(formik?.values?.list_image), ...images]));
        }
        else {
            formik.setFieldValue("list_image", JSON.stringify([...images]));
        }
    };

    const handleDeleteImage = (image) => {
        // 20:14/64

        let a = formik?.values?.list_image
        setImagePreview((pre) => pre?.filter((item) => item !== image));
        formik.setFieldValue("list_image", JSON.stringify(JSON.parse((a))?.filter((item) => item !== image)));
    };

    const renderSkills = () => (
        <div className="grid grid-cols-3">
            {arrSkill?.data?.map((skill) => (
                <Checkbox
                    key={skill.id}
                    checked={selectedSkills.includes(skill.name)}
                    onChange={() => toggleSkill(skill.name, skill.id)}
                    className="mr-2"
                >
                    {skill.name}
                </Checkbox>
            ))}
        </div>
    );
    const toggleSkill = async (skillName, id) => {
        const newSelectedSkills = [...selectedSkills];
        const newSelectedSkillsId = [...selectedSkillsId];

        if (newSelectedSkills.includes(skillName)) {
            newSelectedSkills.splice(newSelectedSkills.indexOf(skillName), 1);
            newSelectedSkillsId.splice(newSelectedSkillsId.indexOf(id), 1);

        } else {
            newSelectedSkills.push(skillName);
            newSelectedSkillsId.push(id);
        }
        setSelectedSkills(newSelectedSkills);
        setSelectedSkillsId(newSelectedSkillsId);

        let ListId = '';
        if (newSelectedSkillsId.length > 0) {
            newSelectedSkillsId.map(skill => {
                console.log("check");
                ListId += skill.toString() + ",";
            })
            await formik.setFieldValue("skill_id", ListId);
        };

    }

    const toggleLevel = async (name, id) => {
        const newSelectedLevels = [...selectedLevel];
        const newSelectedLevelId = [...selectedLevelId];

        if (newSelectedLevels.includes(name)) {
            newSelectedLevels.splice(newSelectedLevels.indexOf(name), 1);
            newSelectedLevelId.splice(newSelectedLevelId.indexOf(id), 1);

        } else {
            newSelectedLevels.push(name);
            newSelectedLevelId.push(id);
        }
        setSelectedLevel(newSelectedLevels);
        setSelectedLevelId(newSelectedLevelId);

        let ListId = '';
        if (newSelectedLevelId.length > 0) {
            newSelectedLevelId.map(level => {
                console.log("check");
                ListId += level.toString() + ",";
            })
            await formik.setFieldValue("level_id", ListId);
        };

    }

    const renderSelectedLevel = () => (
        <div>
            {selectedLevel.map((level) => (
                <Button key={level} className="mr-2 mb-2">
                    {level}
                </Button>
            ))}
        </div>
    );
    const renderLevel = () => (
        <div className="grid grid-cols-3">
            {arrLevel?.data?.map((level) => (
                <Checkbox
                    key={level.id}
                    checked={selectedLevel.includes(level.name)}
                    onChange={() => toggleLevel(level.name, level.id)}
                    className="mr-2"
                >
                    {level.name}
                </Checkbox>
            ))}
        </div>
    );


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
                        style={{ minWidth: "100%" }}
                        rules={[
                            {
                                required: true,
                                message: "Name is required!",
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="name" onChange={formik.handleChange} value={formik.values.name} />
                    </Form.Item>


                    <Form.Item
                        label="Introduction"
                    >
                        <CKEditor
                            className="rounded-lg overflow-hidden"
                            data={formik.values.introduction}
                            name="introduction"
                            editor={ClassicEditor}
                            onChange={(event, editor) => {
                                handleChangeInput(event, editor, 'introduction')
                            }}
                            onReady={(editor) => {
                                editor.editing.view.change((writer) => {
                                    writer.setStyle(
                                        "height",
                                        "200px",
                                        editor.editing.view.document.getRoot()
                                    );
                                });
                            }}
                        ></CKEditor>
                        {/* <Input name="introduction" onChange={formik.handleChange} value={formik.values.introduction} /> */}
                    </Form.Item>

                    <Form.Item
                        label="Benefit"
                    >
                        <CKEditor
                            className="rounded-lg overflow-hidden"
                            name="benefit"
                            data={formik.values.benefit}
                            editor={ClassicEditor}
                            onChange={(event, editor) => {
                                handleChangeInput(event, editor, 'benefit')
                            }}
                            onReady={(editor) => {
                                editor.editing.view.change((writer) => {
                                    writer.setStyle(
                                        "height",
                                        "200px",
                                        editor.editing.view.document.getRoot()
                                    );
                                });
                            }}
                        ></CKEditor>
                        {/* <Input name="benefit" onChange={formik.handleChange} value={formik.values.benefit} /> */}
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
                        <Select name="size" onChange={handleChangeSize} placeholder="Choose Szie" value={formik.values.size}>
                            <Option value={"1 - 100"}>1 - 100</Option>
                            <Option value={'100 - 500'}>100 - 500</Option>
                            <Option value={'500 - 1000'}>500 - 1000</Option>
                            <Option value={'1000 - 5000'}>1000 - 5000</Option>
                            <Option value={'5000 - 9000'}>5000 - 9000</Option>

                        </Select>
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
                        label="Location"
                        style={{ minWidth: "100%" }}
                        rules={[
                            {
                                required: true,
                                message: "Location is required!",
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="location" onChange={formik.handleChange} value={formik.values.location} />
                    </Form.Item>

                    <Form.Item
                        label="Skill"
                        name="Skill"
                        style={{ minWidth: "100%" }}
                        rules={[
                            {
                                required: true,
                                message: "SKill is required!",
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        {renderSkills()}

                    </Form.Item>
                    <Form.Item
                        label="Skill Selected"
                        name="Skill"
                        style={{ minWidth: "100%" }}
                        rules={[
                            {
                                required: true,
                                message: "SKill is required!",
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        {renderSelectedSkills()}

                    </Form.Item>
                    <Form.Item
                        label="Level"
                        name="Level"
                        style={{ minWidth: "100%" }}
                        rules={[
                            {
                                required: true,
                                message: "SKill is required!",
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        {renderLevel()}

                    </Form.Item>

                    <Form.Item
                        label="Level Selected"
                        name="Level"
                        style={{ minWidth: "100%" }}
                        rules={[
                            {
                                required: true,
                                message: "SKill is required!",
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        {renderSelectedLevel()}

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

                    <Form.Item label="List Image">
                        <div className="w-[70%] mb-6">
                            {/* <h2 className="font-semibold text-xl py-2">Hình Ảnh</h2> */}

                            <div className="w-full">

                                <label
                                    className="w-full border-4 border-blue-200 text-5xl text-gray-300 flex-col gap-6  my-4 items-center justify-center h-[300px] flex border-dashed rounded-md"
                                    htmlFor="file"
                                >
                                    <text className='italic text-gray-700'>
                                        Cập Nhật Hình Ảnh Rõ Ràng
                                    </text>
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
                            <Option value={0}>Off</Option>
                            <Option value={1}>On</Option>
                        </Select>
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