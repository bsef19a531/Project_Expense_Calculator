// projectsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    projects: [],
};

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        saveProjects: (state, action) => {
            state.projects = action.payload;
        }
    },
});

export const { addProject, saveProjects } = projectsSlice.actions;
export default projectsSlice.reducer;
