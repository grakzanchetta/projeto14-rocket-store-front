import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import '../css/reset.css';
import '../css/globalStyle.css';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login.js';
import Home from './Pages/Home.js';
import Cart from './Pages/Cart.js';
import Checkout from './Pages/Checkout';
import TokenContext from './contexts/TokenContext.js';
import CartContext from './contexts/CartContext.js';

export default function App(){
    const [token, setToken] = useState(null);
    const [cart, setCart] = useState([]);

    return (
        <BrowserRouter>
            <TokenContext.Provider value={{ token, setToken }}>
            <CartContext.Provider value={{ cart, setCart}} >
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/sign-up' element={<SignUp />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/checkout' element={<Checkout />} />
                </Routes>
            </CartContext.Provider>
            </TokenContext.Provider>
        </BrowserRouter>
    )
}