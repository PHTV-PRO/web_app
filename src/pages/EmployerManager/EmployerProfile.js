import React, { useEffect } from 'react';
import { Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { TOKEN } from '../../util/settings/config';
import { getCurrentUserAction } from '../../redux/actions/UserAction';


import { getCompanyAndJobByTokenAction } from '../../redux/actions/AccountAction';
import { deleteJobAction } from '../../redux/actions/JobAction';
import NewJobEmployer from './NewJobEmployer';


const EmployerProfile = () => {
    const dispatch = useDispatch();
    let { userLogin } = useSelector(state => state.UserReducer);
    let { employerCompanyJob } = useSelector(state => state.AccountReducer);
    let accessToken = {}
    if (localStorage.getItem(TOKEN)) {
        accessToken = localStorage.getItem(TOKEN)
    }

    useEffect(() => {
        if (accessToken != null) {
            dispatch(getCurrentUserAction(accessToken))
            dispatch(getCompanyAndJobByTokenAction(accessToken))
        }
    }, [dispatch]);


    return (
        <div >
            <h3 className='mb-4'>Employer Manager:</h3>
            <div className='row mx-10'>
                <div className='col-3'>
                    {employerCompanyJob?.image == null || employerCompanyJob?.image == ""
                        ? <Avatar size={200} style={{ fontSize: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} icon={employerCompanyJob?.email?.substr(0, 1)} />
                        : <div style={{ minWidth: '40px', minHeight: 40, width: 200, height: 200, backgroundSize: 'cover', borderRadius: '50%', backgroundImage: `url(${employerCompanyJob.image})` }} />
                    }
                    <div className='mt-3'>
                        <div className=''>
                            <div className='flex items-center'>
                                <h3>{employerCompanyJob?.company?.name}</h3>
                            </div>

                        </div>
                        <div>
                            <h3><a className='text-base underline' href={`/employer/jobempmng`}>Manage Job Listings</a></h3>
                        </div>
                        <div className='flex'>
                            <div className='flex mt-3'>
                                <h3 className='mr-2'>Account:</h3>
                                <text>{employerCompanyJob?.email}</text>
                            </div>
                        </div>

                        <div className=''>
                            <Button href={`/admin/empmng/edit/${userLogin?.id}`} className='btn-primary bg-primary mt-3 px-5' type='primary' onClick={() => {
                            }}>Update Information</Button>
                        </div>
                    </div>
                </div>
                <div className='col-7'>
                    <NewJobEmployer companyId={employerCompanyJob?.company?.id}></NewJobEmployer>
                </div>
            </div>

        </div>
    );
};

export default EmployerProfile;