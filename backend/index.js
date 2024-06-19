import express from 'express'
import process from 'process'
import cors from 'cors'
import dotenv, { config } from 'dotenv';
import connectDb from './dbConfig/dbConfig.js';
import productRoutes from './routes/productsRoute.js';
import categoryRoutes from './routes/categoryRoute.js'
import bodyParser from 'body-parser'
dotenv.config();
connectDb();
const app = express();
const port = process.env.PORT || 8080
// app.get('/', (req, res) => {
//     res.send("<h1>Backend is ready</h1>")
// })
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/products", productRoutes)
app.use("/api/categories", categoryRoutes)
app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
})


// stock
// price
// category
// rating