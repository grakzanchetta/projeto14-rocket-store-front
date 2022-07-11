import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import TokenContext from '../contexts/TokenContext.js';
import cartImg from '../images/cart.png';

export default function Cart() {
    const { token } = useContext(TokenContext);
    const [cart, setCart] = useState([]);

    useEffect (() => {
        async function getCart(){
            try{
                const {data} = await axios.get('https://projeto-rocket-store.herokuapp.com/cart', token);
                setCart(data);
            } catch (error) {
                console.error(error.response);
            }
        }
        getCart();
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

    return (
        <Container>
            <div>
                <h1>ROCKET STORE</h1>
                <Link to='/checkout'>
                <img className="cartImage" src={cartImg} alt="Cart" />
                </Link>
                <h3> Para ir para o pagamento <br />clique na pokebola acima!</h3>
            </div>
            {buildCart()}
            <h3>Total da Compra: $ {getTotalValue()}</h3>
            <Link to='/home'>Continuar comprando</Link>
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