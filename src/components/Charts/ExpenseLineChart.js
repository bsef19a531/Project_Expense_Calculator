import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ExpenseLineChart = ({ data }) => {
    const sortedData = data.sort((a, b) => {
        const dateA = new Date(a.timePeriod);
        const dateB = new Date(b.timePeriod);
        return dateA - dateB;
    });
    return (
        <>
            <h3 style={{ margin: "20px" }}>Monthly Expense Trends</h3>
            {data.length === 0 ? <p style={{ marginLeft: "20px", padding: " 0px 20px" }}>No data available</p> :
                <LineChart width={1000} height={400} data={sortedData} style={{ margin: "0 auto" }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timePeriod" tickFormatter={(value) => value} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="expense" stroke="#8884d8" />
                </LineChart>
            }
        </>
    );
};

export default ExpenseLineChart;
