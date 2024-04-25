import { configureStore } from "@reduxjs/toolkit";
// import { projectsReducer } from "./projectsReducer";
import { selectedProjectSlice } from "./selectedProjectSlice";
import projectsReducer from './projectsSlice';

const store = configureStore({
    reducer: {
        projects: projectsReducer,
        selectedProject: selectedProjectSlice.reducer,

    }
})

export default store;