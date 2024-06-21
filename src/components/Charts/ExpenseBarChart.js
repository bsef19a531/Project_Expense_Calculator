import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';


const ExpenseBarChart = ({ data }) => {
    return (
        <>
            <BarChart width={800} height={400} data={data} stacked>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {data.map((category) => (
                    <Bar key={category.name} dataKey={Object.keys(category).slice(1)} stackId={category.name} fill="#1211aa" />
                ))}
            </BarChart>
        </>
    )
}

export default ExpenseBarChart