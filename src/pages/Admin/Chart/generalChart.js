import React from "react";
import Chart from "chart.js/auto";
import { Table } from "antd";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

const GeneralChart = () => {
    const labels = ["January", "February", "March", "April", "May", "June", "Jully", "August", "Dec", "Sep", "November", "December"];
    const data = {
        labels: labels,
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: [0, 10, 5, 2, 20, 30, 45, 11, 100, 120, 11, 500],
            },
        ],
    };

    const data2 = {
        labels: labels,
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: [0, 10, 5, 2, 20, 30, 45],
            },
        ],
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
                    <Line data={data} />
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