import React from 'react';
import './Cart.css';


const Cart = (props) => {

    const cart = props.cart;
    const total = cart.reduce( (total, prd) => total + prd.price*prd.quantity, 0);
 
    /*ALTERNATIVE:
    let total=0;
    for(let i=0; i<cart.length; i++){
        const product = cart[i];
        total = total + product.price;
    }*/
    const VAT = total/10;
    let shipping = 0;
    if(total > 250){
        shipping = 0;
    }
    else if(total > 100){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.45;
    }

    const formatNumber = (num) => {
        const inter = num.toFixed(2);
        return Number(inter);
    } 
    
    return (
        <div className='cart'>
            <h4 className='cart-header'>Order summary</h4>
            <p className='numOfItemsOrdered'>Items ordered: {cart.length}</p>
            <p><small>Product price: ${formatNumber(total)}</small></p>
            <p><small>VAT: ${formatNumber(VAT)}</small></p>
            <p><small>Shipping cost: ${shipping}</small></p>
            <p><small>Total price: ${formatNumber(total + shipping)}</small></p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;