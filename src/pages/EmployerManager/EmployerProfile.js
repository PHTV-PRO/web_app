import React, { useEffect, useState } from 'react';
import { Avatar, Button, Typography, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { TOKEN } from '../../util/settings/config';


import { getCurrentUserAction } from '../../redux/actions/UserAction';
import { getCompanyAndJobByTokenAction } from '../../redux/actions/AccountAction';
import { getSubscriptionPlanByAccountAction, returnBuyScriptionPlan } from '../../redux/actions/SubscriptionPlanAction';

import { history } from '../../App';
import dayjs from 'dayjs';
import { now } from 'moment/moment';



const EmployerProfile = () => {
    const dispatch = useDispatch();
    let { userLogin } = useSelector(state => state.UserReducer);
    let { employerCompanyJob } = useSelector(state => state.AccountReducer);
    let { subscriptionPlanByAccount } = useSelector(state => state.SubscriptionPlanReducer);


    const [isModalOpen, setIsModalOpen] = useState(false);

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
    let URL = window.location.href;
    useEffect(() => {
        const paymentIdRegex = /paymentId=([^&]+)/;
        const payerIdRegex = /PayerID=([^&]+)/;
        const paymentIdMatch = URL.match(paymentIdRegex);
        const payerIdMatch = URL.match(payerIdRegex);
        const paymentId = paymentIdMatch ? paymentIdMatch[1] : null;
        const payerId = payerIdMatch ? payerIdMatch[1] : null;
        if (payerId != null && paymentId != null) {
            dispatch(returnBuyScriptionPlan(paymentId, payerId))

        }

    }, [URL])

    if (userLogin && (userLogin?.role !== 'EMPLOYER')) {
        history.replace('/')
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div >
            <div className='flex mb-4'>
                <h3 className=' flex '>Employer Manager:  </h3>
                <text className='ml-2'>{employerCompanyJob?.company?.name}</text>
            </div>

            <div className='row mx-10 mb-5'>
                <div className='col-3 flex flex-col justify-items-center'>
                    <div className='items-center flex flex-col '>

                        {employerCompanyJob?.image == null || employerCompanyJob?.image == ""
                            ? <Avatar size={200} style={{ fontSize: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} icon={employerCompanyJob?.email?.substr(0, 1)} />
                            : <div style={{ width: 200, height: 150, backgroundSize: 'cover', borderRadius: '50%', backgroundImage: `url(${employerCompanyJob.image})` }} />
                        }

                        {subscriptionPlanByAccount?.subcriptionPlanDTO ? <div className='w-100 cursor-pointer'>  <div onClick={showModal} className='bg-yellow-300 mt-4  rounded-md shadow-md  p-2 shadow-yellow-300   text-center'>

                            <text>
                                {subscriptionPlanByAccount?.subcriptionPlanDTO?.name}
                            </text>
                        </div></div> :
                            <Button href={`/employer/buyScPl`} className='btn-primary bg-primary mt-3 px-5' type='primary' onClick={() => { }}>Buy subscription plan</Button>}

                        <Modal title="Current subscription plan" open={isModalOpen} footer={
                            <>
                                <Button href={`/admin/empmng/edit/${userLogin?.id}`} className='btn-primary bg-primary mt-3 px-5' type='primary' onClick={() => { }}>Renew subscription plan</Button>
                                <Button className='btn-primary bg-primary mt-3 px-5' type='primary' onClick={handleOk}>OK</Button>
                            </>} >
                            <div >
                                Start date:{dayjs(subscriptionPlanByAccount?.subcriptionPlanDTO?.start_date).format("DD-MM-YYYY")}
                            </div><div >
                                End date:{dayjs(subscriptionPlanByAccount?.subcriptionPlanDTO?.end_date).format("DD-MM-YYYY")}
                            </div><div >
                                Price:{(subscriptionPlanByAccount?.subcriptionPlanDTO?.price)} $
                            </div><div >
                                Expiry:{(dayjs(subscriptionPlanByAccount?.subcriptionPlanDTO?.end_date).diff(dayjs(), "days"))} Days
                            </div>
                        </Modal>

                    </div>
                </div>

                <div className='col-6 ml-[200px]'>
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
                        <Button href={`/admin/empmng/edit/${userLogin?.id}`} className='btn-primary bg-primary mt-3 ml-3 px-5' type='primary' onClick={() => {
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
                        key={1} href={`/employer/job/edit/${employerCompanyJob.companyForEmployer?.id}`} type="link"
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