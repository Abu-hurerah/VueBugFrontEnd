import jwtDecode from 'jwt-decode';

class Utilities {
    static saveTokenToStorage(token) {
        try {
            localStorage.setItem('userToken', token);
            console.log('Token saved successfully to local storage.', token);
        } catch (error) {
            console.error('Failed to save token:', error);
        }
    }

    static getTokenFromStorage() {
        try {
            const token = localStorage.getItem('userToken');
            console.log('Token retrieved successfully from local storage.', token);
            return token;
        } catch (error) {
            console.error('Failed to retrieve token:', error);
            return null;
        }
    }

    static clearTokenFromStorage() {
        try {
            localStorage.removeItem('userToken');
            console.log('Token removed successfully from local storage.');
        } catch (error) {
            console.error('Failed to remove token:', error);
        }
    }

    static decodeToken() {
        try {
            const token = this.getTokenFromStorage();
            if (token) {
                const decoded = jwtDecode(token);
                console.log('Decoded token:', decoded);
                return decoded;
            } else {
                console.error('No token found in storage.');
                return null;
            }
        } catch (error) {
            console.error('Failed to decode token:', error);
            return null;
        }
    }
    static saveUserInfo(userType){
        try {
            localStorage.setItem('userinfo', userType);
            console.log('Data saved successfully to local storage.', userType);
        } catch (error) {
            console.error('Failed to save data:', error);
        }
    }
    static getuserInfo() {
        try {
            const userType = localStorage.getItem('userinfo');
            console.log('Data retrieved successfully from local storage.', userType);
            return userType;
        } catch (error) {
            console.error('Failed to retrieve data:', error);
            return null;
        }
    }
}

export default Utilities;
