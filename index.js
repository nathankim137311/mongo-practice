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

// node 2.12.2 or later 
// const URI = 'mongodb://root:SfYWTUk7yAk6Vrz@lego-starwars-api-shard-00-00.f3ig8.mongodb.net:27017,lego-starwars-api-shard-00-01.f3ig8.mongodb.net:27017,lego-starwars-api-shard-00-02.f3ig8.mongodb.net:27017/lego-starwars?ssl=true&replicaSet=atlas-euecfs-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.connect(process.env.DB_CONNECTION, async () => {
    products.forEach(async (product) => {
        const productData = await Product.create({
            product_name: product.product_name,
            item_id: product.item_id,
            price: product.price,
        });

        await productData.save();
    });
});

app.listen(PORT, () => console.log(`server is running on PORT ${PORT}...`));