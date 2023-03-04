import {useState, useEffect, useContext} from 'react';
import './SingleProduct.css';
import {CartState} from '../../Context'

export default function SingleProduct({renderActions, product}) {
    const {cartStateValue, dispatchCartUpdate} = useContext(CartState);

    return (
        <>
            <div className='product-card'>
                <img className='product-card-image' src={product.images[0]} alt='Product Image'/>
                <p>{product.title}</p>
                <p>{product.price}</p>
                <div className='actions'>
                {renderActions(product)}
                </div>
            </div>

        </>
    )
}