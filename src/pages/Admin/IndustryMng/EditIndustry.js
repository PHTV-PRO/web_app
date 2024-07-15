import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getIndustryByIdAction, updateIndustryByIdAction } from '../../../redux/actions/IndustryAction';


const EditIndustry = (props) => {
    const dispatch = useDispatch();
    const { industryDetail } = useSelector(state => state.IndustryReducer)
    console.log(industryDetail);

    let { id } = props.match.params;
    useEffect(() => {
        dispatch(getIndustryByIdAction(id));
    }, [dispatch, id])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: industryDetail?.name
        },
        onSubmit: (values) => {
            let formData = new FormData();
            for (let key in values) {
                formData.append(key, values[key]);
            }
            dispatch(updateIndustryByIdAction(id, formData))
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
            <h3 className="text-2xl">Edit Industry Type:</h3>
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
                    <Form.Item label="Action">
                        <Button htmlType="submit">Update Industry</Button>
                    </Form.Item>
                </div>
            </div>
        </Form>
    );
};

export default EditIndustry;