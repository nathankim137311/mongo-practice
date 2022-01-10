const express = require('express'); 
const app = express();
const mongoose = require('mongoose'); 
const Product = require('./models/Product');
const bodyParser = require('body-parser');  
require('dotenv').config(); 

// Middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));

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

// Routes
app.get('/', (req, res) => {
    res.send('Working with MongoDB');
});

app.post('/insertData', async (req, res) => {
});

const PORT = 8000; 

mongoose.connect(`${process.env.DB_CONNECTION}`, async () => {
    const product = await Product.create({
        product_name: 'Darth Vader\'s Shuttle',
        item_id: '13241234', 
        price: '49.99',
    });
    
    await product.save();
});

app.listen(PORT, () => console.log(`server is running on PORT ${PORT}...`));