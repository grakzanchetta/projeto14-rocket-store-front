import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000';

export async function login(user) {
    try {
        const req = await axios.post('/login', user);
        console.log(req);
    } catch (error) {
        alert("Falha no login.");
    }    
}