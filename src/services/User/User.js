import Vue from 'vue';

const API_URL = "http://localhost:8080/users"; 
import Utilities from '@/helpers/Utilites';
class UserServices {
  // Retrieve all users
  static async getAllUsers() {
    try {
      const response = await Vue.http.get(API_URL);
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Retrieve a user by name
  static async getUsersByName(name) {
    try {
      const response = await Vue.http.get(`${API_URL}/name/${name}`);
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  static navigateToSignup(router, role) {
    router.push({ name: "signup", query: { role: role } });
  }

  // Create a new user
  static async createUser(name, userType, email, password) {
    const userData = {
      name,
      user_type: userType,
      email,
      password,
    };
    try {
      const response = await Vue.http.post(`${API_URL}/signup`, userData);
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // User login
  static async loginUser(email,password) {
    try {
        const userdata = {
            email,
            password
        }
      const response = await Vue.http.post(`${API_URL}/login`, userdata);
      Utilities.saveUserInfo(response.data.user.user_type)
      Utilities.saveTokenToStorage(response.data.token)
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Update user details
  static async updateUser(id, updateData) {
    try {
      const response = await Vue.http.patch(`${API_URL}/${id}`, updateData);
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Delete user
  static async deleteUser(id) {
    try {
      const response = await Vue.http.delete(`${API_URL}/${id}`);
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default UserServices;
