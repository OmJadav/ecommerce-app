import express from 'express'
import process from 'process'
import cors from 'cors'
import dotenv, { config } from 'dotenv';
import connectDb from './dbConfig/dbConfig.js';
import productRoutes from './routes/productsRoute.js';
import categoryRoutes from './routes/categoryRoute.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoute.js'
import cartRoutes from './routes/cartRoute.js'
import orderRoutes from './routes/orderRoute.js'
import userRoutes from './routes/userRoute.js'
import stripeCheckoutRoute from './routes/stripeCheckout.js'
import bodyParser from 'body-parser'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
dotenv.config();
connectDb();
const app = express();
const port = process.env.PORT || 8080
// app.get('/', (req, res) => {
//     res.send("<h1>Backend is ready</h1>")
// })

app.use(cors({
    origin: process.env.FRONT_END_URL,
    // origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use("/api/products", productRoutes)
app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)
app.use('/api/cart', cartRoutes)
app.use('/stripe', stripeCheckoutRoute);
app.use("/api/categories", categoryRoutes)
app.use("/api/orders", orderRoutes)
app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
})
