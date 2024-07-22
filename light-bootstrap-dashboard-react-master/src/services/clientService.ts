import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Remplacez par l'URL de votre API NestJS

export const getClients = () => axios.get(`${API_URL}/clients`).then(res => res.data);
export const getClientById = (id: number) => axios.get(`${API_URL}/clients/${id}`).then(res => res.data);
export const createClient = (client: any) => axios.post(`${API_URL}/clients`, client).then(res => res.data);
export const updateClient = (id: number, client: any) => axios.put(`${API_URL}/clients/${id}`, client).then(res => res.data);
export const deleteClient = (id: number) => axios.delete(`${API_URL}/clients/${id}`).then(res => res.data);