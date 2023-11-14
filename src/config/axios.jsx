import axios from "axios";

// Crea una URL base en axios
const clienteAxios = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
})

export default clienteAxios;