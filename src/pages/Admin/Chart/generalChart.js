import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import { Table } from "antd";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { getDataChartOfEmployer } from '../../../redux/actions/JobAction';
import { getCurrentUserAction } from '../../../redux/actions/UserAction';
import { useDispatch, useSelector } from "react-redux";
import { TOKEN } from "../../../util/settings/config";

const AdminChart = () => {
    const dispatch = useDispatch();

    let { arrDataChart } = useSelector(state => state.JobReducer);
    let { userLogin } = useSelector(state => state.UserReducer);
    console.log(userLogin?.role);
    let accessToken = {}
    if (localStorage.getItem(TOKEN)) {
        accessToken = localStorage.getItem(TOKEN)
    }
    console.log(accessToken);
    console.log(arrDataChart);
    console.log(arrDataChart?.data?.number_of_job_applicated);



    useEffect(() => {
        dispatch(getCurrentUserAction(accessToken));
    }, [])


    useEffect(() => {
        if (userLogin?.role === "EMPLOYER") {
            dispatch(getDataChartOfEmployer(accessToken))
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
                data: userLogin?.role === "EMPLOYER" ? arrDataChart?.data?.number_of_job_applicated : [0, 10, 5, 2, 20, 30, 45, 11, 100, 120, 11, 500],
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
                data: userLogin?.role === "EMPLOYER" ? arrDataChart?.data?.number_of_job_applicated : [120, 190, 150, 220, 180, 250, 200, 170, 190, 210, 230, 240] // Replace with your actual data
            },
            {
                label: "Job Save By Month",
                backgroundColor: "rgb(75, 192, 192)",
                borderColor: "rgb(75, 192, 192)",
                data: userLogin?.role === "EMPLOYER" ? arrDataChart?.data?.number_of_job_saved : [80, 110, 90, 130, 100, 140, 120, 90, 110, 130, 150, 160] // Replace with your actual data
            },
            {
                label: "Job Viewed By Month",
                backgroundColor: "rgb(255, 205, 86)",
                borderColor: "rgb(255, 205, 86)",
                data: userLogin?.role === "EMPLOYER" ? arrDataChart?.data?.number_of_job_viewed : [50, 70, 60, 80, 70, 90, 80, 60, 70, 80, 90, 100] // Replace with your actual data
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

export default AdminChart;