import React, { useEffect, useState } from "react";
import { Modal, Table, Tabs } from "antd";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import TabPane from "antd/es/tabs/TabPane";

import ModalOfCompanyDetail from "./Modal/ModalOfCompanyDetail";
import SummaryDetail from "./Summary/summaryDetail";
import { getDataChartOfAdmin, getDataChartOfEmployer } from '../../../redux/actions/JobAction';
import { getCurrentUserAction } from '../../../redux/actions/UserAction';
import { TOKEN } from "../../../util/settings/config";


const GeneralChart = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idCompany, setIdCompany] = useState(0);

    let { arrDataChart } = useSelector(state => state.JobReducer);
    let { chartAdmin } = useSelector(state => state.JobReducer);
    let { userLogin } = useSelector(state => state.UserReducer);
    console.log(userLogin?.role);
    let accessToken = {}
    if (localStorage.getItem(TOKEN)) {
        accessToken = localStorage.getItem(TOKEN)
    }
    // data table
    console.log(chartAdmin);
    const dataSourceOfCompanyApplication = chartAdmin?.data?.top_3_company_by_application;
    const columnsOfCompanyApplication = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'National',
            dataIndex: 'nationnality',
            key: 'nationnality',
        },
        {
            title: 'Link Website',
            dataIndex: 'link_website',
            key: 'link_website',
        },
    ];
    const dataSourceOfCompanyView = chartAdmin?.data?.top_3_company_by_save;
    const columnsOfCompanyView = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'National',
            dataIndex: 'nationnality',
            key: 'nationnality',
        },
        {
            title: 'Link Website',
            dataIndex: 'link_website',
            key: 'link_website',
        },
    ];

    // console.log(arrDataChart?.data?.number_of_job_applicated);
    // console.log(chartAdmin?.data?.number_of_job_applicated);

    useEffect(() => {
        dispatch(getCurrentUserAction(accessToken));
    }, [])

    useEffect(() => {
        if (userLogin?.role === "EMPLOYER") {
            dispatch(getDataChartOfEmployer(accessToken))
        } else if (userLogin?.role === "ADMIN") {
            dispatch(getDataChartOfAdmin())
        }
    }, [userLogin])


    const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Price Subcription Plan By Month",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: userLogin?.role === "EMPLOYER" ? arrDataChart?.data?.price_for_subcription_plan : chartAdmin?.data?.price_for_subcription_plan,
            },
        ],
    };

    const data2 = {
        labels: labels,
        datasets: [
            {
                label:
                    "Job Applicated By Month ",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: userLogin?.role === "EMPLOYER" ? arrDataChart?.data?.number_of_job_applicated : chartAdmin?.data?.number_of_job_applicated
            },
            {
                label: "Job Save By Month",
                backgroundColor: "rgb(75, 192, 192)",
                borderColor: "rgb(75, 192, 192)",
                data: userLogin?.role === "EMPLOYER" ? arrDataChart?.data?.number_of_job_saved : chartAdmin?.data?.number_of_job_saved
            },
            {
                label: "Job Viewed By Month",
                backgroundColor: "rgb(255, 205, 86)",
                borderColor: "rgb(255, 205, 86)",
                data: userLogin?.role === "EMPLOYER" ? arrDataChart?.data?.number_of_job_viewed : chartAdmin?.data?.number_of_job_viewed
            }
        ]
    };
    function callback(key) {
        console.log(key);
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
        <div>
            {userLogin?.role == "ADMIN" &&
                <SummaryDetail chartAdmin={chartAdmin}></SummaryDetail>
            }

            <div className="grid gap-4 grid-cols-2">
                <div className="rounded-xl p-4 border-2 border-gray-300 ">
                    <div className="mb-10 font-bold">Manager Price Of Subcription Plan </div>
                    {/* <Bar data={data} /> */}
                </div>
                <div className="rounded-xl p-4  border-2 border-gray-300 ">
                    <div className="mb-10 font-bold">Manager Jobs</div>
                    {/* <Line data={data2} /> */}
                </div>
            </div>

            {userLogin?.role == "ADMIN" && <div className="mt-10 border-2 border-gray-300 rounded-md py-3 px-4 ">
                <h2 className="text-base text-gray-500 italic mb-4"> Top Company :</h2>
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="Top Company With The Most Applcation " key="1">
                        <div>
                            <div className="flex gap-4 justify-center  items-end">
                                <div className="w-60 hover:cursor-pointer" onClick={() => {
                                    showModal()
                                    setIdCompany(dataSourceOfCompanyApplication[1]?.id)
                                }}>
                                    <div className="text-center mb-6">
                                        {dataSourceOfCompanyApplication?.length > 0 &&
                                            dataSourceOfCompanyApplication[1]?.name}
                                    </div>
                                    <div className="py-[80px]  rounded-lg mb-10 bg-gray-400">
                                        <div className=" text-6xl flex items-center justify-center font-bold text-white ">
                                            2
                                        </div>
                                    </div>
                                </div>
                                <div className="w-60 hover:cursor-pointer" onClick={() => {
                                    showModal()
                                    setIdCompany(dataSourceOfCompanyApplication[0]?.id)
                                }}>
                                    <div className="text-center mb-6 hover:cursor-pointer">
                                        {dataSourceOfCompanyApplication?.length > 0
                                            ? dataSourceOfCompanyApplication[0]?.name
                                            : "None"}
                                    </div>
                                    <div className="py-[120px]  rounded-lg mb-10 bg-yellow-500">
                                        <div className=" text-6xl flex items-center justify-center font-bold text-white ">
                                            1
                                        </div>
                                    </div>
                                </div>
                                <div className="w-60 hover:cursor-pointer " onClick={() => {
                                    showModal()
                                    setIdCompany(dataSourceOfCompanyApplication[2]?.id)
                                }}>
                                    <div className="text-center mb-6 hover:cursor-pointer" >
                                        {dataSourceOfCompanyApplication?.length > 0
                                            ? dataSourceOfCompanyApplication[2]?.name
                                            : "None"}
                                    </div>
                                    <div className="py-[60px]   rounded-lg mb-10 bg-yellow-700">
                                        <div className="  text-6xl flex items-center justify-center font-bold text-white">
                                            3
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPane>

                    <TabPane tab="Top Company With The Most Save" key="2"><Table dataSource={dataSourceOfCompanyView} columns={columnsOfCompanyView} /></TabPane>
                </Tabs>
                <Modal title="" width="50%" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <ModalOfCompanyDetail idCompany={idCompany}></ModalOfCompanyDetail>
                </Modal>
            </div>}


        </div>
    );
};

export default GeneralChart;