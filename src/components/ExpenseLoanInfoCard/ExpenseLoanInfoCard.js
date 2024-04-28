import React, { useEffect } from 'react'
import styles from './ExpenseLoanInfoCard.module.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { calculateProjectTotalExpense } from '../../utils/handleProjectsLocal';

const ExpenseLoanInfoCard = () => {

    const projects = useSelector(state => state.projects.projects);
    const selectedProjectId = useSelector(state => state.selectedProject.selectedProjectId);
    const selectedProject = projects.filter(project => project.id == selectedProjectId)[0];
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        if (selectedProject) {
            setTotalAmount(calculateProjectTotalExpense(selectedProject));
        }
    }, [selectedProjectId, selectedProject, projects]);

    console.log("selectedProject", selectedProject);

    return (
        <div className={styles.contianer}>
            <div className={styles.expense_container}>
                <div className={styles.proj_container}>
                    <div>
                        <h3 className={styles.title}>Total Amount</h3>
                        <h1 className={styles.title} >{totalAmount}</h1>
                    </div>

                    <div>
                        <h3 className={styles.title}>Project Title</h3>
                        <h1 className={styles.title} >{selectedProject?.name}</h1>
                    </div>
                </div>
                <div className={styles.proj_container}>
                    <div>
                        <h3 className={styles.title}>Total Loan</h3>
                        <h1 className={styles.title} >---</h1>
                    </div>

                    <div>
                        <h3 className={styles.title}>Loan Paid</h3>
                        <h1 className={styles.title} >---</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExpenseLoanInfoCard