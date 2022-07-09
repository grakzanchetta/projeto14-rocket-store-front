import styled from "styled-components";

import cart from '../images/cart.png';

export default function Checkout (){

function confirmarCompra(){
    alert("a compra foi confirmada!")
}

    return (
        <Container>
            <div>
                <h1>ROCKET STORE</h1>
                <img className="cartImage" onClick={confirmarCompra}  src={cart} alt="Cart" />
                <h3> Para confirmar a compra <br/>clique na pokebola!</h3>
            </div>
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

