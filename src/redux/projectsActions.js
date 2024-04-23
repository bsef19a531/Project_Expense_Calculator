import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchProjects = createAsyncThunk(
    'projects/fetchProjects',
    async () => {
        const response = await axios.get(`../db/expenseProjects.json`); // Replace with your actual endpoint if needed
        return response.data.projects;
    }
);

export const setProjects = createAction('projects/setProjects'); // Use for manual setting if desired (optional)
