import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Remplacez par l'URL de votre API NestJS

export const getProgrammes = () => axios.get(`${API_URL}/programmes`).then(res => res.data);
export const getProgrammeById = (id: number) => axios.get(`${API_URL}/programmes/${id}`).then(res => res.data);
export const createProgramme = (programme: any) => axios.post(`${API_URL}/programmes`, programme).then(res => res.data);
export const updateProgramme = (id: number, programme: any) => axios.put(`${API_URL}/programmes/${id}`, programme).then(res => res.data);
export const deleteProgramme = (id: number) => axios.delete(`${API_URL}/programmes/${id}`).then(res => res.data);