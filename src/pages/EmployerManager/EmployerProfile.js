import React, { useEffect, useState } from 'react';
import { Button, Modal, Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
    CheckOutlined, DollarOutlined
} from '@ant-design/icons';


import dayjs from 'dayjs';
import { TOKEN } from '../../util/settings/config';
import { getCurrentUserAction } from '../../redux/actions/UserAction';
import { getCompanyAndJobByTokenAction, getCompanyForEmployerFromAdminById } from '../../redux/actions/AccountAction';
import { getSubscriptionPlanByAccountAction, getSubscriptionPlanFromAdminByIdAccountAction, returnBuyScriptionPlan } from '../../redux/actions/SubscriptionPlanAction';
import { getDataChartOfEmployer, getDataChartOfEmployerFromAdminById } from '../../redux/actions/JobAction';
import EmployerJobMng from './EmployerJob/EmployerJobMng';
import ChartOfEmployer from './Chart/ChartOfEmployer';
import SummaryDetailOfEmployer from './Summary/summaryDetailOfEmployer';
import { history } from '../../App';




const EmployerProfile = (props) => {
    const dispatch = useDispatch();
    let id = props.match.params;
    let { userLogin } = useSelector(state => state.UserReducer);
    let { employerCompanyJob } = useSelector(state => state.AccountReducer);
    let { subscriptionPlanByAccount } = useSelector(state => state.SubscriptionPlanReducer);
    let { dataCompanyForEmployerFromAdmin } = useSelector(state => state.AccountReducer);
    let { chartEmployerFromAdminById } = useSelector(state => state.JobReducer);
    let { dataChartOfEmployerById } = useSelector(state => state.JobReducer);
    let { arrDataSubcriptionPlanFromAdmin } = useSelector(state => state.SubscriptionPlanReducer);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOfCompanyOpen, setIsModalOfCompany] = useState(false);
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

    useEffect(() => {
        if (userLogin?.role === "EMPLOYER") {
            dispatch(getDataChartOfEmployer(userLogin?.id))
        } else if (userLogin?.role === "ADMIN") {
            dispatch(getCompanyForEmployerFromAdminById(id?.id))
            dispatch(getDataChartOfEmployerFromAdminById(id?.id))
            dispatch(getSubscriptionPlanFromAdminByIdAccountAction(id?.id))
        }
    }, [userLogin])

    console.log(userLogin);

    let URL = window.location.href;
    //subcription plan
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

    const showModal = () => {
        setIsModalOpen(true);
    };


    const showModalOfCompany = () => {
        setIsModalOfCompany(true);
    }
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOfCompanyOk = () => {
        setIsModalOfCompany(false);
    };

    const handleOfCompanyCancel = () => {
        setIsModalOfCompany(false);
    };


    return (
        <div className='p-4'>
            <div className="grid grid-cols-3 gap-2">
                <div class="col-span-2">
                    <SummaryDetailOfEmployer chartEmployerFromAdminById={chartEmployerFromAdminById} dataChartOfEmployer={dataChartOfEmployerById}></SummaryDetailOfEmployer>
                </div>

                <div className=''>
                    <div className='bg-gray-100 my-6 p-6 rounded-md shadow-md'>
                        <div className='flex justify-between'>
                            {
                                userLogin?.role === "ADMIN" ? <div className='mr-2 font-extrabold text-lg'>Hello {dataCompanyForEmployerFromAdmin?.email}</div>
                                    : <div className='mr-2 font-extrabold text-lg'>Hello {employerCompanyJob?.email}</div>
                            }
                            <div >
                                <Button onClick={() => {
                                    showModalOfCompany()
                                }}> <i class="fa-solid fa-arrow-up-right-from-square"></i></Button>
                                {/* Modal of Company Detail */}
                                <Modal width={'90%'} title="Your Company Detail" open={isModalOfCompanyOpen} onOk={handleOfCompanyOk} onCancel={handleOfCompanyCancel}>
                                    <div className='mt-1 '>
                                        <div className='w-[100%] h-[100%] px-20 bg-white mb-10'>
                                            <Carousel style={{ padding: '20px' }} autoplay>
                                                {employerCompanyJob?.companyForEmployer?.list_image?.length || dataCompanyForEmployerFromAdmin?.companyForEmployer?.list_image?.length > 0 ? JSON.parse(employerCompanyJob?.companyForEmployer?.list_image || dataCompanyForEmployerFromAdmin?.companyForEmployer?.list_image).map((image, i) => {
                                                    return (
                                                        <div className=''>
                                                            <img
                                                                key={i}
                                                                className=' w-[100%] object-cover  rounded-lg border-solid border-gray-300 flex items-center h-[700px]'
                                                                src={image}
                                                                alt="..." />

                                                        </div>
                                                    )
                                                }) :
                                                    <img className=' w-[100%] object-cover  rounded-lg border-solid border-gray-300 flex items-center h-[700px]' src="/img/placeholder-image.jpg" alt="..." />
                                                }
                                            </Carousel>
                                        </div>
                                        <div className='flex items-center px-20 mt-10 mb-4'>
                                            <div className='flex items-center'>
                                                <h2 className='text-lg font-bold m-0 mr-2 p-0 '>Company Management : </h2>
                                                <h4 className='text-lg m-0 p-0 mr-2'>{employerCompanyJob?.companyForEmployer?.name || dataCompanyForEmployerFromAdmin?.companyForEmployer?.name}</h4>
                                            </div>
                                            {userLogin?.role === "EMPLOYER" && <Button
                                                className='btn-primary bg-primary ml-4'
                                                key={1} href={`/employer/job/edit/${employerCompanyJob.companyForEmployer?.id}`} type="link"
                                                onClick={() => {

                                                }}
                                            >Update Company</Button>}
                                        </div>

                                        <div className='  py-3  px-20 w-[100%] '>
                                            <div className='px-6 py-6 rounded-xl  bg-gray-100 '>
                                                <div>
                                                    <h2 className='font-bold text-lg'>Introduction :
                                                        <text className='text-base font-normal ml-2'
                                                            dangerouslySetInnerHTML={{ __html: employerCompanyJob?.companyForEmployer?.introduction || dataCompanyForEmployerFromAdmin?.companyForEmployer?.introduction }}
                                                        >
                                                        </text>
                                                    </h2>
                                                </div>
                                                <div>
                                                    <h2 className='font-bold text-lg'>Profession :
                                                        <text className='text-base font-normal ml-2'>
                                                            {employerCompanyJob.companyForEmployer?.profession || dataCompanyForEmployerFromAdmin?.companyForEmployer?.profession}
                                                        </text>
                                                    </h2>
                                                </div>
                                                <div>
                                                    <h2 className='font-bold text-lg'>Link Website :
                                                        <a className='text-base font-normal ml-2' href={employerCompanyJob.companyForEmployer?.link_website || dataCompanyForEmployerFromAdmin?.companyForEmployer?.link_website}>
                                                            {employerCompanyJob.companyForEmployer?.link_website || dataCompanyForEmployerFromAdmin?.companyForEmployer?.link_website}
                                                        </a>
                                                    </h2>
                                                </div>
                                                <div>
                                                    <h2 className='font-bold text-lg'>National :
                                                        <text className='text-base font-normal ml-2'>
                                                            {employerCompanyJob.companyForEmployer?.nationnality || dataCompanyForEmployerFromAdmin?.companyForEmployer?.nationnality}
                                                        </text>
                                                    </h2>
                                                </div>
                                                <div>
                                                    <h2 className='font-bold text-lg'>Location :
                                                        <text className='text-base font-normal ml-2'>
                                                            {employerCompanyJob.companyForEmployer?.location || dataCompanyForEmployerFromAdmin?.companyForEmployer?.location}
                                                        </text>
                                                    </h2>
                                                </div>
                                                <div>
                                                    <h2 className='font-bold text-lg'>Benefit :
                                                        <text className='text-base font-normal ml-2'
                                                            dangerouslySetInnerHTML={{ __html: employerCompanyJob.companyForEmployer?.benefit || dataCompanyForEmployerFromAdmin?.companyForEmployer?.benefit }}
                                                        >
                                                        </text>
                                                    </h2>
                                                </div>
                                                <div>
                                                    <h2 className='font-bold text-lg'>Size :
                                                        <text className='text-base font-normal ml-2'>
                                                            {employerCompanyJob.companyForEmployer?.size || dataCompanyForEmployerFromAdmin?.companyForEmployer?.size || 'None'}
                                                        </text>
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Modal>
                            </div>
                        </div>

                        {/* Subcription Plan */}
                        {userLogin?.role === "EMPLOYER" ? <div>
                            {subscriptionPlanByAccount?.subcriptionPlanDTO
                                ?
                                <div className='w-[60%] cursor-pointer'>
                                    <div onClick={showModal} className='bg-yellow-300  rounded-md shadow-md  p-2 shadow-yellow-300 flex flex-col gap-2 text-center'>
                                        <text>{subscriptionPlanByAccount?.subcriptionPlanDTO?.name}</text>
                                        <text>From {dayjs(subscriptionPlanByAccount?.subcriptionPlanDTO?.start_date).format("DD-MM-YYYY")} To {dayjs(subscriptionPlanByAccount?.subcriptionPlanDTO?.end_date).format("DD-MM-YYYY")} </text>
                                    </div>
                                </div>
                                : <Button href={`/employer/buyScPl`} className='btn-primary bg-primary mt-1 px-5' type='primary' onClick={() => { }}>Buy subscription plan</Button>}

                            <Modal title="Current subscription plan" onOk={handleOk} onCancel={handleCancel} open={isModalOpen} footer={
                                <>
                                    <Button href={`/admin/empmng/edit/${userLogin?.id}`} className='btn-primary bg-primary mt-3 px-5' type='primary' onClick={() => { }}>Renew subscription plan</Button>
                                    <Button className='btn-primary bg-primary mt-2 px-5' type='primary' onClick={handleOk}>OK</Button>
                                </>} >
                                {/* <div >
                                    Start date:{dayjs(subscriptionPlanByAccount?.subcriptionPlanDTO?.start_date).format("DD-MM-YYYY")}
                                </div><div >
                                    End date:{dayjs(subscriptionPlanByAccount?.subcriptionPlanDTO?.end_date).format("DD-MM-YYYY")}
                                </div><div >
                                    Price:{(subscriptionPlanByAccount?.subcriptionPlanDTO?.price)} $
                                </div><div >
                                    Expiry:{(dayjs(subscriptionPlanByAccount?.subcriptionPlanDTO?.end_date).diff(dayjs(), "days"))} Days
                                </div> */}
                                <div className='flex flex-col items-center justify-center mt-6'>
                                    <div className="bg-blue-900 col-6 py-2 rounded-tl-[80px] rounded-br-[80px]">

                                        <div className='bg-white py-3 rounded-tl-[80px] rounded-br-[80px]'>
                                            <div className='flex flex-col justify-center items-center' >
                                                <h1 className='font-bold text-xl text-blue-900 text-center mb-3'>${subscriptionPlanByAccount?.subcriptionPlanDTO?.price}</h1>
                                                <div className='flex items-center justify-center border-b pb-2 border-gray-400 border-dashed mx-2'>
                                                    <h1 className='text-gray-500 text-base mr-3 font-bold'><CheckOutlined /></h1>
                                                    <h4 className='text-base font-light mb-0'>{subscriptionPlanByAccount?.subcriptionPlanDTO?.description}</h4>
                                                </div>
                                                <div className='flex items-center justify-center border-b mb-2 border-gray-400 border-dashed mx-2'>
                                                    <h1 className='text-gray-500 text-base mr-3 font-bold'><CheckOutlined /></h1>
                                                    <h4 className='text-base font-light mb-0'>
                                                        {subscriptionPlanByAccount?.subcriptionPlanDTO?.expiry} jobs </h4>
                                                </div>
                                                <div className='text-white mt-2 w-[40%] flex items-center justify-center'>
                                                    <div className="bg-blue-900  text-3xl shadow-2xl text-center rounded-full px-3 py-3 flex items-center justify-center">
                                                        <DollarOutlined />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className='bg-white mt-3 w-[80%] p-2 flex justify-center items-center rounded-xl'>
                                            <h1 className="text-blue-900 font-xl font-bold m-0"> {subscriptionPlanByAccount?.subcriptionPlanDTO?.name}</h1>
                                        </div>
                                    </div>
                                </div>

                            </Modal>
                        </div> :
                            <div className='w-[60%]'>
                                {/* {arrDataSubcriptionPlanFromAdmin?.subcriptionPlanDTO !== null ? <text>{arrDataSubcriptionPlanFromAdmin?.subcriptionPlanDTO?.name}</text> : <text>None</text>} */}
                                <div className='bg-yellow-300  rounded-md shadow-md  p-2 shadow-yellow-300   text-center'>
                                    <text className='text-gray-600'>{arrDataSubcriptionPlanFromAdmin?.subcriptionPlanDTO?.name || "Don't Have Subcription Plan"}</text>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>

            <div className=''>
                <ChartOfEmployer idOfEmployer={id}></ChartOfEmployer>
            </div>
            <div className='mt-10 rounded-xl p-4 border-2  border-gray-300'>
                <EmployerJobMng idOfEmployer={id}></EmployerJobMng>
            </div>

        </div>
    );
};

export default EmployerProfile;