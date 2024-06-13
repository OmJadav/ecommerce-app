import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Category from "./components/Category/Category";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import AppContext from './utils/context';
import { Loginpage } from './components/auth/Loginpage'
import { Registerpage } from './components/auth/Registerpage'

function App() {
  return (
    <BrowserRouter>
      <AppContext>
        {/* <Header /> */}
        <Routes>
          <Route path='/' element={<><Header /><Home /><Newsletter /><Footer /></>} />
          <Route path='/category/:id' element={<><Header /><Category /><Newsletter /><Footer /></>} />
          <Route path='/product/:id' element={<><Header /><SingleProduct /><Newsletter /><Footer /></>} />
          <Route path='/login' element={<Loginpage />} />
          <Route path='/register' element={<Registerpage />} />
        </Routes>
        {/* <Newsletter /> */}
        {/* <Footer /> */}
      </AppContext>
    </BrowserRouter>
  );
}

export default App;
