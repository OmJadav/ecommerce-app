import { createContext, useEffect, useState } from 'react'
import { fetchDataApi } from './api';
import { useLocation } from 'react-router-dom';

export const Context = createContext();

const AppContext = ({ children }) => {

    const [categories, setCategories] = useState();
    const [products, setProducts] = useState();
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartSubTotal, setCartSubTotal] = useState(0)

    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const handleAddToCart = (product, quantity) => {
        let items = [...cartItems]
        let index = items.findIndex(p => p._id === product._id)
        if (index !== -1) {
            items[index].quantity += quantity
        } else {
            product.quantity = quantity;
            items = [...items, product];
        }
        setCartItems(items)
    }
    const handleRemoveFromCart = (product, quantity) => {
        let items = [...cartItems]
        items = items.filter(p => p._id !== product._id)
        setCartItems(items)
    }
    const handleCartProductQuantity = (type, product) => {
        let items = [...cartItems]
        let index = items.findIndex(p => p._id === product._id)
        if (type === "inc") {
            items[index].quantity += 1;
        } else if (type === 'dec') {
            if (items[index].quantity === 1) return;
            items[index].quantity -= 1;
        }
        setCartItems(items);
    }


    useEffect(() => {
        let count = 0;
        cartItems.map(item => count += item.quantity)
        setCartCount(count)
        let subTotal = 0;

        cartItems.map(item => subTotal += item.price * item.quantity)
        setCartSubTotal(subTotal)
    }, [cartItems])

    useEffect(() => {
        getCategories();
        getProducts();
    }, []);

    const getCategories = () => {
        fetchDataApi("/api/categories/allcategories").then((res) => {
            // console.log(res);
            setCategories(res.categories);
        });
    };
    const getProducts = () => {
        fetchDataApi("/api/products/allproducts").then((res) => {
            // console.log(res);
            setProducts(res);
        });
    };
    return (
        <Context.Provider value={{
            categories,
            setCategories,
            products,
            setProducts,
            cartItems,
            setCartItems,
            cartCount,
            setCartCount,
            cartSubTotal,
            setCartSubTotal,
            handleAddToCart,
            handleRemoveFromCart,
            handleCartProductQuantity
        }}>
            {children}
        </Context.Provider>
    )
}
export default AppContext;


//https://youtu.be/GKYr5eWm8EY?t=21563