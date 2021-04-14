const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('./database');
const reviewRouter = require('./routes/review.routes');
const categoryRouter = require('./routes/category.routes');
const commentRouter = require('./routes/comment.routes');

const app = express();

// Puerto de la App
const PORT = process.env.PORT || 4000;

// Iniciar la App
app.listen(PORT, () => {
    console.log(path.join(__dirname, "../public"));
    console.log(`** Server on Port ${PORT} **`);
});

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

// Rutas
app.use('/api/reviews', reviewRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/comments', commentRouter);
