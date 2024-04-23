import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedProjectId: null, // Initially, no project is selected
};

export const selectedProjectSlice = createSlice({
    name: "selectedProject",
    initialState,
    reducers: {
        setSelectedProject: (state, action) => {
            state.selectedProjectId = action.payload;
        },
    },
});

export const { setSelectedProject } = selectedProjectSlice.actions;
export default selectedProjectSlice.reducer;
