import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import '../css/reset.css';
import '../css/globalStyle.css';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login.js';
import Home from './Pages/Home.js';
import Checkout from './Pages/Checkout.js';
import TokenContext from './contexts/TokenContext.js';

export default function App(){
    const [token, setToken] = useState(null);

return (
    <BrowserRouter>
        <TokenContext.Provider value={{ token, setToken }}>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/home' element={<Home />} />
                <Route path='/checkout' element={<Checkout />} />
            </Routes>
        </TokenContext.Provider>
    </BrowserRouter>
)

}