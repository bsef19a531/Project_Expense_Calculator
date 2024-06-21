import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';



const ExpensePieChart = ({ data }) => {
    const colors = [
        "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
        "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf",
        "#9ed664", "#9c755f", "#c24642", "#43639d", "#7cb5ec",
        "#e7ba52", "#800000", "#ffc0cb", "#32464c", "#2ca02c",
        "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f",
        "#bcbd22", "#17becf", "#9ed664", "#9c755f", "#c24642",
        "#43639d", "#7cb5ec", "#e7ba52", "#800000", "#ffc0cb",
        "#32464c", "#2ca02c"
    ];

    return (
        <>
            <h3 className='title'>Category-wise Expense Distribution</h3>
            {data.length === 0 ? <p style={{ marginLeft: "20px", padding: "20px" }}>No data available</p> : <PieChart width={600} height={400} style={{ margin: '0 auto' }}>
                <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    outerRadius={100}
                    dataKey="value"
                    label={(data) => `${data.name} (${data.percent})`}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
                <Tooltip /> {/* Add tooltip for hover information */}
            </PieChart>
            }

        </>
    );
};

export default ExpensePieChart;
