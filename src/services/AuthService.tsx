import axios from 'axios';
import {baseUrl, signUpEndpoint, loginEndpoint} from '../utils.tsx';

const AUTH_REGISTER_API_URL = baseUrl + signUpEndpoint;
const AUTH_LOGIN_API_URL = baseUrl + loginEndpoint;
//const AUTH_API_URL = 'https://apinotes-d8eyhgcsgddrbzgv.francecentral-01.azurewebsites.net/api/auth/';

class AuthService {
  static async register(user:any) {
    try {
      const response = await axios.post(AUTH_REGISTER_API_URL, {
        name: user.firstname+ " " + user.lastname,
        email: user.email,
        phone_number:user.phone_number,
        password: user.password
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      // API notes return the user data in the data property!
      // And Axios return the content in data. So, data.data ... :-)
      // Return the data that we get from the backend.
      return response.data;

    } catch (error) {
      console.error('Register error: ', error);
      throw error;
    }
  }

  static async login(user:any) {
    try {
      const response = await axios.post(AUTH_LOGIN_API_URL, {
        email: user.email,
        password: user.password
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      // API notes return the user data in the data property!
      // And Axios return the content in data. So, data.data ... :-)
      if (response.data.data.token) {

        localStorage.setItem('user', JSON.stringify(response.data.data));
      }

      // Return the data that we get from the backend.
      return response.data;

    } catch (error) {
      console.error('Login error: ', error);
      throw error;
    }
  }

  static logout() {
    localStorage.removeItem('user');
  }

  // helpers
  static getCurrentUser() {
    const userData = localStorage.getItem('user');
    if(userData !=null)
    return JSON.parse(userData);
    else return null;
  }

  static isLogined(){
    const user = AuthService.getCurrentUser();
    return user != undefined;
  }

  static authHeader() {
    const userData = localStorage.getItem('user');
    if(userData !=null)
    {
      let user = JSON.parse(userData);

      if (user && user.token) {
        const headers = {
          Authorization: 'Bearer ' + user.token,
          'Content-Type': "application/x-www-form-urlencoded"

        }
        return headers;
      } else {
        return {

        };
      }
    }
  }
  static authHeaderJson() {
    const userData = localStorage.getItem('user');
    if(userData !=null)
    {
      let user = JSON.parse(userData);

      if (user && user.token) {
        const headers = {
          Authorization: 'Bearer ' + user.token,
         'Content-Type': 'application/json'

        }
        return headers;
      } else {
        return {

        };
      }
    }
  }

}

export default AuthService;