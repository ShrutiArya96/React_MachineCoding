import './ProductList.css';
import {useState, useEffect, useContext} from 'react';
import SingleProduct from '../SingleProduct/SingleProduct'
import { CartState } from '../../Context';

export default function ProductList() {
    const {cartStateValue, dispatchCartUpdate, filterValues, dispatchUpdateFilters} = useContext(CartState);

    const [productList, setProductList] = useState(null);
    const [filteredList, setFilteredList] = useState(null);
    async function fetchProductList() {
        let data = await fetch('https://dummyjson.com/products');
        data =  await data.json();
        setProductList(data.products);
        setFilteredList(data.products);
        console.log(data.products)
    }

    useEffect(() => {
        fetchProductList()
    }, []);

    useEffect(() => {
        let data = JSON.parse(JSON.stringify(productList));
        if(filterValues.searchText.length > 0) {
            data = data.filter(el => {
                let title = el.title.toLowerCase();
                return title.includes(filterValues.searchText.toLowerCase())
            })
        }
        setFilteredList(data);
    }, [filterValues]);

    function addToCart(product) {
        dispatchCartUpdate({type: "add", payload: product});
    }

    function renderActions(product) {
        return (
            <button onClick={() => addToCart(product)} style={{'backgroundColor': 'green'}}>
                Add to cart
            </button>
        )
    }
    return (
        <>
        <div className='product-list'>
            {filteredList && filteredList.map(product => <SingleProduct renderActions={renderActions} key={product.id}  product={product}/>)}
            </div>
        </>
    )
}