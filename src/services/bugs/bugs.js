import Vue from 'vue';
import Utilities from '@/helpers/Utilites';
const API_URL = "http://localhost:8080/bugs"; 

class BugsServices {
    static getBugsByProjectId(project_id, page = 1, itemsPerPage = 6, OrderBy = 'ASC', searchterm = '') {
        const token = Utilities.getTokenFromStorage();
        const queryParams = `?page=${page}&limit=${itemsPerPage}&OrderBy=${OrderBy}&searchterm=${encodeURIComponent(searchterm)}`;
        const apiUrlWithProjectId = `${API_URL}/project/${project_id}${queryParams}`;

        return Vue.http.get(apiUrlWithProjectId, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(response => {
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
    

    static getBugById(id) {
        return Vue.http.get(`${API_URL}/id/${id}`)
            .then(response => response.json())
            .catch(error => {
                console.error('Failed to fetch bug by ID:', error);
                throw error;
            });
    }

    static createBug(bugData) {
        const token = Utilities.getTokenFromStorage();

        return Vue.http.post(`${API_URL}`, bugData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                return response.body;
            })
            .catch(error => {
                console.error('Failed to create bug:', error);
                throw error;
            });
    }

    static updateBug(id, Status) {
        const token = Utilities.getTokenFromStorage();
        const bugData = {
            "status": Status
        }
        return Vue.http.patch(`${API_URL}/${id}`, bugData,{
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => response.json())
            .catch(error => {
                console.error('Failed to update bug:', error);
                throw error;
            });
    }

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
