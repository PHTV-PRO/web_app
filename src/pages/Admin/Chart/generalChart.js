import React, { useEffect, useState } from "react";
import { Modal, Table, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import TabPane from "antd/es/tabs/TabPane";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'

import SummaryDetail from "./Summary/summaryDetail";
import { getDataChartOfAdmin, getDataChartOfEmployer } from '../../../redux/actions/JobAction';
import { getCurrentUserAction } from '../../../redux/actions/UserAction';
import { TOKEN } from "../../../util/settings/config";
import { getDataChartByCompanyIdOfEmployerAction } from "../../../redux/actions/CompanyAction";
import { getCompanyAndJobByTokenAction } from "../../../redux/actions/AccountAction";



ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const GeneralChart = () => {

    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [idCompany, setIdCompany] = useState(0);

    let { arrDataChart } = useSelector(state => state.JobReducer);
    let { chartAdmin } = useSelector(state => state.JobReducer);
    let { userLogin } = useSelector(state => state.UserReducer);
    let { employerCompanyJob } = useSelector(state => state.AccountReducer);
    let { dataChartByCompanyIdForEmployer } = useSelector(state => state.CompanyReducer)
    let accessToken = {}
    if (localStorage.getItem(TOKEN)) {
        accessToken = localStorage.getItem(TOKEN)
    }

    const dispatch = useDispatch();
    const idOfCompanyEmployer = employerCompanyJob?.companyForEmployer?.id

    useEffect(() => {
        dispatch(getCurrentUserAction(accessToken));
    }, [])

    useEffect(() => {
        if (userLogin?.role === "EMPLOYER") {
            dispatch(getDataChartOfEmployer(accessToken))
            dispatch(getCompanyAndJobByTokenAction(accessToken))
            dispatch(getDataChartByCompanyIdOfEmployerAction(idOfCompanyEmployer))
        } else if (userLogin?.role === "ADMIN") {
            dispatch(getDataChartOfAdmin())
        }
    }, [userLogin])

    // Data chart
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
            <SummaryDetail chartAdmin={chartAdmin} dataChartOfEmployer={dataChartByCompanyIdForEmployer}></SummaryDetail>
            <h2 className='text-lg font-bold my-4 mr-2 p-0'>Your Chart  : </h2>
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
        </div>
    );
};

export default GeneralChart;