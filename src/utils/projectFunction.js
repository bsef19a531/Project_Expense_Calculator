import axios from 'axios';

// Function to fetch data from the JSON file
export const fetchData = async () => {
    try {
        // console.log("fetchData")
        const response = await axios.get(`../db/expenseProjects.json`);
        return response.data.projects;
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching data. Please check the console for more details.');
        return [];
    }
};