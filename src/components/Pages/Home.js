import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TokenContext from "../contexts/TokenContext.js";
import CartContext from "../contexts/CartContext.js";

import cartImg from '../images/cart.png';

export default function Home (){
    const { token } = useContext(TokenContext);
    const { cart, setCart } = useContext(CartContext);
    const [pokemons, setPokemons] = useState([]);
    const [cartId, setCartId] = useState(null);
    const navigate = useNavigate();

    useEffect (() => {
        async function getPokeMarket(){
            try{
                const {data} = await axios.get('https://projeto-rocket-store.herokuapp.com/home', token);
                setPokemons(data);
                setCart(data);
            } catch (error) {
                console.error(error.response);
            }
        }
        getPokeMarket();
    }, []);

    function renderPokeMarket(){
        return pokemons.map((d, index) => (
            <PokeContainer key={index}>
                <img src={d.image} alt="pokemon"/>
                <h2>{d.name}</h2>
                <p><h4>Tipo: {d.type}</h4><br/>
                <h4>Preço: ${d.price}</h4></p>
                <div className="buttons">
                    <button onClick={() => colocarPokemonNoCarrinho(index)}>+</button>
                    <div>00</div>
                    <button onClick={() => removerPokemonDoCarrinho(index)}>-</button>
                </div>
            </PokeContainer>      
        ));
    }

    function colocarPokemonNoCarrinho(index){
        if(cart[index].amount) {
            setCart(cart, cart[index].amount = cart[index].amount + 1);
            delete cart[index]._id;
            delete cart[index].type;
            updateCart(cart.filter(e => e.amount));
        } else {
            setCart(cart, cart[index].amount = 1);
            updateCart(cart.filter(e => e.amount));
        }
    }

    function removerPokemonDoCarrinho(index){
        if(cart[index].amount && cart[index].amount > 0) {
            setCart(cart, cart[index].amount = cart[index].amount - 1);
            delete cart[index]._id;
            delete cart[index].type;
            updateCart(cart.filter(e => e.amount));
        }
    }

    async function updateCart(cart) {
        try {
            if(cartId) {
                await axios.put('https://projeto-rocket-store.herokuapp.com/cart', {
                    ...cart,
                    _id: cartId
                } ,token);
            } else {
                const resp = await axios.post('https://projeto-rocket-store.herokuapp.com/cart', cart, token);
                setCartId(resp.data);
                console.log(resp.data);
            }
        } catch (error) {
            console.error(error.response);
        }
    }

    function irParaCheckout(){
        alert("eu tou indo pro checkout!");
        navigate('/checkout');
    }


    return (
        <Container>
            <div>
                <h1>ROCKET STORE</h1>
                <img className="cartImage" onClick={irParaCheckout}  src={cartImg} alt="Cart" />
                <h3> Para prosseguir com o checkout <br/>clique na pokebola acima!</h3>
            </div>

             {renderPokeMarket()}
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
    margin-left: 0.3em;
}

.buttons {
    display: flex;
    align-items: center;
}

.buttons div {
    background-color: #783F8E;
    color: #C8C6D7;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
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