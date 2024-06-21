export const getCategorywiseTotalExpense = (project) => {
    if (!project || !project.expenses || project.expenses.length === 0) { return []; }

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
    if (!project || !project.expenses || project.expenses.length === 0) {
        return [];
    }

    // Get first and last expense dates
    const sortedExpenses = project.expenses.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
    const firstExpenseDate = new Date(sortedExpenses[0].date);
    const lastExpenseDate = new Date(sortedExpenses[sortedExpenses.length - 1].date);

    // Function to generate month strings for a date range
    const getMonthStrings = (startDate, endDate) => {
        const months = [];
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const year = currentDate.getFullYear();
            const monthName = currentDate.toLocaleString('default', { month: 'long' });
            months.push(`${monthName} ${year}`);
            currentDate.setMonth(currentDate.getMonth() + 1); // Move to next month
        }
        return months;
    };

    // Calculate complete month range
    const allMonths = getMonthStrings(firstExpenseDate, lastExpenseDate);

    // Group expenses by time period using "Month YYYY" format
    const expensesByPeriod = project.expenses.reduce((acc, expense) => {
        const expenseDate = new Date(expense.date);
        const year = expenseDate.getFullYear();
        const monthName = expenseDate.toLocaleString('default', { month: 'long' });
        const timePeriod = `${monthName} ${year}`;
        acc[timePeriod] = (acc[timePeriod] || 0) + Number(expense.amount);
        return acc;
    }, {});

    console.log('expensesByPeriod', expensesByPeriod);

    // Combine data with zero expenses for missing months
    const chartData = allMonths.map((month) => {
        console.log('Month:', month);
        console.log('Expense:', expensesByPeriod[month]);
        return {
            timePeriod: month,
            expense: expensesByPeriod[month] || 0, // Use expense if available, otherwise 0
        };
    });

    console.log('chartData', chartData);

    return chartData;
};
