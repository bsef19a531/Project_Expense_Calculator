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

export const updateProjectCategories = (project, category) => {
    const presentCategories = project.categories;
    if (presentCategories.includes(category)) return project;
    return { ...project, categories: [...project.categories, category] };
};

export const updateProjectPayees = (project, payee) => {
    const presentPayees = project.payees;
    if (presentPayees.includes(payee)) return project;
    return { ...project, payees: [...project.payees, payee] };
};


export const updateProjectLocally = (updatedProject) => {
    let projects = JSON.parse(localStorage.getItem("projects")) || [];

    const localProject = projects.find(project => project.id == updatedProject.id);
    const index = projects.indexOf(localProject);

    if (index == -1) return;

    projects[index] = updatedProject;

    localStorage.setItem("projects", JSON.stringify(projects));

    return projects;
}

