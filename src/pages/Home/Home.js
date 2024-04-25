import React, { useState } from 'react'
import styles from './Home.module.css'
import { updateProjectPayees, updateProjectCategories, updateProjectLocally } from '../../utils/handleProjectsLocal'
import { useDispatch, useSelector } from 'react-redux'
import { saveProjects } from '../../redux/projectsSlice'
import { capitalizeString } from '../../utils/generalFunctions'
const Home = () => {

    const dispatch = useDispatch();
    const selectedProjectId = useSelector((state) => state.selectedProject.selectedProjectId);
    const projects = useSelector((state) => state.projects.projects);
    const selectedProject = projects.filter(project => project.id == selectedProjectId)[0];

    const [category, setCategory] = useState('');
    const handleAddCategory = () => {
        const capitalizedCategory = capitalizeString(category);
        const updatedProject = updateProjectCategories(selectedProject, capitalizedCategory);
        const updatedProjects = updateProjectLocally(updatedProject);
        dispatch(saveProjects(updatedProjects));
        setCategory('');
    }

    const [payee, setPayee] = useState('');
    const handleAddPayee = () => {
        const capitalizedCategory = capitalizeString(payee);
        const updatedProject = updateProjectPayees(selectedProject, capitalizedCategory);
        const updatedProjects = updateProjectLocally(updatedProject);
        dispatch(saveProjects(updatedProjects));
        setPayee('');
    }

    return (
        <div>
            <h3 className={styles.title}>Expense Project</h3>
            <div className={styles.proj_container}>
                {
                    !selectedProject ? <div>Loading...</div> : <>
                        <div><b>Title:</b> {selectedProject.name} </div>
                        <div><b>Status:</b> {selectedProject.status} </div>
                        <div><b>Start Date:</b> {selectedProject.startDate} </div>
                    </>
                }

            </div>

            <h3 className={styles.title}>Project Actions</h3>
            <div className={styles.proj_container}>
                <div>
                    <p>Add a category to add Against Expense</p>
                    <input value={category} onChange={(e) => { setCategory(e.target.value) }} className={styles.input_field} type="text" placeholder="Category Name" />
                </div>
                <div className={styles.btn_container}>
                    <button className={styles.menu_btn} onClick={handleAddCategory}>Add Category</button>
                    <button className={`${styles.menu_btn} ${styles.btn_red}`}>Delete Category</button>
                </div>
            </div>

            <div className={styles.proj_container}>
                <div>
                    <p>Add a Payee to add Against Expense</p>
                    <input value={payee} onChange={(e) => { setPayee(e.target.value) }} className={styles.input_field} type="text" placeholder="Payee Name" />
                </div>
                <div className={styles.btn_container}>
                    <button onClick={handleAddPayee} className={styles.menu_btn}>Add Payee</button>
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