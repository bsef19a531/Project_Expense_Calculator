import React, { useState } from 'react';
import Modal from 'react-modal';
import './CustomModal.css';
// import './EditProjectModal.css';
import { useSelector, useDispatch } from 'react-redux';
import { saveProjects } from '../../redux/projectsSlice';
import { updateProjectLocally } from '../../utils/handleProjectsLocal';

const EditProjectModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();

    const selectedProjectId = useSelector((state) => state.selectedProject.selectedProjectId);
    const projects = useSelector((state) => state.projects.projects);

    const selectedProject = projects.filter(project => project.id == selectedProjectId)[0] || {};

    const [projectName, setProjectName] = useState(selectedProject.name || '');
    const [projectStatus, setProjectStatus] = useState(selectedProject.status || 'Active');

    const handleProjectNameChange = (event) => {
        setProjectName(event.target.value);
    }

    const handleProjectStatusChange = (event) => {
        setProjectStatus(event.target.value);
    }

    const handleSaveChanges = () => {
        const updatedProject = {
            ...selectedProject,
            name: projectName ? projectName : selectedProject.name,
            status: projectStatus ? projectStatus : selectedProject.status,
            endDate: projectStatus === 'Complete' ? new Date().toISOString().slice(0, 10) : null
        };

        const updatedProjects = updateProjectLocally(updatedProject);
        dispatch(saveProjects(updatedProjects));
        onClose();
    };

    return (
        <Modal className="add_project_modal" isOpen={isOpen} onRequestClose={onClose}>
            <div className='modal_header'>
                <h3>Edit Project</h3>
                <button className="close_btn" onClick={onClose}>X</button>
            </div>
            <div className='modal_body f_dir_col'>
                <div className='edit_modal_section'>
                    <div className='modal_section'>
                        <p>Project Name</p>
                        <input
                            className='project_expense_input w-350'
                            type="text"
                            placeholder="Change Project Name"
                            value={projectName}
                            onChange={handleProjectNameChange}
                        />
                    </div>
                    <div className='modal_section'>
                        <p>Project Status</p>
                        <select
                            className='modal_select_menu w-200 mt-10'
                            value={projectStatus}
                            onChange={handleProjectStatusChange}
                        >
                            <option value="Active">Active</option>
                            <option value="Complete">Complete</option>
                        </select>
                    </div>
                </div>
                <button className='modal_btn mt-10' onClick={handleSaveChanges}>Save</button>
            </div>
        </Modal>
    );
}

export default EditProjectModal;
