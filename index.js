const express = require('express'); 
const app = express();
const mongoose = require('mongoose'); 
const Product = require('./models/Product');
const bodyParser = require('body-parser');  
require('dotenv').config(); 

// Products
const products = [
    {
        lego_set: 'Darth Vader\'s Shuttle',
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
        lego_set: 'Palpatine\'s Toilet',
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
        lego_set: 'Luke Skywalker\'s Left Shoe',
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
// Router instance 
const router = express.Router();      

// Middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', router); 

// Routes
// Get home 
router.get('/', (req, res) => {
    res.send('Welcome to our Lego Starwars Api!').sendStatus(200);
});

// Get products
router.get('/products', async (req, res) => {
    // if req.query object is empty 
    if (Object.keys(req.query).length === 0) {
        const products = await Product.find({}); // find all products
        try {
            if (products.length === 0) return res.send('products not found').status(404); 
            res.send(products).status(200);
        } catch (error) {
            res.status(500).send(error);
        }   
    } 
    if (req.query.page && req.query.limit) { // find all products with pagination
        const field = {}; 
        paginatedResults(field, req, res);
    } 
    if (req.query.availability) {
        const availability = req.query.availability;  
        // case insensitive search 
        const products = await Product.find({ availability: availability}).collation(
          { locale: 'en', strength: 2 }
        );

        try {
            if (products.length === 0) return res.status(404).send(`The products with availability "${availability}" was not found`); 
            res.send(products).status(200); 
        } catch(err) {
            res.status(500).send(err);
        }
    }
    if (req.query.price) {
        const price = req.query.price;  
        const products = await Product.find({ price: price});
        try {
            if (products.length === 0) return res.status(404).send(`The products with price "${price}" was not found`); 
            res.send(products).status(200); 
        } catch(err) {
            res.status(500).send(err);
        }
    }
});

// Get one product 
router.get('/products/:item_id', async (req, res) => {
    const item_id = req.params.item_id;
    const products = await Product.find({ item_id: item_id});

    try { // sendStatus method is both status() and send() in one request
        if (products.length === 0) return res.status(404).send('The product with the given ID was not found'); 
        res.send(products).status(200);
    } catch (error) {
        res.status(500).send(error);
    }  
}); 

// For invalid routes
app.get('*', (req, res) => {
    res.send('404! Page not found').status(404);
});

async function paginatedResults(field, req, res) {
    const products = await Product.find(field);

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit); 

    const startIndex = (page - 1) * limit; 
    const endIndex = page * limit; 

    const results = {};

    if (endIndex < products.length) {
        results.next = {
            page: page + 1,
            limit: limit,
        } 
    }

    if (startIndex > 0) {
        results.prev = {
            page: page - 1,
            limit: limit,
        }
    }

    results.products = products.slice(startIndex, endIndex); 
    res.send(results); 
}

// Connect to MongoDB 
mongoose.connect(process.env.DB_CONNECTION, async () => console.log('successfully connected to MongoDB'));

// Insert initial data 
const db = mongoose.connection; 
db.once('open', async () => {
    if (await Product.countDocuments().exec() > 0) return 
    products.forEach(async (product) => {
        const productData = await Product.create({
            lego_set: product.lego_set,
            item_id: product.item_id,
            reviews: product.reviews,
            rating: product.rating,
            availability: product.availability, 
            price: product.price,
            images: product.images,
            ages: product.ages,
            pieces: product.pieces,
        });

        await productData.save();
    });
    console.log('Products inserted!');
});

const PORT = 8000; 

app.listen(PORT, () => console.log(`server is running on PORT ${PORT}...`));