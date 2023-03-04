import {CartState} from '../../Context'
import SingleProduct from '../SingleProduct/SingleProduct';
import { useContext } from 'react';
import {NavLink} from 'react-router-dom'
import './Cart.css'

export default function Cart() {
    const {cartStateValue, dispatchCartUpdate} = useContext(CartState);
    function removefromCart(id) {
        dispatchCartUpdate({type: 'remove', payload: {id: id}});
    }
    function renderActions(product) {
        return (
            <button onClick={() => removefromCart(product.id)}>
                Remove
            </button>
        )
    }
    return (
         <>
            <NavLink to='/'>Back to Home</NavLink>
            <div className='productList'>
                { cartStateValue && cartStateValue.products && cartStateValue.products.map(product => {
                    return <div>
                            <SingleProduct renderActions={renderActions}  key={product.id} product={product}/>
                        </div>
                    })
                }
                {
                    cartStateValue && cartStateValue.products.length == 0 && <div>
                        <h1>Add products to the cart!</h1>
                    </div> 
                }
            </div>
        </>
    )
}