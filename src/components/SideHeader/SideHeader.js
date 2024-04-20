import React, { useState } from 'react';
import styles from './SideHeader.module.css';
import logo from '../../assets/cal-logo.jpg';
import { Link } from 'react-router-dom';
import AddProjectModal from '../Modals/AddProjectModal';

const SideHeader = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleCreateProject = (projectName) => {
        console.log('Creating project:', projectName);

    };

    return (
        <div className={styles.container}>
            <div className={styles.sidebar_logo_container}>
                <img className={styles.logo} src={logo} alt="logo" />
                <h2>Expenses Menu</h2>
            </div>
            <div className={styles.menu}>
                <p>Pages</p>
                <ul>
                    <li>
                        <Link to="/" className={styles.sidebar_link}>Home</Link>
                    </li>
                    <li>
                        <Link to="/stats" className={styles.sidebar_link}>Stats</Link>
                    </li>
                    <li>
                        <Link to="/aboutus" className={styles.sidebar_link}>About Us</Link>
                    </li>
                </ul>
                <p>*Actions</p>
                <button className={styles.menu_btn} onClick={openModal}>Add Project</button>

                <AddProjectModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onCreateProject={handleCreateProject}
                />

                <button className={styles.menu_btn}>Edit Project</button>
                <div>
                    <select>
                        <option key={1} value="">Select Project</option>
                        <option key={2} value="1">Project 1</option>
                        <option key={3} value="2">Project 2</option>
                        <option key={4} value="3">Project 3</option>
                    </select>
                </div>
                <button className={styles.menu_btn}>Select Project</button>
            </div>
        </div>
    );
};

export default SideHeader;
