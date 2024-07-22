import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Remplacez par l'URL de votre API NestJS

export const getChauffeurs = () => axios.get(`${API_URL}/chauffeurs`).then(res => res.data);
export const getChauffeurById = (id: number) => axios.get(`${API_URL}/chauffeurs/${id}`).then(res => res.data);
export const createChauffeur = (chauffeur: any) => axios.post(`${API_URL}/chauffeurs`, chauffeur).then(res => res.data);
export const updateChauffeur = (id: number, chauffeur: any) => axios.put(`${API_URL}/chauffeurs/${id}`, chauffeur).then(res => res.data);
export const deleteChauffeur = (id: number) => axios.delete(`${API_URL}/chauffeurs/${id}`).then(res => res.data);