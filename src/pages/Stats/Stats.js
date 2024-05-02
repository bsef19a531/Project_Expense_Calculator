import React from 'react'
import styles from './Stats.module.css'
import ExpenseLoanInfoCard from '../../components/ExpenseLoanInfoCard/ExpenseLoanInfoCard'
import ExpenseTable from '../../components/ExpenseTable/ExpenseTable'

const Stats = () => {
    return (
        <>
            <h2 className={styles.title} >Stats</h2>
            <ExpenseLoanInfoCard />
            <ExpenseTable />
        </>
    )
}

export default Stats