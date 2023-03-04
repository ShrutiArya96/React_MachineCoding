import { useState, useEffect, useContext } from "react";
import {CartState} from '../Context'

export default function Search() {
    const {filterValues, dispatchUpdateFilters} = useContext(CartState)

    let search =  (function() {
        let timer = null;
        return function(e) {
            console.log(e.target.value)
            if(timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                dispatchUpdateFilters({type: 'updateSearch', payload: e.target.value});
                timer = null;
            }, 500)
            
        }
    })();

    return (
        <input onChange={(e) => search(e)}/>
    )
}