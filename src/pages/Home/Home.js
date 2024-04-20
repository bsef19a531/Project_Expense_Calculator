import React from 'react'
import styles from './Home.module.css'

const Home = () => {
    return (
        <div>
            <h3 className={styles.title}>Expense Project</h3>
            <div className={styles.proj_container}>
                <div><b>Title:</b> {"Demo1"} </div>
                <div><b>Status:</b> {"Ongoing"} </div>
                <div><b>Start Date:</b> {"12-08-2024"} </div>
            </div>

            <h3 className={styles.title}>Project Actions</h3>
            <div className={styles.proj_container}>
                <div>
                    <p>Add a category to add Against Expense</p>
                    <input className={styles.input_field} type="text" placeholder="Category Name" />
                </div>
                <div className={styles.btn_container}>
                    <button className={styles.menu_btn}>Add Category</button>
                    <button className={`${styles.menu_btn} ${styles.btn_red}`}>Delete Category</button>
                </div>
            </div>

            <div className={styles.proj_container}>
                <div>
                    <p>Add a Payee to add Against Expense</p>
                    <input className={styles.input_field} type="text" placeholder="Payee Name" />
                </div>
                <div className={styles.btn_container}>
                    <button className={styles.menu_btn}>Add Payee</button>
                    <button className={`${styles.menu_btn} ${styles.btn_red}`}>Delete Payee</button>
                </div>

            </div>
            <div className={styles.proj_container}>
                <h3 className={styles.title}>Add New Expense</h3>
                <button className={styles.menu_btn}>Add Expense</button>
            </div>

        </div>
    )
}

export default Home