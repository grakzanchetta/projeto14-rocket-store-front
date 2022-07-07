import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home (){

const [pokemons, setPokemons] = useState([]);

useEffect (() => {
    async function getPokeMarket(){
        try{
            const {data} = await axios.get('http://localhost:5000/home');
            console.log(data);
            setPokemons(data);
        } catch (error) {
            console.error(error.response);
        }
    }
    getPokeMarket();
}, []);

function renderPokeMarket(){
    return pokemons.map((d, index) => (
        <>
            <img src={d.image} alt="pokemon"/>
        </>
    ));
}

    return (
        <Container>
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
`