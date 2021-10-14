import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Products/Product';
import Cart from '../Cart/Cart';
import {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first20 = fakeData.slice(0,20);
    const [products, setProducts] = useState(first20);
    const [cart, setCart] = useState([]);

    useEffect( () => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map( existingKey => {
            const product = fakeData.find( pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        });
        setCart(cartProducts);
    },[])

    const handleAddToCart = (product) => {
        const sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== product.key);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                <ul>
                    {
                        products.map( pd => 
                            <Product 
                            key={pd.key}
                            showAddToCart={true} 
                            showBack={false}
                            product={pd} 
                            addToCart={handleAddToCart}>       
                            </Product>
                        )
                    }
                </ul>
            </div>
            <div className="cart-container"> 
                <Cart cart={cart} >
                    <Link to='/review'> 
                        <button className="addToCartBtn">Review order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;