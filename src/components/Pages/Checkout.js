import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import CartContext from "../contexts/CartContext";
import TokenContext from "../contexts/TokenContext.js";
import { Link, useNavigate } from "react-router-dom";
import cartImg from '../images/cart.png';
import logo from '../images/logo.png';

export default function Checkout() {
    const [buyerTicket, setBuyerTicket] = useState({ name: "", card: "", cvv: "", valid: "" });
    const { cart, setCart } = useContext(CartContext);
    const { token, setToken } = useContext(TokenContext);
    const navigate = useNavigate();

    async function renderAuths() {
        const storageToken = localStorage.getItem("token");

        if(!token && !storageToken) {
            navigate('/');
        }
        if(!token) {
            await setToken(JSON.parse(storageToken));
        }
    }

    useEffect (() => {
        async function getCart(){
            renderAuths();
            try{
                const {data} = await axios.get('https://projeto-rocket-store.herokuapp.com/cart', token);
                setCart(data);
            } catch (error) {
                console.error(error.response);
            }
        }
        getCart();
        console.log(cart)
    }, []);

    function getTotalValue(){
        let sum = 0;
        if (cart.products !== undefined){
            
            for (let i = 0; i < cart.products.length; i++){
                sum += (cart.products[i].amount * cart.products[i].price);
            }
        }
        return (sum)
    }

    function buildCart(){
        if (cart.products !== undefined){
            return cart.products.map((d, index) => (
                <PokeContainer key={index}>
                    <img src={d.image} alt="pokemon"/>
                    <h2>{d.name}</h2>
                    <p><h4>Quantidade: {d.amount}</h4><br/>
                    <h4>Preço: ${d.price}</h4></p>
                </PokeContainer>      
            ));
        }
        
    }
  
    async function confirmarCompra(event) {
        event.preventDefault();
        console.log(buyerTicket)
        try {
            await axios.post(`https://projeto-rocket-store.herokuapp.com/checkout`, buyerTicket, token);
            alert('Compra concluída com sucesso!')
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
                <Link to='/cart'>
                <img className="cartImage" src={cartImg} alt="Cart" />
                </Link>
                <h3> Para voltar ao carrinho <br />clique na pokebola acima!</h3>
            </div>
            {buildCart()}
            <h3>Total da Compra: $ {getTotalValue()}</h3>
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

    img {
        height: 150px;
    }
    
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
        height: 100px;
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
    margin-bottom: 20px;
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