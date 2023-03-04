import Search from '../Search'
import Cart from '../Cart/Cart'
import {NavLink} from 'react-router-dom'

export default function Header() {
    return (
        <div style={{'width': '100%', 'height': '50px', 'position': 'fixed', 'backgroundColor': 'green'}}>
            <Search/>
            <NavLink to='/cart'>Cart</NavLink>
        </div>
    )
}