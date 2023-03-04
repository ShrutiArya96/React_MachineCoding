import { useReducer, createContext } from "react";

export const CartState = createContext();

function cartReducer(state, action) {
    switch (action.type) {
        case "add": 
            return {
                products: [...state.products, action.payload]
            }
        case "remove": 
            let products = JSON.parse(JSON.stringify(state.products));
            products = products.filter((prod) => prod.id !== action.payload.id);
            return {products: [...products]}
        default:
            return state

    }

}

function filtersReducer(state, action) {
    switch(action.type) {
        case "updateSearch":
            return {...state, searchText: action.payload}
        case "sortPriceHighToLow":
            return {...state, priceHighToLow: true, priceLowToHight: false}
        case "sortPriceLowToHigh":
            return {...state, priceHighToLow: false, priceLowToHight: true}
    }
}


export default function AppContext({children}) {
    const cartState = {
        products: []
    }
    const filterState = {
        searchText: '',
        priceLowToHight: false,
        priceHighToLow: false
    }

    const [cartStateValue, dispatchCartUpdate] = useReducer(cartReducer, cartState);
    const [filterValues, dispatchUpdateFilters] = useReducer(filtersReducer, filterState)
    return (
        <CartState.Provider value={{cartStateValue, dispatchCartUpdate, filterValues, dispatchUpdateFilters}}>
            {children}
        </CartState.Provider>
    )

}