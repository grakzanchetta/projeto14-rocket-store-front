import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import axios from 'axios';

import CartContext from "../contexts/CartContext";
import cartImg from '../images/cart.png';

export default function Checkout() {
    const [buyerTicket, setBuyerTicket] = useState({ name: "", card: "", cvv: "", valid: "" });
    const { cart, setCart } = useContext(CartContext);
    

    useEffect (() => {
        async function getCart(){
            try{
                const {data} = await axios.get('https://projeto-rocket-store.herokuapp.com/cart');
                console.log(data);
                setCart(data);
            } catch (error) {
                console.error(error.response);
            }
        }
        getCart();
    }, []);

    function renderPokeCart(){

        let total = cart.reduce(getTotal, 0);
        function getTotal(total, item) {
        return total + (item.price * item.amount);
        }

        return cart.map((d, index) => (
            <PokeContainer>
                <img src={d.image} alt="pokemon"/>
                <h2>{d.name}</h2>
                <p><h4>Quantidade: {d.amount}</h4><br/>
                <h4>Preço: ${d.price}</h4></p>
                <h1>{total}</h1>
            </PokeContainer>  
                
        ));
    }

    function confirmarCompra() {
        alert("a compra foi confirmada!")
    }

    return (
        <Container>
            <div>
                <h1>ROCKET STORE</h1>
                <img className="cartImage" src={cartImg} alt="Cart" />
                <h3> Para confirmar a compra <br />preencha os dados</h3>
            </div>
            {renderPokeCart()}
            <form onSubmit={confirmarCompra}>
                <input placeholder="Nome impresso no cartão" value={buyerTicket.name} onChange={e => setBuyerTicket({ ...buyerTicket, name: e.target.value })} required />
                <input placeholder="Numero do cartão" value={buyerTicket.card} onChange={e => setBuyerTicket({ ...buyerTicket, card: e.target.value })} required />
                <input placeholder="Código de segurança" value={buyerTicket.cvv} onChange={e => setBuyerTicket({ ...buyerTicket, cvv: e.target.value })} required />
                <input placeholder="Validade" value={buyerTicket.valid} onChange={e => setBuyerTicket({ ...buyerTicket, valid: e.target.value })} required />
                <button typeof="submit">Comprar!!!</button>
            </form>
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
    
    h1 {
        font-family: 'Bangers', cursive;
        font-size: 45px;
        margin-bottom: 10px;
        color: #891e8c;
    }
    
    h3 {
        font-family: 'Bangers', cursive;
        font-size: 25px;
        margin-bottom: 20px;
        color: #891e8c;
    }
    
    .cartImage {
        height: 200px;
        margin-bottom: 20px;
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
}

.buttons {
    display: flex;
    align-items: center;
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
