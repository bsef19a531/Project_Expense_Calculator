import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './AddProjectModal.css';

const AddProjectModal = ({ isOpen, onClose, onCreateProject }) => {
    const [projectName, setProjectName] = useState('');

    const handleCreateProject = () => {
        onCreateProject(projectName);
        setProjectName(''); // Clear project name input
        onClose(); // Close modal
    };

    return (
        <Modal className="add_project_modal" isOpen={isOpen} onRequestClose={onClose}>
            <div className='modal_header'>
                <h3>Add Project</h3>
                <button className="close_btn" onClick={() => onClose()}>X</button>
            </div>
            <div className='modal_body'>
                <input
                    className='project_name_input'
                    type="text"
                    placeholder="Enter project name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                />
                <button className='modal_btn' onClick={handleCreateProject}>Create</button>
            </div>
        </Modal>
    );
};

export default AddProjectModal;
