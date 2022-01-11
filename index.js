const express = require('express'); 
const app = express();
const mongoose = require('mongoose'); 
const Product = require('./models/Product');
const bodyParser = require('body-parser');  
require('dotenv').config(); 

// Products
const products = [
    {
        product_name: 'Darth Vader\'s Shuttle',
        item_id: 13241234,
        reviews: 45, 
        rating: 3.5,
        availability: 'Out of Stock',
        price: 49.99,
        images: ['img1', 'img2'],
        ages: '6+',
        pieces: 345,
    },
    {
        product_name: 'Palpatine\'s Toilet',
        item_id: 45674567,
        reviews: 876,
        rating: 1.2, 
        availability: 'Temporarily Out of Stock',
        price: 24.99, 
        images: ['img1', 'img2', 'img3'], 
        ages: '18+',
        pieces: 12,  
    },
    {
        product_name: 'Luke Skywalker\'s Left Shoe',
        item_id: 67896789,
        reviews: 1, 
        rating: 5,
        availability: 'Now Available',
        price: 14.99, 
        images: ['img1'],
        ages: '18+',
        pieces: 213, 
    }
];

// Middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
    res.send('Working with MongoDB');
});

// get all products
// app.get('/api/products', async (req, res) => {
//     const products = await Product.find({});
  
//     try {
//       res.send(products);
//     } catch (error) {
//       res.status(500).send(error);
//     }
// });

// filter products
app.get('/api/products', async (req, res) => {
    const { item_id, availability, reviews, rating, price, ages, pieces } = req.query;
    if (item_id) {
        const product = await Product.find({ item_id: item_id });
        try {
            res.send(product);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    if (availability) {
        const product = await Product.find({ availability: availability });
        try {
            res.send(product);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    if (reviews) {
        const product = await Product.find({ reviews: { $gte: reviews } });
        try {
            res.send(product);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    if (rating) {
        const product = await Product.find({ rating: rating });
        try {
            res.send(product);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    if (price) {
        const product = await Product.find({ price: price });
        try {
            res.send(product);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    if (ages) { // need to encode plus sign '%2B'
        const product = await Product.find({ ages: ages });
        try {
            res.send(product);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    if (pieces) {
        const product = await Product.find({ pieces: pieces });
        try {
            res.send(product);
        } catch (error) {
            res.status(500).send(error);
        }
    }
});

const PORT = 8000; 

mongoose.connect(process.env.DB_CONNECTION, async (uri) => {
    console.log('successfully connected to MongoDB');
    // products.forEach(async (product) => {
    //     const productData = await Product.create({
    //         product_name: product.product_name,
    //         item_id: product.item_id,
    //         reviews: product.reviews,
    //         rating: product.rating,
    //         availability: product.availability,
    //         price: product.price,
    //         images: product.images,
    //         ages: product.ages,
    //         pieces: product.pieces,
    //     });

    //     await productData.save();
    // });
});

app.listen(PORT, () => console.log(`server is running on PORT ${PORT}...`));