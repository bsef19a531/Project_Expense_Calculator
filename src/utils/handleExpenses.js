const applyYearFilter = (expenses, year) => {
    if (year == '') return expenses;

    return expenses.filter(expense => {
        return new Date(expense.date).getFullYear() == year;
    });
}

const applyMonthFilter = (expenses, month) => {
    if (month == '') return expenses;

    return expenses.filter(expense => {
        console.log('new Date(expense.date).getMonth()', new Date(expense.date).getMonth());
        return new Date(expense.date).getMonth() == month;
    });
}

const applyCategoryFilter = (expenses, category) => {
    if (category == '') return expenses;

    return expenses.filter(expense => {
        return expense.category == category;
    });
}

const applyPayeeFilter = (expenses, payee) => {
    if (payee == '') return expenses;

    return expenses.filter(expense => {
        return expense.payee == payee;
    });
}

export const applyExpensesFilters = (expenses, filters) => {
    let filteredExpenses = expenses;

    if (filters.year) {
        filteredExpenses = applyYearFilter(filteredExpenses, filters.year);
    }

    if (filters.month) {
        filteredExpenses = applyMonthFilter(filteredExpenses, filters.month);
    }

    if (filters.category) {
        filteredExpenses = applyCategoryFilter(filteredExpenses, filters.category);
    }

    if (filters.payee) {
        filteredExpenses = applyPayeeFilter(filteredExpenses, filters.payee);
    }

    return filteredExpenses;

}



export const sortExpenses = (expenses, sort, sortBy) => {
    let sortedExpenses = [...expenses]
    if (sort == '' || sortBy == '') return expenses;
    if (sort == 'amount') {
        return sortedExpenses.sort((a, b) => {
            if (sortBy !== 'asc') {
                return a.amount - b.amount;
            } else {
                return b.amount - a.amount;
            }
        });
    }
    if (sort == 'date') {
        return sortedExpenses.sort((a, b) => {
            if (sortBy !== 'asc') {
                return new Date(a.date) - new Date(b.date);
            } else {
                return new Date(b.date) - new Date(a.date);
            }
        });
    }

} 