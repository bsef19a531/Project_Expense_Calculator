export const getCategorywiseTotalExpense = (project) => {
    if (!project.expenses) return [];

    // Calculate total expense
    const totalExpense = project.expenses.reduce((acc, expense) => acc + Number(expense.amount), 0);

    const categoryExpenses = project.expenses.reduce((acc, expense) => {
        const category = expense.category;
        const amount = Number(expense.amount);
        acc[category] = (acc[category] || 0) + amount;
        return acc;
    }, {});

    const pieChartData = Object.entries(categoryExpenses).map(([category, amount]) => ({
        name: category,
        value: amount,
        // Calculate and add percentage
        percent: Math.round((amount / totalExpense) * 100),
    }));

    return pieChartData;
};


export const getExpenseTrendsData = (project) => {
    // Check if project has expenses
    if (!project || !project.expenses) {
        return [];
    }

    // Group expenses by time period (e.g., month, year)
    const expensesByPeriod = project.expenses.reduce((acc, expense) => {
        const timePeriod = expense.date.slice(0, 7); // Assuming date format YYYY-MM (e.g., 2024-05)
        acc[timePeriod] = (acc[timePeriod] || 0) + Number(expense.amount);
        return acc;
    }, {});

    // Convert grouped data to array of objects for chart
    const chartData = Object.entries(expensesByPeriod).map(([timePeriod, amount]) => {
        const date = new Date(timePeriod); // Assuming date format YYYY-MM
        const year = date.getFullYear();
        const monthName = date.toLocaleString('default', { month: 'long' }); // Get full month name
        return {
            timePeriod: `${monthName} ${year}`, // Combine month and year for X-axis
            expense: amount,
        };
    });

    return chartData;
};