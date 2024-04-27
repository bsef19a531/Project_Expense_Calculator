import React, { useState } from 'react'
import styles from './Home.module.css'
import { updateProjectPayees, updateProjectCategories, updateProjectLocally, deleteProjectCategory, deleteProjectPayee } from '../../utils/handleProjectsLocal'
import { useDispatch, useSelector } from 'react-redux'
import { saveProjects } from '../../redux/projectsSlice'
import { capitalizeString } from '../../utils/generalFunctions'
import CustomSelectorModal from '../../components/Modals/CustomSelectorModal'
import ExpenseModal from '../../components/Modals/ExpenseModal'

const Home = () => {

    // console.log("Home");

    const dispatch = useDispatch();
    const selectedProjectId = useSelector((state) => state.selectedProject.selectedProjectId);
    const projects = useSelector((state) => state.projects.projects);
    const selectedProject = projects.filter(project => project.id == selectedProjectId)[0];

    // console.log("Home selectedProject", selectedProject);
    // console.log("Home selectedProjectId", selectedProjectId);
    // console.log("Home projects", projects);

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
        console.log("handleAddPayee");
        const capitalizedCategory = capitalizeString(payee);
        const updatedProject = updateProjectPayees(selectedProject, capitalizedCategory);
        const updatedProjects = updateProjectLocally(updatedProject);
        dispatch(saveProjects(updatedProjects));
        setPayee('');
    }

    const [isModalOpenCategory, setIsModalOpenCategory] = useState(false);
    const [isModalOpenPayee, setIsModalOpenPayee] = useState(false);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

    const openModalCategory = () => {
        setIsModalOpenCategory(true);
    };

    const closeModalCategory = () => {
        setIsModalOpenCategory(false);
    };

    const openModalPayee = () => {
        setIsModalOpenPayee(true);
    };

    const closeModalPayee = () => {
        setIsModalOpenPayee(false);
    };

    const openExpenseModal = () => {
        setIsExpenseModalOpen(true);
    };

    const closeExpenseModal = () => {
        setIsExpenseModalOpen(false);
    };

    const handleDeleteCategory = (category) => {
        const updatedProject = deleteProjectCategory(selectedProject, category);
        const updatedProjects = updateProjectLocally(updatedProject);
        dispatch(saveProjects(updatedProjects));
    }
    const handleDeletePayee = (payee) => {
        const updatedProject = deleteProjectPayee(selectedProject, payee);
        const updatedProjects = updateProjectLocally(updatedProject);
        dispatch(saveProjects(updatedProjects));
    }

    const handleAddExpense = (expense) => {
        console.log("handleAddExpense", expense);
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
                    <button onClick={openModalCategory} className={`${styles.menu_btn} ${styles.btn_red}`}>Delete Category</button>
                </div>
            </div>

            <div className={styles.proj_container}>
                <div>
                    <p>Add a Payee to add Against Expense</p>
                    <input value={payee} onChange={(e) => { setPayee(e.target.value) }} className={styles.input_field} type="text" placeholder="Payee Name" />
                </div>
                <div className={styles.btn_container}>
                    <button onClick={handleAddPayee} className={styles.menu_btn}>Add Payee</button>
                    <button onClick={openModalPayee} className={`${styles.menu_btn} ${styles.btn_red}`}>Delete Payee</button>
                </div>

            </div>
            <div className={styles.proj_container}>
                <h3 className={styles.title}>Add New Expense</h3>
                <button className={styles.menu_btn} onClick={openExpenseModal} >Add Expense</button>
            </div>

            {/* Delete Category Modal*/}
            <CustomSelectorModal
                isOpen={isModalOpenCategory}
                onClose={closeModalCategory}
                handler={handleDeleteCategory}
                heading="Delete Category"
                selector="category"
            />

            {/* Modal for Delete Payee */}
            <CustomSelectorModal
                isOpen={isModalOpenPayee}
                onClose={closeModalPayee}
                handler={handleDeletePayee}
                heading="Delete Payee"
                selector="payee"
            />

            {/* Modal for Add Expense */}
            {isExpenseModalOpen && <ExpenseModal isOpen={isExpenseModalOpen} onClose={closeExpenseModal} handler={handleAddExpense} />}

        </div>
    )
}

export default Home