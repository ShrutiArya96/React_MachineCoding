
import './App.css';
import Main from './Components/Main';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Cart from './Components/Cart/Cart';
import AppContext from './Context'
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
       
      </div>
    </BrowserRouter>
  );
}

export default App;
