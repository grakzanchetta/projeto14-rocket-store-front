import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import TokenContext from '../contexts/TokenContext.js';

export default function Cart() {
    const { token } = useContext(TokenContext);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.get('https://projeto-rocket-store.herokuapp.com/cart', token).then(resp => setCart(resp.data.products)).catch(resp => console.log(resp));
    }, []);

    return (
        <Container>
            {cart.map((item, index) => {
                <PokeContainer key={index}>
                    <img src={item.image} alt={item.name}/>
                    <h2>{item.name}</h2>
                    <p>Preço: ${item.price}</p>
                    <div>00</div>
                </PokeContainer>
            })}
            <Link to='/checkout'>Ir para check-out </Link>
            <Link to='/home'>Continuar comprando</Link>
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


`

const PokeContainer = styled.div`

background-color: #ffffff;
margin-bottom: 30px;
border-radius: 18px;
width: 90vw;
height: 70px;
display: flex;
align-items: center;
justify-content: space-around;

img {
    height: 60px;
}

button {
    height: 25px;
    width: 25px;
    border-radius: 50%;
    border: none;
    font-size: 18px;
    background-color: #783F8E;
    color: #C8C6D7;
    margin-right: 0.3em;
    margin-left: 0.3em;
}

h2 {
    font-family: 'Bangers', cursive;
    font-size: 25px;
    color: #4A4063;
}

p {
    font-style: italic;
    font-weight: bold;
    color: #000000;
}

`