import React from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';



const ExpensePieChart = ({ data }) => {

    return (
        <>
            <h3 className='title'>Category-wise Expense Distribution</h3>
            {data.length === 0 ? <p style={{ marginLeft: "20px", padding: "20px" }}>No data available</p> :
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart style={{ margin: '0 auto' }}>
                        <Pie
                            data={data}
                            cx={200}
                            cy={200}
                            outerRadius={100}
                            dataKey="value"
                            label={(data) => `${data.name} (${data.percent})`}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                            ))}
                        </Pie>
                        <Tooltip /> {/* Add tooltip for hover information */}
                    </PieChart>
                </ResponsiveContainer>
            }

        </>
    );
};

export default ExpensePieChart;
