import React from 'react';
import './Review.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import giphy from '../../images/giphy.gif';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/UseAuth';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const auth = useAuth();

    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }
    let showGiphy;
    if(orderPlaced === true){
        showGiphy = <img src={giphy} alt=""/>
    }

    const handleRemoveItem = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    
    useEffect( () => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map( existingKey => {
            const product = fakeData.find( pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        });
        setCart(cartProducts);
    }, [])
    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    cart.map( pd => <ReviewItem 
                        key = {pd.key}
                        removeItem = {handleRemoveItem}
                        product={pd}></ReviewItem>)
                }
                { showGiphy } 
                {
                    cart.length === 0 && 
                    <h1>You have not started shopping yet. <a href='/shop'>Start shopping now?</a></h1>
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to='shipment'>
                        {
                            auth.user ? 
                            <button className="addToCartBtn">Proceed checkout</button>
                            :
                            <button className="addToCartBtn">Login to proceed</button>
                        }
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Review;