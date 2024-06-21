import React from 'react'
import styles from './Stats.module.css'
import ExpenseLoanInfoCard from '../../components/ExpenseLoanInfoCard/ExpenseLoanInfoCard'
import ExpenseTable from '../../components/ExpenseTable/ExpenseTable'
import ExpensePieChart from '../../components/Charts/ExpensePieChart'
import ExpenseLineChart from '../../components/Charts/ExpenseLineChart'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getCategorywiseTotalExpense, getExpenseTrendsData } from '../../utils/chartCalculations';

const Stats = () => {

    const projects = useSelector(state => state.projects.projects);
    const selectedProjectId = useSelector(state => state.selectedProject.selectedProjectId);
    let selectedProject = projects.filter(project => project.id == selectedProjectId)[0];
    const [pieChartData, setPieChartData] = useState(getCategorywiseTotalExpense(selectedProject ? selectedProject : {}));
    const [lineChartData, setLineChartData] = useState(getExpenseTrendsData(selectedProject ? selectedProject : {}));

    useEffect(() => {
        selectedProject = projects.filter(project => project.id == selectedProjectId)[0];
        setPieChartData(getCategorywiseTotalExpense(selectedProject ? selectedProject : {}));
        setLineChartData(getExpenseTrendsData(selectedProject ? selectedProject : {}));
    }, [selectedProjectId, projects]);


    console.log('selectedProject', selectedProject);
    console.log('pieChartData', pieChartData);
    console.log('lineChartData', lineChartData);

    return (
        <>
            <h2 className={styles.title} >Stats</h2>
            <ExpenseLoanInfoCard />
            <ExpenseTable />
            <ExpensePieChart data={pieChartData} />
            <ExpenseLineChart data={lineChartData} />
        </>
    )
}

export default Stats