import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { getDataChartOfAdmin } from '../../../redux/actions/JobAction';




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

    let { chartAdmin } = useSelector(state => state.JobReducer);
    console.log(chartAdmin);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDataChartOfAdmin())
    }, [])

    // Data chart
    const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Price Subcription Plan By Month",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: chartAdmin?.data?.price_for_subcription_plan,
            },
        ],
    };

    const dataStatisticsSubcriptionPlanByMonth = {
        labels: labels,
        datasets: [
            {
                label:
                    "COMBO 30 ",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: chartAdmin?.data?.number_subcription_by_month_subcription_plan[0]
            },
            {
                label: "COMBO 50",
                backgroundColor: "rgb(75, 192, 192)",
                borderColor: "rgb(75, 192, 192)",
                data: chartAdmin?.data?.number_subcription_by_month_subcription_plan[1]
            },
            {
                label: "COMBO 100",
                backgroundColor: "rgb(255, 205, 86)",
                borderColor: "rgb(255, 205, 86)",
                data: chartAdmin?.data?.number_subcription_by_month_subcription_plan[2]
            },
            {
                label: "COMBO 360",
                backgroundColor: "rgb(191, 154, 255)",
                borderColor: "rgb(191, 154, 255)",
                data: chartAdmin?.data?.number_subcription_by_month_subcription_plan[3]
            }
        ]
    };

    return (
        <div>
            <div>
                <SummaryDetail chartAdmin={chartAdmin}></SummaryDetail>
            </div>
            <div className="grid gap-4 grid-cols-2">
                <div className="rounded-xl p-8 mr-4 border-2 border-gray-300 ">
                    <div className="mb-10 font-bold">Manager Price Of Subcription Plan </div>
                    <Bar height={100} data={data} />
                </div>
                <div className="rounded-xl p-8 ml-4 border-2 border-gray-300 ">
                    <div className="mb-10 font-bold">Manager Jobs</div>
                    <Line height={100} data={dataStatisticsSubcriptionPlanByMonth} />
                </div>
            </div>
        </div>
    );
};

export default GeneralChart;