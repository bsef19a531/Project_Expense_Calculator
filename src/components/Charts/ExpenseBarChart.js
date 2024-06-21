import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ExpenseBarChart = ({ data }) => {
    // Get all the unique category keys from the data
    const categoryKeys = Object.keys(data.reduce((acc, cur) => {
        Object.keys(cur).forEach(key => {
            if (key !== 'name') {
                acc[key] = true;
            }
        });
        return acc;
    }, {}));

    return (
        <>
            <h3 className='title' style={{ margin: "20px" }} >Monthly Category-wise Expense</h3>
            {data.length === 0 ? <p style={{ marginLeft: "20px", padding: "0px 20px" }}>No data available</p> : <ResponsiveContainer width="95%" height={400}>
                <BarChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {categoryKeys.map(category => (
                        <Bar key={category} dataKey={category} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                    ))}
                </BarChart>
            </ResponsiveContainer>}
        </>
    );
}

export default ExpenseBarChart;
