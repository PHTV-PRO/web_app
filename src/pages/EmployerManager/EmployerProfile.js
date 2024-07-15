import React, { useEffect } from 'react';
import { Avatar, Button, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { TOKEN } from '../../util/settings/config';


import { getCurrentUserAction } from '../../redux/actions/UserAction';
import { getCompanyAndJobByTokenAction } from '../../redux/actions/AccountAction';
import { getSubscriptionPlanByAccountAction } from '../../redux/actions/SubscriptionPlanAction';

import { history } from '../../App';



const EmployerProfile = () => {
    const dispatch = useDispatch();
    let { userLogin } = useSelector(state => state.UserReducer);
    let { employerCompanyJob } = useSelector(state => state.AccountReducer);
    let { subscriptionPlanByAccount } = useSelector(state => state.SubscriptionPlanReducer);
    console.log(subscriptionPlanByAccount);

    let accessToken = {}
    if (localStorage.getItem(TOKEN)) {
        accessToken = localStorage.getItem(TOKEN)
    }

    useEffect(() => {
        if (TOKEN != null) {
            dispatch(getCurrentUserAction(accessToken))
            dispatch(getCompanyAndJobByTokenAction(accessToken))
            dispatch(getSubscriptionPlanByAccountAction(accessToken))
        }
    }, [dispatch]);

    if (userLogin && (userLogin?.role !== 'EMPLOYER')) {
        history.replace('/')
    }
    return (
        <div >
            <div className='flex mb-4'>
                <h3 className=' flex '>Employer Manager:  </h3>
                <text className='ml-2'>{employerCompanyJob?.company?.name}</text>
            </div>

            <div className='row mx-10 mb-5'>
                <div className='col-6 flex flex-col justify-items-center'>
                    <div className='text-center'>
                        {employerCompanyJob?.image == null || employerCompanyJob?.image == ""
                            ? <Avatar size={200} style={{ fontSize: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} icon={employerCompanyJob?.email?.substr(0, 1)} />
                            : <div style={{ minWidth: '40px', minHeight: 40, width: 200, height: 200, backgroundSize: 'cover', borderRadius: '50%', backgroundImage: `url(${employerCompanyJob.image})` }} />
                        }

                        <div className='shadow-md shadow-yellow-300 w-24 text-center mx-12 mt-4 text-gray-400 bg-opacity-70 bg-yellow-400 rounded-md'>
                            {/* {subscriptionPlanByAccount?.} */}
                            {subscriptionPlanByAccount?.subcriptionPlanDTOs?.map((s, index) =>
                                <p className='flex items-center justify-center m-0 p-2' key={index}>{s.name}</p>
                            )}

                        </div>
                    </div>
                </div>

                <div className='col-6'>
                    <div className='col-6'>
                        <h2 className='text-xl font-bold'>Information of Employer : </h2>
                        <Typography>
                            <pre className='mr-2'>Account: {employerCompanyJob?.email}</pre>
                        </Typography>
                    </div>
                    <div className='col-6 '>
                        <Typography>
                            <pre className='mr-2'>Address: {employerCompanyJob?.address}</pre>
                        </Typography>
                    </div>
                    <div className='col-6 '>
                        <Typography>
                            <pre className='mr-2'>Role: {employerCompanyJob?.role}</pre>
                        </Typography>
                    </div>
                    <div className=''>
                        <Button href={`/admin/empmng/edit/${userLogin?.id}`} className='btn-primary bg-primary mt-3 px-5' type='primary' onClick={() => {
                        }}>Update Information</Button>
                    </div>
                </div>
            </div>
            <div className='mt-20'>
                <div className='flex items-center  mb-3'>
                    <div className='flex items-center'>
                        <h2 className='text-lg font-bold m-0 mr-2 p-0'>Company Management : </h2>
                        <h4 className='text-lg m-0 p-0 mr-2'>{employerCompanyJob?.companyForEmployer?.name}</h4>
                    </div>
                    <Button
                        className='btn-primary bg-primary ml-4'
                        key={1} href={`/employer/company/edit/${employerCompanyJob.companyForEmployer?.id}`} type="link"
                        onClick={() => {

                        }}
                    >Update Company</Button>
                </div>
                <div className=' bg-gray-300 p-2 w-[100%] rounded-xl'>
                    <div>
                        <h2 className='font-bold text-lg'>Introduction :
                            <text className='text-base font-normal ml-2'
                                dangerouslySetInnerHTML={{ __html: employerCompanyJob?.companyForEmployer?.introduction }}
                            >
                            </text>
                        </h2>
                    </div>
                    <div>
                        <h2 className='font-bold text-lg'>Profession :
                            <text className='text-base font-normal ml-2'>
                                {employerCompanyJob.companyForEmployer?.profession}
                            </text>
                        </h2>
                    </div>
                    <div>
                        <h2 className='font-bold text-lg'>Link Website :
                            <a className='text-base font-normal ml-2' href={employerCompanyJob.companyForEmployer?.link_website}>
                                {employerCompanyJob.companyForEmployer?.link_website}
                            </a>
                        </h2>
                    </div>
                    <div>
                        <h2 className='font-bold text-lg'>National :
                            <text className='text-base font-normal ml-2'>
                                {employerCompanyJob.companyForEmployer?.nationnality}
                            </text>
                        </h2>
                    </div>
                    <div>
                        <h2 className='font-bold text-lg'>Benefit :
                            <text className='text-base font-normal ml-2'
                                dangerouslySetInnerHTML={{ __html: employerCompanyJob.companyForEmployer?.benefit }}
                            >
                            </text>
                        </h2>
                    </div>
                    <div>
                        <h2 className='font-bold text-lg'>Size :
                            <text className='text-base font-normal ml-2'>
                                {employerCompanyJob.companyForEmployer?.size || 'Không Có'}
                            </text>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployerProfile;