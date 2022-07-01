import express from 'express';
import configViewEngine from './configs/viewEngine';
import initialWebRouter from './routes/web';
import initialApiRouter from './routes/api';
import connectDB from './configs/connectDB';
import cors from 'cors';

require('dotenv').config();

const app = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin',process.env.REACT_URL || 'http://localhost:3000/');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

app.use(cors({origin  :true }));

const port = process.env.PORT || 8080;



connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);
initialApiRouter(app);
initialWebRouter(app);

app.listen(port, ()=>{
    console.log("Backend is running with port : " + port);
})