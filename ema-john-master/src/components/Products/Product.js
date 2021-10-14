import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {name, img, price, seller, stock, key} = props.product;
    
    return (
        <div className='product'>
            <div className='product-image'>
                <img src={img} alt=""/>
            </div>
            <div className='product-details'>
                <h4 className='product-name'><Link to={'/product/'+key}>{name}</Link></h4>
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock- order soon</small></p>
                {props.showAddToCart === true &&
                    <button className="addToCartBtn" onClick={() => props.addToCart(props.product)}> 
                        <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon> Add to cart
                    </button>
                }
                {props.showBack === true &&
                    <Link to='/shop'> <button className='addToCartBtn'>Back</button> </Link>
                }
            </div>
        </div>
    );
};

export default Product;