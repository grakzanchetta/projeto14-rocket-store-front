import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../css/reset.css';
import '../css/globalStyle.css';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login.js';

export default function App(){

return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/sign-up' element={<SignUp />} />
        </Routes>
    </BrowserRouter>
)

}