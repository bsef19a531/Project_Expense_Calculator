import React from 'react'
import Modal from 'react-modal'
import './CustomModal.css'
import { useSelector } from 'react-redux'
import { useState } from 'react'


const CustomSelectorModal = ({ isOpen, onClose, handler, heading, selector }) => {

    // console.log("CustomSelectorModal");

    const [selectedValue, setSelectedValue] = useState();


    const selectedProjectId = useSelector((state) => state.selectedProject.selectedProjectId) || 0;
    const projects = useSelector((state) => state.projects.projects) || [];
    const project = projects.filter(project => project.id == selectedProjectId)[0] || {};

    let selection = ["None"];
    if (selector === 'category') {
        selection = project.categories || ["None"];
    }
    if (selector === 'payee') {
        selection = project.payees || ["None"];
    }

    const handleValueDelete = () => {
        handler(selectedValue);
        onClose();
    }


    const handleValueChange = (event) => {
        setSelectedValue(event.target.value);
    }

    return (
        <Modal className="add_project_modal" isOpen={isOpen} onRequestClose={onClose}>
            <div className='modal_header'>
                <h3>{heading ? heading : "Modal"}</h3>
                <button className="close_btn" onClick={() => onClose()}>X</button>
            </div>
            <div className='modal_body'>
                {selection.length > 0 ?
                    <select className='modal_select_menu' value={selectedValue} onChange={handleValueChange}>
                        {selection.map((value) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                    </select> : <p>Nothing to Delete</p>
                }
                {
                    selection.length > 0 ? <button className='modal_btn bg_danger' onClick={handleValueDelete}>Delete</button> : <></>

                }
            </div>
        </Modal>
    )
}

export default CustomSelectorModal