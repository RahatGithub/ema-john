import React from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Products/Product';
import fakeData from '../../fakeData';

const ProductDetails = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey);
    return (
        <div>
            <Product showAddToCart={false} showBack={true} product={product}> </Product>
        </div>
    );
};

export default ProductDetails;