import React, { useEffect } from 'react';
import { Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { IMAGE } from '../../util/settings/config';

import { getEmployerOfCompanyByIAction } from '../../redux/actions/AccountAction';
import NewJobEmployer from './NewJobEmployer';


const EmployerProfile = () => {
    const dispatch = useDispatch();
    let { userLogin } = useSelector(state => state.UserReducer);
    let { employerCompany } = useSelector(state => state.AccountReducer);

    useEffect(() => {
        if (userLogin?.id) {
            dispatch(getEmployerOfCompanyByIAction(userLogin?.id))
        }
    }, [userLogin])

    return (
        <div >
            <h3 className='mb-4'>Employer Manager:</h3>
            <div className='row mx-10'>
                <div className='col-3'>
                    {userLogin?.image == null || userLogin?.image == ""
                        ? <Avatar size={200} style={{ fontSize: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} icon={userLogin?.email?.substr(0, 1)} />
                        : <div style={{ minWidth: '40px', minHeight: 40, width: 200, height: 200, backgroundSize: 'cover', borderRadius: '50%', backgroundImage: `url(${IMAGE + "/image/upload/" + userLogin.image})` }} />
                    }
                    <div className='mt-3'>
                        <div className=''>
                            <div className='flex items-center'>
                                <h3>{employerCompany?.name}</h3>
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='flex mt-3'>
                                <h3 className='mr-2'>Account:</h3>
                                <text>{employerCompany?.account?.email}</text>
                            </div>
                        </div>

                        <div>
                            <h2 className='mt-3'>Danh Sách Công Việc Đang Tuyển : </h2>
                            <div className='mt-2'>
                                {employerCompany?.jobs?.map((item, i) => {
                                    return (
                                        // <span className="text-left" key={i}>{item}</span>
                                        <h4 className="text-left font-normal" key={i}>{item?.title}</h4>

                                    )
                                })}
                            </div>
                        </div>
                        <div className=''>
                            <Button href={`/admin/empmng/edit/${userLogin?.id}`} className='btn-primary bg-primary mt-3 px-5' type='primary' onClick={() => {
                            }}>Update Information</Button>
                        </div>
                    </div>
                </div>
                <div className='col-7'>
                    <NewJobEmployer></NewJobEmployer>
                </div>
            </div>

        </div>
    );
};

export default EmployerProfile;