import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import { Table, Tabs } from "antd";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { getDataChartOfAdmin, getDataChartOfEmployer } from '../../../redux/actions/JobAction';
import { getCurrentUserAction } from '../../../redux/actions/UserAction';
import { useDispatch, useSelector } from "react-redux";
import { TOKEN } from "../../../util/settings/config";
import TabPane from "antd/es/tabs/TabPane";
import {
    FileProtectOutlined, RiseOutlined, UserOutlined, BankOutlined, CreditCardFilled
} from '@ant-design/icons';
const GeneralChart = () => {
    const dispatch = useDispatch();
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

    return (
        <div>
            {userLogin?.role == "ADMIN" && <div className="mb-10">
                <h1 className="text-base text-gray-700 mb-2">Wellcome Admin !!!</h1>
                <div className="grid gap-4 grid-cols-5">
                    <div className="flex items-center  my-6 bg-gray-100 p-6 rounded-md shadow-md">
                        <div className=" bg-purple-400 mr-4  py-4 px-8 rounded-2xl text-2xl text-white"><FileProtectOutlined /></div>
                        <div>
                            <h1 className="text-base text-gray-400 font-bold">Job Created</h1>
                            <h4 className="text-gray-700 text-2xl font-bold">{chartAdmin?.data?.jobs_has_been_created}</h4>
                        </div>
                    </div>
                    <div className="flex items-center  my-6 bg-gray-100 p-6 rounded-md shadow-md">
                        <div className="bg-red-400 mr-4  py-4 px-8 rounded-2xl text-2xl text-white"><UserOutlined /></div>
                        <div>
                            <h1 className="text-base text-gray-400 font-bold">Account Created</h1>
                            <h4 className="text-gray-700 text-2xl font-bold">{chartAdmin?.data?.account_has_been_created}</h4>
                        </div>
                    </div>
                    <div className="flex items-center  my-6 bg-gray-100 p-6 rounded-md shadow-md">
                        <div className="bg-green-400 mr-4  py-4 px-8 rounded-2xl text-2xl text-white"><BankOutlined /></div>
                        <div>
                            <h1 className="text-base text-gray-400 font-bold">Company Created</h1>
                            <h4 className="text-gray-700 text-2xl font-bold">{chartAdmin?.data?.companys_has_been_created}</h4>
                        </div>
                    </div>
                    <div className="flex items-center  my-6 bg-gray-100 p-6 rounded-md shadow-md">
                        <div className="bg-orange-400 mr-4  py-4 px-8 rounded-2xl text-2xl text-white"><CreditCardFilled /></div>
                        <div>
                            <h1 className="text-base text-gray-400 font-bold">Overall Payment</h1>
                            <h4 className="text-gray-700 text-2xl font-bold">{chartAdmin?.data?.overall_payment}</h4>
                        </div>
                    </div>
                    <div className="flex items-center  my-6 bg-gray-100 p-6 rounded-md shadow-md">
                        <div className="bg-blue-400 mr-4 py-4 px-8 rounded-2xl text-2xl text-white "><RiseOutlined /></div>
                        <div>
                            <h1 className="text-base text-gray-400 font-bold">Top Grossing Of Month</h1>
                            <h4 className="text-gray-700 text-2xl font-bold">{chartAdmin?.data?.top_grossing_month}</h4>
                        </div>
                    </div>
                </div>
            </div>}
            <div className="grid gap-4 grid-cols-2">
                <div className="rounded-xl p-4 border-2 border-gray-300 ">
                    <div className="mb-10 font-bold">Manager Price Of Subcription Plan </div>
                    <Bar data={data} />
                </div>
                <div className="rounded-xl p-4  border-2 border-gray-300 ">
                    <div className="mb-10 font-bold">Manager Jobs</div>
                    <Line data={data2} />
                </div>
            </div>

            {userLogin?.role == "ADMIN" && <div className="mt-10 border-2 border-gray-300 rounded-md py-3 px-4 ">
                <h2 className="text-base text-gray-500 italic mb-4">Manager Top Company :</h2>
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="Top Company With The Most Applcation " key="1"><Table dataSource={dataSourceOfCompanyApplication} columns={columnsOfCompanyApplication} /></TabPane>
                    <TabPane tab="Top Company With The Most Save" key="2"><Table dataSource={dataSourceOfCompanyView} columns={columnsOfCompanyView} /></TabPane>
                </Tabs>
            </div>}
        </div>
    );
};

export default GeneralChart;