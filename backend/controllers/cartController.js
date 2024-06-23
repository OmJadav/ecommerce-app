import Cart from '../models/CartSchema.js'

export const addToCart = async (req, res) => {
    try {
        const newItem = req.body;
        // const { userId, product } = newItem;
        const cart = new Cart(newItem);
        const cartSave = await cart.save();
        const result = await cartSave.populate('product');
        res.status(201).json({ result, message: "Item Added in Cart" });
    } catch (error) {
        console.error("ERROR in add to cart : ", error.message);
        res.status(501).json({ error: "INTERNAL SERVER ERROR" })
    }
}

export const fetchUserCart = async (req, res) => {
    try {
        const { id } = req.params;
        const cartItems = await Cart.find({ user: id }).populate('product');
        if (cartItems) {
            res.status(201).json(cartItems)
        } else {
            res.status(401).json({ error: "Something went wrong!" })
        }
    } catch (error) {
        console.error("ERROR in fetch user cart : ", error.message);
        res.status(501).json({ error: "INTERNAL SERVER ERROR" })
    }
}

export const updateCart = async (req, res) => {
    try {
        const productId = req.params.productId;
        const { quantity } = req.body;

        console.log('Quantity:', quantity);
        console.log('Product ID:', productId);

        let cart = await Cart.findById(productId);
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        cart.quantity = quantity;
        cart = await cart.save();

        const result = await cart.populate('product')

        res.status(200).json(result);
    } catch (error) {
        console.error("ERROR in update cart: ", error.message);
        res.status(501).json({ error: "INTERNAL SERVER ERROR" });
    }
};

// export const updateCart = async (req, res) => {
//     try {
//         const { productId } = req.params;
//         const { quantity, userId } = req.body;

//         console.log('Quantity:', quantity);
//         console.log('Product ID:', productId);
//         console.log('User ID:', userId);

//         let cart = await Cart.findById(productId);
//         if (!cart) {
//             return res.status(404).json({ error: "Cart not found" });
//         }




//         cart.quantity = quantity;
//         cart = await cart.save();

//         const result = await cart.populate('product')

//         res.status(200).json(result);
//     } catch (error) {
//         console.error("ERROR in update cart: ", error.message);
//         res.status(501).json({ error: "INTERNAL SERVER ERROR" });
//     }
// };


export const deleteCartProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { userId } = req.body;
        // console.log("product ", productId);
        // console.log(userId);
        const cart = await Cart.findOneAndDelete({ product: productId, user: userId });

        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        res.status(200).json({ message: "Product removed from cart" });
    } catch (error) {
        console.error("ERROR in delete product from cart: ", error.message);
        res.status(501).json({ error: "INTERNAL SERVER ERROR" });
    }
};