import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from '../images/logo.png';
import TokenContext from "../contexts/TokenContext";
import EmailContext from "../contexts/EmailContext";

export default function Login() {
    const [user, setUser] = useState({email: "", password: ""});
    const navigate = useNavigate();
    const { setToken } = useContext(TokenContext);
    const { setEmail } = useContext(EmailContext);

    async function login(event) {
        event.preventDefault();
        
        try {
            const token = await axios.post(`https://projeto-rocket-store.herokuapp.com/login`, user);
            setToken({headers: {Authorization: `Bearer ${token.data}`}});
            localStorage.setItem("token", JSON.stringify({headers: {Authorization: `Bearer ${token.data}`}}));
            setEmail(user.email);
            localStorage.setItem("email", user.email);
            navigate('/home');
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
            <form onSubmit={login}>
                <input required type="email" placeholder="E-mail" value={user.email} onChange={e => setUser({...user, email: e.target.value})} />
                <input required type="password" placeholder="Senha" value={user.password} onChange={e => setUser({...user, password: e.target.value})} />
                <button typeof="submit">Entrar</button>
            </form>
            <Link to="/sign-up" style={{ textDecoration: 'none' }}>
                <p>Não tem uma conta? Cadastre-se!</p>
            </Link>
            <footer>
                <h6>Gotta Buy 'Em All</h6>
                <p>ポケモンに害はありませんでした、<br /> このウェブサイトの作成中。</p>
            </footer>
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

footer {
    color: #4A4063;

    h6 {
    margin-bottom: 10px;
    font-family: 'Press Start 2P', cursive;
    font-size: 10px;
    }

    p {
        font-family: 'Noto Sans JP', sans-serif;
        font-size: 6px;
    }
}
`