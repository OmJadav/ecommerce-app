import express from 'express'
import process from 'process'
import dotenv, { config } from 'dotenv';
import connectDb from './dbConfig/dbConfig.js';

dotenv.config();
connectDb();
const app = express();
const port = process.env.PORT || 8080
app.get('/', (req, res) => {
    res.send("<h1>Backend is ready</h1>")
})

app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
})