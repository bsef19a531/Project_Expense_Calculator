import React from 'react'
import styles from './CreateProject.module.css'
import { useState } from 'react'
import { createProject, storeProjectsLocally } from '../../utils/handleProjectsLocal'
import { useDispatch, useSelector } from 'react-redux'
import { saveProjects } from '../../redux/projectsSlice'

const CreateProject = () => {

    const [projectName, setProjectName] = useState("");
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.projects.projects);

    const handleInputChange = (event) => {
        setProjectName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        const newProject = createProject(projectName);
        storeProjectsLocally(newProject);

        dispatch(saveProjects([...projects, newProject]));
        setProjectName(""); // Clear input field after submission
    };

    return (
        <div className={styles.container}>
            <div className={styles.form_container}>
                <h1>Create Project</h1>
                <p>Currently no project exist</p>
                <p>Enter the name of the project you want to create</p>
                <form onSubmit={handleSubmit}>
                    <input value={projectName} onChange={handleInputChange} placeholder="Project Name" type="text" />
                    <button type="submit">Create</button>
                </form>
            </div>
        </div >
    )
}

export default CreateProject