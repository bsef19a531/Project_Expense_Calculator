import { createReducer } from "@reduxjs/toolkit";
import { fetchProjects, setProjects } from './projectsActions'; // Import your actions

const initialState = {
    projects: [],
    loading: false, // Add a loading state to indicate ongoing fetching
    error: null, // Add an error state to handle potential fetching errors
};

export const projectsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(fetchProjects.pending, (state) => {
            state.loading = true;
            state.error = null; // Reset error on a new fetch attempt
        })
        .addCase(fetchProjects.fulfilled, (state, action) => {
            state.loading = false;
            state.projects = action.payload;
        })
        .addCase(fetchProjects.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message; // Handle fetching errors gracefully
        })
        .addCase(setProjects, (state, action) => { // Optional case for manual setting (if needed)
            state.projects = action.payload;
        });
});
