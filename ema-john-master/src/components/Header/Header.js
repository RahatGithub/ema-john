import React from 'react';
import './Header.css';
import logo from '../../images/logo.png';
import { useAuth } from '../Login/UseAuth';

const Header = () => {
    const auth = useAuth();
    console.log(auth)
    return (
        <div className='header'>
            <img src={logo} alt=""/>
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order review</a>
                <a href="/inventory">Manage inventory</a>
                <a href="/login">Log in</a>
                {
                    auth.user && <span style={{color: 'goldenrod'}}>{auth.user.name}</span> 
                }
                {
                    auth.user ? <a href="/login">Sign out</a> : <a href="/login">Sign in</a>
                }
            </nav>
        </div>
    );
};

export default Header;