import axios from 'axios'

const API = "http://localhost:4000/api"
//@ts-ignore
export const registerRequest = user => axios.post(`${API}/register`, user)
//@ts-ignore
export const loginRequest = user => axios.post(`${API}/login`, user)