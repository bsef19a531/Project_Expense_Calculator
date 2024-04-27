import React, { useState, useEffect } from 'react';
import styles from './SideHeader.module.css';
import logo from '../../assets/cal-logo.jpg';
import { Link } from 'react-router-dom';
import CustomModal from '../Modals/CustomModal';
import { useSelector } from 'react-redux';
import { setSelectedProject as setSelectedProjectId } from '../../redux/selectedProjectSlice';
import { useDispatch } from 'react-redux';
import { saveProjects } from '../../redux/projectsSlice';
import { createProject, storeProjectsLocally } from '../../utils/handleProjectsLocal';

const SideHeader = () => {
    // console.log("SideHeader");
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleCreateProject = (projectName) => {
        const newProject = createProject(projectName);
        storeProjectsLocally(newProject);
        dispatch(saveProjects([...projects, newProject]));
    };

    const projects = useSelector((state) => state.projects.projects);
    const selectedProjectId = useSelector((state) => state.selectedProject.selectedProjectId);

    const [selectedProject, setSelectedProject] = useState(
        selectedProjectId ? projects.filter(project => project.id === selectedProjectId)[0]?.name || 'None' : ''
    );

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

                <CustomModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onCreateProject={handleCreateProject}
                    heading="Add Project"
                    palceholder="Enter Project Name"
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
