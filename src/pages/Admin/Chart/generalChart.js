import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import { Table } from "antd";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { getDataChartOfAdmin, getDataChartOfEmployer } from '../../../redux/actions/JobAction';
import { getCurrentUserAction } from '../../../redux/actions/UserAction';
import { useDispatch, useSelector } from "react-redux";
import { TOKEN } from "../../../util/settings/config";

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
    console.log(chartAdmin);
    console.log(arrDataChart?.data?.number_of_job_applicated);
    console.log(chartAdmin?.data?.number_of_job_applicated);




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
                label: "Job Applicated By Month",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: userLogin?.role === "EMPLOYER" ? arrDataChart?.data?.number_of_job_applicated : chartAdmin?.data?.number_of_job_applicated,
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

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    return (
        <div>
            <div className="grid gap-4 grid-cols-2">
                <div className="rounded-xl p-4 border border-gray-300 shadow-xl shadow-gray-300">
                    <div className="mb-10 font-bold">Chart Example</div>
                    <Bar data={data} />
                </div>
                <div className="rounded-xl p-4  border border-gray-30 shadow-xl shadow-gray-300">
                    <div className="mb-10 font-bold">Chart Example</div>
                    <Line data={data2} />
                </div>

            </div>
            <div className="mt-20 rounded-xl p-4  border border-gray-30 shadow-xl shadow-gray-300">
                <div className="mb-10 font-bold ">DataTable Example :</div>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        </div>
    );
};

export default GeneralChart;