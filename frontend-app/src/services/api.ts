import axios from 'axios';

const API_BASE_URL = 'http://your-backend-url.com/api'; // Replace with your backend URL

export const fetchData = async (endpoint: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
};

// Additional API functions can be added here as needed.