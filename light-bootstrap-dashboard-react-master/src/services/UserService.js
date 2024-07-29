import axios from 'axios';

const API_URL = 'http://localhost:5000/users';

class UserService {
  createUser(user) {
    return axios.post(API_URL, user);
  }

  getAllUsers() {
    return axios.get(API_URL);
  }

  getUserById(id) {
    return axios.get(`${API_URL}/${id}`);
  }
}

export default new UserService();
