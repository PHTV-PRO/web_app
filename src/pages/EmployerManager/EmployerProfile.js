import React, { useEffect } from 'react';
import { Avatar, Button, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { TOKEN } from '../../util/settings/config';


import { getCurrentUserAction } from '../../redux/actions/UserAction';
import { getCompanyAndJobByTokenAction } from '../../redux/actions/AccountAction';
import { deleteJobAction } from '../../redux/actions/JobAction';
import { history } from '../../App';



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
                <div className='col-4'>
                    {employerCompanyJob?.image == null || employerCompanyJob?.image == ""
                        ? <Avatar size={200} style={{ fontSize: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} icon={employerCompanyJob?.email?.substr(0, 1)} />
                        : <div style={{ minWidth: '40px', minHeight: 40, width: 200, height: 200, backgroundSize: 'cover', borderRadius: '50%', backgroundImage: `url(${employerCompanyJob.image})` }} />
                    }
                </div>
                <div className='col-8'>
                    <div className='col-6'>
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
                <div className='d-flex mb-3'>
                    <h3 className='text-lg m-0'>Company Management : </h3>
                    <Button href='/employer/addjobempmng' className='ml-3 small bg-orange-500 text-white'>+ Add New Company</Button>
                </div>
                <table className="w-[1700px] table-auto">
                    <thead>
                        <tr className="flex w-[1700px] bg-gray-100">
                            <th className="border flex-1 p-2">Name Company</th>
                            <th className="border flex-1 p-2">Introduction</th>
                            <th className="border flex-1 p-2">Name Company</th>
                            <th className="border flex-1 p-2">Link Website</th>
                            <th className="border flex-1 p-2">National</th>
                            <th className="border flex-1 p-2">Benefit</th>
                            <th className="border flex-1 p-2">Size</th>
                            <th className="border flex-1 p-2">Tuỳ Chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="flex h-28 w-[1700px]">
                            <td className="text-ellipsis overflow-hidden line-clamp-6 border w-[213px] pt-3 pb-2 pl-2">
                                {employerCompanyJob?.company?.name}
                            </td>
                            <td className="text-ellipsis overflow-hidden line-clamp-6 border w-[212.3px] pt-3 pb-2 pl-2">
                                {employerCompanyJob?.company?.introduction}
                            </td>
                            <td className="text-ellipsis overflow-hidden line-clamp-6 border w-[212.3px] pt-3 pb-2 pl-2">
                                {employerCompanyJob.company?.profession}
                            </td>
                            <td className="text-ellipsis overflow-hidden line-clamp-6 border w-[212.3px] pt-3 pb-2 pl-2">
                                {employerCompanyJob.company?.link_website}
                            </td>
                            <td className="text-ellipsis overflow-hidden line-clamp-6 border w-[212.3px] pt-3 pb-2 pl-2">
                                {employerCompanyJob.company?.nationnality}
                            </td>
                            <td className="text-ellipsis overflow-hidden line-clamp-6 border w-[212.3px] pt-3 pb-2 pl-2">
                                {employerCompanyJob.company?.benefit}
                            </td>
                            <td className="text-ellipsis overflow-hidden line-clamp-6 border w-[212.3px] pt-3 pb-2 pl-2">
                                {employerCompanyJob.company?.size || 'Không Có'}
                            </td>

                            <td className="flex items-center text-center  justify-center gap-4 h-full flex-1 p-2 border">
                                <Button
                                    className='btn-primary bg-primary'
                                    key={1} href={`/admin/companymng/edit/${employerCompanyJob.company?.id}`} type="link"
                                    onClick={() => {

                                    }}
                                >Sửa</Button>

                                <Button
                                    className='btn-primary bg-primary' type='primary'
                                    key={2}
                                    onClick={() => {
                                        if (
                                            window.confirm(
                                                "Are you sure you want to delete " +
                                                employerCompanyJob.company?.name +
                                                "?"
                                            )
                                        ) {
                                            dispatch(deleteJobAction(employerCompanyJob.company?.id));
                                        }
                                        window.location.reload()
                                    }}
                                >
                                    Xoá
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployerProfile;