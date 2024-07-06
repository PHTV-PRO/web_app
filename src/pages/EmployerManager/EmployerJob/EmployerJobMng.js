import React, { useEffect } from 'react'
import { Button, Input, Space, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteJobAction } from '../../../redux/actions/JobAction';



import { getCompanyAndJobByTokenAction } from '../../../redux/actions/AccountAction';
import { getCurrentUserAction } from '../../../redux/actions/UserAction';
import { TOKEN } from '../../../util/settings/config';


export default function EmployerJobMng() {
    const dispatch = useDispatch();
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


    return <div className="flex flex-col gap-6 ">
        <div className='d-flex mb-3'>
            <h3 className='text-lg'>Job Management</h3>
        </div>
        <table className="w-[1700px] table-auto">
            <thead>
                <tr className="flex w-[1700px] bg-gray-100">
                    <th className="border flex-1 p-2">Title</th>
                    <th className="border flex-1 p-2">Benefit</th>
                    <th className="border flex-1 p-2">Name Company</th>
                    <th className="border flex-1 p-2">Experience Required</th>
                    <th className="border flex-1 p-2">Skill Required</th>
                    <th className="border flex-1 p-2">Reponsibility</th>
                    <th className="border flex-1 p-2">Address Company</th>
                    <th className="border flex-1 p-2">Tuỳ Chọn</th>
                </tr>
            </thead>
            <tbody>

                {employerCompanyJob?.company?.jobs?.map((item, i) => {
                    return (
                        <tr className="flex h-28 w-[1700px]">
                            <td className="border p-2 text-center whitespace-nowrap overflow-hidden text-ellipsis h-full flex-1">
                                {item.title}
                            </td>
                            <td className="text-ellipsis overflow-hidden line-clamp-6 border w-[212px] pt-2 pb-2 pr-1 pl-1">
                                {item.benefit}
                            </td>
                            <td className="text-ellipsis overflow-hidden line-clamp-6 border w-[212px] pt-2 pb-2 pr-1 pl-1">
                                {item.company?.name}
                            </td>
                            <td className="text-ellipsis overflow-hidden line-clamp-6 border w-[212px] pt-2 pb-2 pr-1 pl-1">
                                {item.experience_required}
                            </td>
                            <td className="text-ellipsis overflow-hidden line-clamp-6 border w-[212px] pt-2 pb-2 pr-1 pl-1">
                                {item.skill_required}
                            </td>
                            <td className="text-ellipsis overflow-hidden line-clamp-6 border w-[212px] pt-2 pb-2 pr-1 pl-1">
                                {item.reponsibility}
                            </td>
                            <td className="text-ellipsis overflow-hidden line-clamp-6 border w-[212px] pt-2 pb-2 pr-1 pl-1">
                                {item.location?.name}
                            </td>

                            <td className="flex items-center text-center  justify-center gap-4 h-full flex-1 p-2 border">
                                <Button
                                    className='btn-primary bg-primary'
                                    onClick={() => {
                                    }}
                                >Sửa</Button>

                                <Button
                                    className='btn-primary bg-primary' type='primary'
                                    onClick={() => {
                                        if (
                                            window.confirm(
                                                "Are you sure you want to delete " +
                                                item.title +
                                                "?"
                                            )
                                        ) {
                                            dispatch(deleteJobAction(item.id));
                                        }
                                        window.location.reload()
                                    }}
                                >
                                    Xoá
                                </Button>
                            </td>
                        </tr>

                    )
                })}

            </tbody>
        </table>
        {/* <Table columns={columns} dataSource={data} rowKey={'id'} /> */}
    </div>
}
