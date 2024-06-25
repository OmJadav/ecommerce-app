import express from 'express'
import Stripe from "stripe";
import dotenv from 'dotenv'
const router = express.Router();
dotenv.config();
const calculateAmount = (discount, productPrice) => {
    let amount = productPrice - (productPrice * (discount / 100));
    // console.log(amount);
    return Math.round(amount * 100);
}

const stripe = new Stripe(process.env.STRIPE_KEY)
router.post('/checkout-session', async (req, res) => {
    try {
        const products = req.body.products
        const totalAmount = req.body.totalAmount
        const discount = req.body.discount
        // console.log(products);
        const lineItems = products.map((product) => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: product.product.title,
                    images: [product.product.thumbnail],
                },
                unit_amount: calculateAmount(discount, product.product.price),
            },
            quantity: product.quantity,
        }))
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONT_END_URL}/order-confirm?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONT_END_URL}/order-cancelled`,
        });

        res.json({ id: session.id })
    } catch (err) {
        console.error("Error in stripeCheckout : ", err.message);
        res.status(501).json({ error: "INTERNAL SERVER ERROR" })
    }
});
export default router;