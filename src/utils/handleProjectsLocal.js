export const createProject = (name) => {

    return {
        id: Date.now(),
        name,
        status: "Active",
        startDate: new Date().toISOString().slice(0, 10),
        expenses: [],
        categories: [],
        payees: []
    };
};


export const storeProjectsLocally = (newProject) => {
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects.push(newProject);
    localStorage.setItem("projects", JSON.stringify(projects));
};

export const getProjectsLocally = () => {
    return JSON.parse(localStorage.getItem("projects")) || [];
};
