import Vue from 'vue';
import Utilities from '@/helpers/Utilites';
const API_URL = "http://localhost:8080/projects"; // Adjust if your base URL is different

class ProjectServices {
    // Retrieve all projects
    static getAllProjects(page = 1, itemsPerPage = 6, OrderBy = 'ASC', name = '') {
        const token = Utilities.getTokenFromStorage(); // Ensure this method correctly retrieves the token
        console.log("Token: ", token);

        // Include pagination, sorting, and name search parameters in the request URL
        const queryParams = `?page=${page}&limit=${itemsPerPage}&OrderBy=${OrderBy}&name=${encodeURIComponent(name)}`;
        console.log(queryParams);

        return Vue.http.get(API_URL + queryParams, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(response => {
                console.log("Response Inside", response.body); // Assuming vue-resource which uses .body
                return response.body; // Ensure this matches how your API formats responses
            })
            .catch(error => {
                console.error('Failed to fetch projects:', error);
                if (error.response) {
                    console.error('Error response:', error.response.status, error.response.body);
                } else {
                    console.error('Error in response:', error.message);
                }
                throw error;
            });
    }




    // Retrieve a project by ID
    static getProjectById(id) {
        return Vue.http.get(`${API_URL}/id/${id}`)
            .then(response => response.json())
            .catch(error => {
                console.error('Failed to fetch project by ID:', error);
                throw error;
            });
    }

    // Retrieve projects by name
    static getProjectsByName(name) {
        const token = Utilities.getTokenFromStorage();
        console.log("Calling the get Projects by name with term", name)
        console.log("Token Value", token)
        return Vue.http.get(`${API_URL}/name/${name}`, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(response => {
                console.log("Response Body", response.body);
                return response.body;
            })
            .catch(error => {
                console.error('Failed to fetch projects by name:', error);
                throw error;
            });
    }

    // Create a new project
    static createProject(projectData) {
        const token = Utilities.getTokenFromStorage();
        console.log("Token Value", token);
        console.log("Creating project with data:", projectData);
        console.log("Everything is good from Frontend")
        return Vue.http.post(`${API_URL}`, projectData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log("Response Inside", response.body);
                return response.body;
            })
            .catch(error => {
                console.error('Failed to create project:', error);
                throw error;
            });
    }

    // Update project details
    static updateProject(id, projectData) {
        return Vue.http.patch(`${API_URL}/${id}`, projectData)
            .then(response => response.json())
            .catch(error => {
                console.error('Failed to update project:', error);
                throw error;
            });
    }

    // Delete a project
    static deleteProject(id) {
        return Vue.http.delete(`${API_URL}/${id}`)
            .then(response => response.json())
            .catch(error => {
                console.error('Failed to delete project:', error);
                throw error;
            });
    }

    // Assign QA to a project
    static assignQAtoProject(id, qaId) {
        return Vue.http.post(`${API_URL}/Assign/QA/${id}`, { qaId })
            .then(response => response.json())
            .catch(error => {
                console.error('Failed to assign QA:', error);
                throw error;
            });
    }

    // Assign Developer to a project
    static assignDevToProject(id, devId) {
        return Vue.http.post(`${API_URL}/Assign/dev/${id}`, { devId })
            .then(response => response.json())
            .catch(error => {
                console.error('Failed to assign developer:', error);
                throw error;
            });
    }
    static Totaltaskbydone(project_id) {
        try {
            return Vue.http.get(`${API_URL}/task/${project_id}`)
                .then(response => response.data)
                .catch(error => {
                    console.error("Error during fetch:", error);
                    throw error;
                });
        } catch (error) {
            console.error('Error in method execution:', error);
            throw error; // Re-throw the error to be handled by the caller
        }
    }

}

export default ProjectServices;
