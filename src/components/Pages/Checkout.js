import styled from "styled-components";
import { useState } from "react";

import cart from '../images/cart.png';

export default function Checkout() {

    const [buyerTicket, setBuyerTicket] = useState({ name: "", card: "", cvv: "", valid: "" });
    



    function confirmarCompra() {
        alert("a compra foi confirmada!")
    }




    return (
        <Container>
            <div>
                <h1>ROCKET STORE</h1>
                <img className="cartImage" src={cart} alt="Cart" />
                <h3> Para confirmar a compra <br />preencha os dados</h3>
            </div>
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

