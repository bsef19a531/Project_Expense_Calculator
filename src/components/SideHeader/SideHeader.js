import React, { useState, useEffect } from 'react';
import styles from './SideHeader.module.css';
import logo from '../../assets/cal-logo.jpg';
import { Link } from 'react-router-dom';
import AddProjectModal from '../Modals/AddProjectModal';
import { useSelector } from 'react-redux';
import { setSelectedProject as setSelectedProjectId } from '../../redux/selectedProjectSlice';
import { useDispatch } from 'react-redux';

const SideHeader = () => {
    const dispatch = useDispatch();

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

    const projects = useSelector((state) => state.projects.projects);
    const selectedProjectId = useSelector((state) => state.selectedProject.selectedProjectId);
    const [selectedProject, setSelectedProject] = useState(projects[0]?.name || 'None');

    useEffect(() => {
        // Handle potential situations where projects might be empty initially
        if (projects.length > 0 && !selectedProject) {
            setSelectedProject(projects[0].name);
        }
        if (selectedProject !== 'None') {
            dispatch(setSelectedProjectId(projects.filter(project => selectedProject === selectedProject)[0].id));
            console.log('Selected project from useEffect:', selectedProjectId);
        }
    }, [projects]);


    const handleProjectChange = (event) => {
        setSelectedProject(event.target.value);
        console.log('Selected project:', selectedProject);
        dispatch(setSelectedProjectId(event.target.value)); // Use selectedProject as ID directly
        console.log('Selected projectId:', selectedProjectId);
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

                <p>*Select Project</p>
                <div>
                    <select value={selectedProject} onChange={handleProjectChange} className={styles.select_menu}>
                        {projects.map((project) => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))}
                    </select>
                </div>

            </div>
        </div>
    );
};

export default SideHeader;
