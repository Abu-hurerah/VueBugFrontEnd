import Vue from 'vue';
import Utilities from '@/helpers/Utilites';
const API_URL = "http://localhost:8080/bugs"; // Adjust if your base URL is different

class BugsServices {
    // Retrieve all bugs for a specific project
    static getBugsByProjectId(project_id, page = 1, itemsPerPage = 6, OrderBy = 'ASC', searchterm = '') {
        const token = Utilities.getTokenFromStorage();
        console.log("Token: ", token);

        // Include pagination, sorting, and search parameters in the request URL
        const queryParams = `?page=${page}&limit=${itemsPerPage}&OrderBy=${OrderBy}&searchterm=${encodeURIComponent(searchterm)}`;
        const apiUrlWithProjectId = `${API_URL}/project/${project_id}${queryParams}`;
        console.log("API URL: ", apiUrlWithProjectId);

        return Vue.http.get(apiUrlWithProjectId, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(response => {
                console.log("Response Inside", response.body);
                return response.body;
            })
            .catch(error => {
                console.error('Failed to fetch bugs:', error);
                if (error.response) {
                    console.error('Error response:', error.response.status, error.response.body);
                } else {
                    console.error('Error in response:', error.message);
                }
                throw error;
            });
    }
    

    // Retrieve a bug by ID
    static getBugById(id) {
        return Vue.http.get(`${API_URL}/id/${id}`)
            .then(response => response.json())
            .catch(error => {
                console.error('Failed to fetch bug by ID:', error);
                throw error;
            });
    }

    // Create a new bug
    static createBug(bugData) {
        const token = Utilities.getTokenFromStorage();
        console.log("Token Value", token);
        console.log("Creating bug with data:", bugData);

        return Vue.http.post(`${API_URL}`, bugData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log("Response Inside", response.body);
                return response.body;
            })
            .catch(error => {
                console.error('Failed to create bug:', error);
                throw error;
            });
    }

    // Update bug details
    static updateBug(id, bugData) {
        return Vue.http.patch(`${API_URL}/${id}`, bugData)
            .then(response => response.json())
            .catch(error => {
                console.error('Failed to update bug:', error);
                throw error;
            });
    }

    // Delete a bug
    static deleteBug(id) {
        return Vue.http.delete(`${API_URL}/${id}`)
            .then(response => response.json())
            .catch(error => {
                console.error('Failed to delete bug:', error);
                throw error;
            });
    }
}

export default BugsServices;
