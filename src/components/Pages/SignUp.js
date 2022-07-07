import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from '../images/logo.png';
import dotenv from 'dotenv';
dotenv.config();

export default function SignUp() {
    const [user, setUser] = useState({name: "", email: "", password: "", confirmPassword:""});
    const navigate = useNavigate();

    async function signUp(event) {
        event.preventDefault();
        
        try {
            await axios.post(`https://projeto14-rocket-store.herokuapp.com/sign-up`, user);
            navigate('/');
        } catch (error) {
            alert(error.response.data);
        }
    }

    return (
        <Container>
            <div>
                <img src={logo} alt="Logo" />
                <h1>ROCKET STORE</h1>
            </div>
            <form onSubmit={signUp}>
                <input required type="text" placeholder="Nome" value={user.name} onChange={e => setUser({...user, name: e.target.value.replace(" ", "")})} />
                <input required type="email" placeholder="E-mail" value={user.email} onChange={e => setUser({...user, email: e.target.value})} />
                <input required type="password" placeholder="Senha" value={user.password} onChange={e => setUser({...user, password: e.target.value})} />
                <input required type="password" placeholder="Confirme a senha" value={user.confirmPassword} onChange={e => setUser({...user, confirmPassword: e.target.value})} />
                <button typeof="submit">Cadastrar</button>
            </form>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <p>Já sou cadastrado!</p>
            </Link>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    justify-content: space-between;
    background-color: #C8C6D7;
    padding: 60px 20px 20px 20px;
    text-align: center;

img {
    height: 200px;
}

h1 {
    font-family: 'Bangers', cursive;
    font-size: 45px;
    color: #891e8c;
}

form {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
}

input {
    margin-bottom: 15px;
    height: 50px;
    width: 100%;
    border-radius: 5px;
    border: 2px solid #4F1271;
    background-color: #c8c6d7;
    color: #4A4063;
    padding-left: 15px;
    font-size: 18px;
}

button {
    height: 50px;
    width: 50%;
    border-radius: 30px;
    border: none;
    font-size: 18px;
    background-color: #783F8E;
    color: #C8C6D7;
    margin-top: 30px;
}

p {
    font-size: 14px;
    color: #4A4063;
}
`