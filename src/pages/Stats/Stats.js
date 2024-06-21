import React from 'react'
import styles from './Stats.module.css'
import ExpenseLoanInfoCard from '../../components/ExpenseLoanInfoCard/ExpenseLoanInfoCard'
import ExpenseTable from '../../components/ExpenseTable/ExpenseTable'
import ExpensePieChart from '../../components/Charts/ExpensePieChart'
import ExpenseLineChart from '../../components/Charts/ExpenseLineChart'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getCategorywiseTotalExpense, getPayeewiseTotalExpense, getExpenseTrendsData, getCategorywiseMonthlyExpense } from '../../utils/chartCalculations';
import ExpenseBarChart from '../../components/Charts/ExpenseBarChart'

const Stats = () => {

    const projects = useSelector(state => state.projects.projects);
    const selectedProjectId = useSelector(state => state.selectedProject.selectedProjectId);
    let selectedProject = projects.filter(project => project.id == selectedProjectId)[0];
    const [pieChartData, setPieChartData] = useState(getCategorywiseTotalExpense(selectedProject ? selectedProject : {}));
    const [pieChartPayeeData, setPieChartPayeeData] = useState(getPayeewiseTotalExpense(selectedProject ? selectedProject : {}));
    const [lineChartData, setLineChartData] = useState(getExpenseTrendsData(selectedProject ? selectedProject : {}));
    const [barChartData, setBarChartData] = useState(getCategorywiseMonthlyExpense(selectedProject ? selectedProject : {}));

    useEffect(() => {
        selectedProject = projects.filter(project => project.id == selectedProjectId)[0];
        setPieChartData(getCategorywiseTotalExpense(selectedProject ? selectedProject : {}));
        setPieChartPayeeData(getPayeewiseTotalExpense(selectedProject ? selectedProject : {}));
        setLineChartData(getExpenseTrendsData(selectedProject ? selectedProject : {}));
        setBarChartData(getCategorywiseMonthlyExpense(selectedProject ? selectedProject : {}));
    }, [selectedProjectId, projects]);


    console.log('selectedProject', selectedProject);
    console.log('pieChartData', pieChartData);
    console.log('lineChartData', lineChartData);
    console.log('barChartData', barChartData);

    return (
        <>
            <h2 className={styles.title} >Stats</h2>
            <ExpenseLoanInfoCard />
            <ExpenseTable />
            <div className={styles.pie_chart_container}>
                <div>
                    <h3 className={styles.chart_title}>Category-wise Expense Distribution</h3>
                    <ExpensePieChart data={pieChartData} />
                </div>
                <div>
                    <h3 className={styles.chart_title}>Payee-wise Expense Distribution</h3>
                    <ExpensePieChart data={pieChartPayeeData} />
                </div>
            </div>
            <h3 style={{ margin: "20px" }} className={styles.chart_title}>Monthly Expense Trends</h3>
            <ExpenseLineChart data={lineChartData} />
            <h3 style={{ margin: "20px" }} className={styles.chart_title} >Monthly Category-wise Expense</h3>
            <ExpenseBarChart data={barChartData} />
        </>
    )
}

export default Stats