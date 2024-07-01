import { createContext, useEffect, useState } from 'react'
import { fetchDataApi, sendDataApi } from './api';
import { useLocation } from 'react-router-dom';
import useFetch from '../components/Hooks/useFetch';
import backendUrl from './backendUrl';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../components/Loader/Loader';

export const Context = createContext();

const AppContext = ({ children }) => {

    const [categories, setCategories] = useState();
    const [products, setProducts] = useState();
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartSubTotal, setCartSubTotal] = useState(0)
    const [userData, setUserData] = useState(null);
    const [fetchCartFlag, setFetchCartFlag] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const userInfo = JSON.parse(localStorage?.getItem('userInfo'))
    const userId = userInfo?._id;
    const { data: loggedInUserData, loading: userLoading } = useFetch(userId ? `/api/user/profile/${userId}` : null);
    // console.log(loggedInUserData);
    const location = useLocation();
    useEffect(() => {
        if (loggedInUserData) {
            setUserData(loggedInUserData);
        }
    }, [loggedInUserData, userData]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    useEffect(() => {
        let count = 0;
        cartItems.forEach((item) => (count += item.quantity));
        setCartCount(count);
        let subTotal = 0;
        cartItems.forEach((item) => (subTotal += item?.product?.price * item.quantity));
        setCartSubTotal(subTotal);
    }, [cartItems]);

    const handleAddToCart = async (product, quantity) => {
        let items = [...cartItems];
        // let index = items?.findIndex((p) => p._id === product?._id);
        let index = cartItems.findIndex((p) => p.product._id === product._id);
        if (index !== -1) {
            alert("product already added")
        } else {
            product.quantity = quantity;
            items = [...items, product];
            setCartItems(items);
            let newItem = {
                quantity,
                product: product._id,
                user: userId,
            }
            await sendDataApi(`/api/cart/add-to-cart`, newItem)
            setFetchCartFlag(!fetchCartFlag);
        }
    };
    const handleRemoveFromCart = async (product) => {
        let items = [...cartItems];
        items = items?.filter((p) => p._id !== product._id);
        setCartItems(items);
        await sendDataApi(`/api/cart/delete-cart-product/${product._id}`, { userId: userId });
        setFetchCartFlag(!fetchCartFlag);
    };

    useEffect(() => {
        const userCartItems = async () => {
            try {
                if (userId) {
                    const response = await axios.get(`${backendUrl}/api/cart/fetch-cart/${userId}`, {
                        withCredentials: true,
                    })
                    setCartItems(response.data)
                    return response.data
                }
            } catch (error) {
                console.error("ERROR in fetching data API: " + error.message);
                console.log(error.response.data.error);
                toast.error(error.response.data.error);
            }
        }
        userCartItems();

    }, [userId, fetchCartFlag])

    const handleCartProductQuantity = async (type, product) => {
        let items = [...cartItems];
        let index = items.findIndex((p) => p._id === product._id);
        if (type === "inc") {
            items[index].quantity += 1;
        } else if (type === "dec") {
            if (items[index].quantity === 1) return;
            items[index].quantity -= 1;
        }
        setCartItems(items);
        await sendDataApi(`/api/cart/updatecart/${product._id}`, { quantity: items[index].quantity, userId })
        setFetchCartFlag(!fetchCartFlag);
    };

    useEffect(() => {
        getCategories();
        getProducts();

    }, []);

    const getCategories = async () => {
        try {
            const res = await fetchDataApi("/api/categories/allcategories")
            setCategories(res.categories);
        } catch (error) {
            console.error(error);
        } finally {
        }
    };
    const getProducts = async () => {
        try {
            const res = await fetchDataApi("/api/products/allproducts");
            setProducts(res);
        } catch (error) {
            console.error(error);
        } finally {
        }
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
            handleCartProductQuantity,
            userData,
            setUserData,
            userRole,
            setUserRole,
            userLoading
        }}>
            {children}
        </Context.Provider>
    )
}
export default AppContext;







