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
        price: 49.99,
    },
    {
        product_name: 'Palpatine\'s Toilet',
        item_id: 45674567,
        price: 24.99, 
    },
    {
        product_name: 'Luke Skywalker\'s Left Shoe',
        item_id: 67896789,
        price: 14.99, 
    }
];

// Middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
    res.send('Working with MongoDB');
});

const PORT = 8000; 

mongoose.connect(process.env.DB_CONNECTION, async (uri) => {
    console.log('successfully connected to MongoDB');
    // This Code Works 

    // products.forEach(async (product) => {
    //     const productData = await Product.create({
    //         product_name: product.product_name,
    //         item_id: product.item_id,
    //         price: product.price,
    //     });

    //     await productData.save();
    // });
});

app.listen(PORT, () => console.log(`server is running on PORT ${PORT}...`));