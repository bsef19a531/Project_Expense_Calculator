export const createProject = (name) => {

    return {
        id: Date.now(),
        name,
        status: "Active",
        startDate: new Date().toISOString().slice(0, 10),
        endDate: null,
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
    if (presentCategories.includes(category) || category == '') return project;
    return { ...project, categories: [...project.categories, category] };
};

export const deleteProjectCategory = (project, category) => {
    const presentCategories = project.categories;
    if (!presentCategories.includes(category)) return project;
    return { ...project, categories: project.categories.filter(cat => cat !== category) };
};

export const updateProjectPayees = (project, payee) => {
    const presentPayees = project.payees;
    if (presentPayees.includes(payee) || payee == '') return project;
    return { ...project, payees: [...project.payees, payee] };
};

export const deleteProjectPayee = (project, payee) => {
    const presentPayees = project.payees;
    if (!presentPayees.includes(payee)) return project;
    return { ...project, payees: project.payees.filter(pay => pay !== payee) };
};

export const addExpenseToProject = (project, expense) => {
    let presentExpenses = project.expenses;
    presentExpenses = [...presentExpenses, expense];
    return { ...project, expenses: presentExpenses };
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

export const saveProjectsLocally = (projects) => {
    // Ensure projects is a valid array
    if (!Array.isArray(projects)) {
        throw new Error('Argument "projects" must be an array');
    }

    // Save the projects array to local storage
    localStorage.setItem('projects', JSON.stringify(projects));
};


export const calculateProjectTotalExpense = (project) => {
    if (!project.expenses) return 0;
    let totalAmount = 0;
    project.expenses.forEach(expense => {
        totalAmount += Number(expense.amount);
    });
    return totalAmount.toLocaleString('en-IN', {
        maximumFractionDigits: 2, // Specify decimal places
        minimumFractionDigits: 2, // Ensure at least 2 decimal places (avoid trailing zeroes)
        grouping: true, // Enable grouping
    });
}