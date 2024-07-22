import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your API URL

export const getCamions = () => axios.get(`${API_URL}/camions`).then(res => res.data);
export const getCamionById = (id: number) => axios.get(`${API_URL}/camions/${id}`).then(res => res.data);
export const createCamion = (camion: any) => axios.post(`${API_URL}/camions`, camion).then(res => res.data);
export const updateCamion = (id: number, camion: any) => axios.put(`${API_URL}/camions/${id}`, camion).then(res => res.data);
export const deleteCamion = (id: number) => axios.delete(`${API_URL}/camions/${id}`).then(res => res.data);
