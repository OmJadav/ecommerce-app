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
import { AddProductForm } from './admin/AddProductForm';
import AdminHome from './admin/AdminHome';
import AdminCategoryIn from './admin/AdminCategoryIn';
import { AdminProtected } from './components/protected/AdminProtected';
import { Toaster } from 'react-hot-toast'
import { Checkout } from './components/Checkout/Checkout';
import { OrderSuccessPage } from './components/Checkout/OrderSuccessPage';
import { CancelPage } from './components/Checkout/CancelPage';
import { UserOrders } from './components/Orders/UserOrders';
function App() {

  return (
    <BrowserRouter>
      <Toaster />
      <AppContext>
        <Routes>
          <Route path='/*' element={userRoutes()} />
          <Route path='/admin/*' element={adminRoutes()} />
          <Route path='/auth/*' element={authRoutes()} />
        </Routes>
      </AppContext>
    </BrowserRouter>
  );
}
function authRoutes() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Loginpage />} />
        <Route path='/register' element={<Registerpage />} />
      </Routes>
    </>
  );
}
function userRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<><Home /></>} />
        <Route path='/category/:id' element={<><Category /></>} />
        <Route path='/product/:id' element={<><SingleProduct /></>} />
        <Route path='/checkout' element={<><Checkout /></>} />
        <Route path='/profile' element={<><Checkout /></>} />
        <Route path='/my-orders' element={<><UserOrders /></>} />
        <Route path='/order-confirm' element={<><OrderSuccessPage /></>} />
        <Route path='/order-cancelled' element={<><CancelPage /></>} />
        <Route path='/pagenotfound' element={<><CancelPage /></>} />
      </Routes>
      <Newsletter />
      <Footer />
    </>
  )
}
function adminRoutes() {
  return (
    <>
      <Header />
      <AdminProtected>
        <Routes>
          <Route path='/' element={<><AdminHome /></>} />
          <Route path='/add-new' element={<AddProductForm />} />
          <Route path='/update-product/:id' element={<AddProductForm />} />
          <Route path='/admin-category/:id' element={<><AdminCategoryIn /></>} />
        </Routes>
      </AdminProtected>
    </>
  )
}

export default App;
