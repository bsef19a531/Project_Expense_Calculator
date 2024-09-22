import React, { useState, useEffect } from 'react';
import styles from './SideHeader.module.css';
import logo from '../../assets/cal-logo.jpg';
import { Link, useLocation } from 'react-router-dom';
import CustomModal from '../Modals/CustomModal';
import EditProjectModal from '../Modals/EditProjectModal';
import { useSelector } from 'react-redux';
import { setSelectedProject as setSelectedProjectId } from '../../redux/selectedProjectSlice';
import { useDispatch } from 'react-redux';
import { saveProjects } from '../../redux/projectsSlice';
import { createProject, storeProjectsLocally } from '../../utils/handleProjectsLocal';

const SideHeader = () => {
    // console.log("SideHeader");
    const dispatch = useDispatch();
    const location = useLocation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openEditModal = () => {
        setIsEditModalOpen(true);
    };

    const handleCreateProject = (projectName) => {
        if (projectName !== '') return;
        const newProject = createProject(projectName);
        storeProjectsLocally(newProject);
        dispatch(saveProjects([...projects, newProject]));
    };

    const projects = useSelector((state) => state.projects.projects);
    const selectedProjectId = useSelector((state) => state.selectedProject.selectedProjectId);

    const [selectedProject, setSelectedProject] = useState(
        selectedProjectId ? projects.filter(project => project.id === selectedProjectId)[0]?.name || 'None' : ''
    );

    const isSelected = (path) => location.pathname === path ? styles.is_selected : '';

    useEffect(() => {
        let projectToSave = projects.filter(project => selectedProject == project.id)[0]?.id || projects[0]?.id;

        dispatch(setSelectedProjectId(projectToSave)); // Update ID based on selectedProject
    }, [projects]);

    const handleProjectChange = (event) => {
        setSelectedProject(event.target.value);
        dispatch(setSelectedProjectId(event.target.value)); // Use selectedProject as ID directly
    };

    // console.log("SideHeader selectedProject", selectedProject);
    // console.log("SideHeader selectedProjectId", selectedProjectId);
    // console.log("SideHeader projects", projects);

    return (
        <div className={styles.container}>
            <div className={styles.sidebar_logo_container}>
                <img className={styles.logo} src={logo} alt="logo" />
                <h2>Expenses Menu</h2>
            </div>
            <div className={styles.menu}>
                <p>Pages</p>
                <ul>
                    <li className={`${isSelected('/')}`}>
                        <Link to="/" className={styles.sidebar_link}>Home</Link>
                    </li>
                    <li className={`${isSelected('/stats')}`}>
                        <Link to="/stats" className={`${styles.sidebar_link}`}>Stats</Link>
                    </li>
                    <li className={`${isSelected('/aboutus')}`}>
                        <Link to="/aboutus" className={styles.sidebar_link}>About Us</Link>
                    </li>
                </ul>
                <p>*Actions</p>
                <button className={styles.menu_btn} onClick={openModal}>Add Project</button>

                <CustomModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onCreateProject={handleCreateProject}
                    heading="Add Project"
                    palceholder="Enter Project Name"
                />

                <button className={styles.menu_btn} onClick={openEditModal}>Edit Project</button>

                <EditProjectModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />

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
