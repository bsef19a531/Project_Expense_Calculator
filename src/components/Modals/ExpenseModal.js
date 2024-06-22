import React from 'react'
import Modal from 'react-modal'
import './CustomModal.css'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { updateBtnDisbledState } from '../../utils/generalFunctions'
import { addExpenseToProject, updateProjectLocally } from '../../utils/handleProjectsLocal'
import { saveProjects } from '../../redux/projectsSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const ExpenseModal = ({ isOpen, onClose, handler }) => {

    const dispatch = useDispatch();

    const selectedProjectId = useSelector((state) => state.selectedProject.selectedProjectId);
    const projects = useSelector((state) => state.projects.projects);

    const selectedProject = projects.filter(project => project.id == selectedProjectId)[0] || {};

    const projectCategories = selectedProject.categories;
    const projectPayees = selectedProject.payees;

    const [projectAmount, setProjectAmount] = useState(1);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedCategory, setSelectedCategory] = useState(projectCategories[0]);
    const [selectedPayee, setSelectedPayee] = useState(projectPayees[0]);
    const [isDisabled, setIsDisabled] = useState(true);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    }

    const handlePayeeChange = (event) => {
        setSelectedPayee(event.target.value);
    }

    const handleAmountChange = (event) => {
        setProjectAmount(event.target.value);


        // const btnState = updateBtnDisbledState(projectAmount, selectedCategory, selectedPayee);
        // console.log("btnState", btnState);
        // setIsDisabled(btnState);
    }

    const handleCreateExpense = () => {

        if (projectAmount == '' || projectAmount <= 0) {
            toast.error('Please enter a valid amount!');
            return;
        }
        if (selectedCategory == null || selectedCategory == '') {
            toast.error('Please select a category!');
            return;
        }
        if (selectedPayee == null || selectedPayee == '') {
            toast.error('Please select a payee!');
            return;
        }

        const expense = {
            id: `exp_${Date.now()}`,
            amount: projectAmount > 0 ? projectAmount : -1 * projectAmount,
            category: selectedCategory,
            payee: selectedPayee,
            date: selectedDate.toISOString().slice(0, 10)
        }

        const updatedProject = addExpenseToProject(selectedProject, expense);

        const updatedProjects = updateProjectLocally(updatedProject);
        dispatch(saveProjects(updatedProjects));

        setProjectAmount('');
        setSelectedDate(new Date());

        toast.success('Expense added successfully!');
    };

    return (
        <Modal className="add_project_modal" isOpen={isOpen} onRequestClose={onClose}>
            <div className='modal_header'>
                <h3>Add Expense</h3>
                <button className="close_btn" onClick={() => onClose()}>X</button>
            </div>
            <div className='modal_body f_dir_col'>
                <div className='expense_container_section'>
                    <div className=''>
                        <p>Add Expense Amount </p>
                        <input
                            className='project_expense_input'
                            type="number"
                            min={1}
                            placeholder="Enter Amount"
                            value={projectAmount}
                            onChange={handleAmountChange}
                        />
                    </div>
                    <div className=''>
                        <p>Select Date </p>
                        <DatePicker className='project_expense_datepicker'
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            dateFormat="yyyy/MM/dd" // Adjust date format as needed
                        />
                    </div>
                </div>

                <div className='expense_container_section'>
                    <div>
                        <p>Select Category</p>
                        <select className='modal_select_menu w-200 mt-10' value={selectedCategory} onChange={handleCategoryChange}>
                            {projectCategories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <p>Select Payee</p>
                        <select className='modal_select_menu w-200 mt-10' value={selectedPayee} onChange={handlePayeeChange}>
                            {projectPayees.map((payee) => (
                                <option key={payee} value={payee}>
                                    {payee}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button disabled={false} className='modal_btn' onClick={handleCreateExpense}>Create</button>
            </div>
        </Modal >
    )
}

export default ExpenseModal
