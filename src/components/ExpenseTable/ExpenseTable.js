import React, { useEffect } from 'react'
import './ExpenseTable.css'
import { useSelector } from 'react-redux'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react'
import { applyExpensesFilters, sortExpenses } from '../../utils/handleExpenses'
import { updateProjectLocally } from '../../utils/handleProjectsLocal';
import { setSelectedProject } from '../../redux/selectedProjectSlice';
import { useDispatch } from 'react-redux';
import { saveProjects } from '../../redux/projectsSlice';

const ExpenseTable = () => {

    const dispatch = useDispatch();

    const projects = useSelector(state => state.projects.projects);
    const selectedProjectId = useSelector(state => state.selectedProject.selectedProjectId);
    const selectedProject = projects.filter(project => project.id == selectedProjectId)[0];
    const expenses = selectedProject?.expenses || [];

    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPayee, setSelectedPayee] = useState('');
    const [sort, setSort] = useState('amount');
    const [sortBy, setSortBy] = useState('asc');

    const [filteredExpenses, setFilteredExpenses] = useState(expenses);

    useEffect(() => {
        setFilteredExpenses(expenses);
    }, [projects, selectedProjectId]);

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    }

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    }

    const handlePayeeChange = (e) => {
        setSelectedPayee(e.target.value);
    }

    const handleApplyFilter = () => {

        const filters = {
            year: selectedYear == '' ? '' : selectedYear.getFullYear(),
            month: selectedMonth,
            category: selectedCategory,
            payee: selectedPayee
        }

        const filteredExpenses = applyExpensesFilters(expenses, filters);
        // Apply filter logic here
        setFilteredExpenses(filteredExpenses);

    }

    const handleClearFilter = () => {
        setSelectedYear('');
        setSelectedMonth('');
        setSelectedCategory('');
        setSelectedPayee('');
    }

    const handleSortChange = (e) => {
        const selectedSort = e.target.value;
        console.log('sort', selectedSort, 'sortBy', sortBy);
        setSort(selectedSort); // Update the sort state

        const sortedExpenses = sortExpenses(filteredExpenses, selectedSort, sortBy);
        setFilteredExpenses(sortedExpenses);
    }

    const handleSortOperation = (e) => {
        const selectedSortBy = e.target.value;
        console.log('sort', sort, 'sortBy', selectedSortBy);
        setSortBy(selectedSortBy); // Update the sortBy state

        const sortedExpenses = sortExpenses(filteredExpenses, sort, selectedSortBy);
        setFilteredExpenses(sortedExpenses);
    }

    const handleDeleteExpense = (expenseId) => {
        // Get a copy of the filtered expenses
        const updatedExpenses = [...filteredExpenses];

        // Find the index of the expense to be deleted
        const expenseIndex = updatedExpenses.findIndex((expense) => expense.id == expenseId);

        if (expenseIndex !== -1) {
            // Remove the expense from the copy
            updatedExpenses.splice(expenseIndex, 1);

            // Update the filtered expenses state using the setter


            // Update the project data (see next step)
            const updatedProject = { ...selectedProject, expenses: updatedExpenses };
            const updatedProjects = updateProjectLocally(updatedProject);
            setFilteredExpenses(updatedExpenses);
            // setSelectedProject(updatedProject);
            dispatch(saveProjects([...updatedProjects]));
        } else {
            console.error("Expense not found with ID:", expenseId);
        }
    };

    return (
        <>
            <div>
                <h3 className='title'>Expenses Table</h3>

                <div className='filter_container'>
                    <div className='filters_section'>
                        <div>
                            <div>
                                <DatePicker className='project_expense_datepicker filter_date_picker'
                                    selected={selectedYear}
                                    onChange={(date) => setSelectedYear(date)}
                                    dateFormat="yyyy" // Adjust date format as needed
                                    placeholderText="Select Year"
                                    showYearPicker
                                />
                            </div>
                        </div>


                        <div>
                            <select className='modal_select_menu' value={selectedMonth} onChange={handleMonthChange}>
                                <option value='' disabled>Select Month</option>
                                <option value={0}>January</option>
                                <option value={1}>February</option>
                                <option value={2}>March</option>
                                <option value={3}>April</option>
                                <option value={4}>May</option>
                                <option value={5}>June</option>
                                <option value={6}>July</option>
                                <option value={7}>August</option>
                                <option value={8}>September</option>
                                <option value={9}>October</option>
                                <option value={10}>November</option>
                                <option value={11}>December</option>
                            </select>
                        </div>

                        <div>
                            <div>
                                <select className='modal_select_menu' value={selectedCategory} onChange={handleCategoryChange}>
                                    <option value='' disabled>Select Category</option>
                                    {selectedProject && selectedProject.categories.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <div>
                                <select className='modal_select_menu' value={selectedPayee} onChange={handlePayeeChange}>
                                    <option value='' disabled>Select Payee</option>
                                    {selectedProject && selectedProject.payees.map((payee) => (
                                        <option key={payee} value={payee}>{payee}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <button className='modal_btn  clear_btn' onClick={handleClearFilter}>Clear</button>
                        </div>
                    </div>
                    <div>
                        <button className='modal_btn' onClick={handleApplyFilter}>Filter</button>
                    </div>
                </div>

                <div className='sort_container'>
                    <h5>Sort By</h5>
                    <select className='modal_select_menu w_150' value={sort} onChange={handleSortChange}>
                        <option value='amount'>Amount</option>
                        <option value='date'>Date</option>
                    </select>

                    <select className='modal_select_menu w_150' value={sortBy} onChange={handleSortOperation}>
                        <option value='asc'>Ascending</option>
                        <option value='desc'>Decending</option>
                    </select>

                </div>
            </div>
            <div className='table_container'>
                <table className='expense_table'>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Payee</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredExpenses.length > 0 ? filteredExpenses.map((expense) => (
                                <tr key={expense.id}>
                                    <td>{expense.date}</td>
                                    <td>{expense.amount}</td>
                                    <td>{expense.category}</td>
                                    <td>{expense.payee}</td>
                                    <td>
                                        <button onClick={() => handleDeleteExpense(expense.id)} className='modal_btn bg_danger'>Delete</button>
                                    </td>
                                </tr>
                            ))
                                : <p className='para'>No Data Available...</p>
                        }
                        < tr >
                            <td colSpan="5" className="total_amount_row">
                                <b>Total Amount: {filteredExpenses.reduce((total, expense) => total + Number(expense.amount), 0)}</b>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ExpenseTable