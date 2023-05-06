const express = require('express');
const data = require('../data');
const Product = require('../models/product');

const router = express.Router();

//Fetch All Products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        //res.send(products);
        res.status(201).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json(error);
    }
});

//Fetch On producto by slug
router.get('/slug/:slug', async (req, res) => {
    //const product = data.products.find((p) => p.slug === req.params.slug);
    const slug = req.params.slug;
    try {
        const product = await Product.findOne({ slug });
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        res.status(404).send({ message: 'Product Not Founnd' });
    }
});

//Fetch On producto by id
router.get('/:id', async (req, res) => {
    //const product = data.products.find((p) => p._id === req.params.id);
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        res.status(404).send({ message: 'Product Not Founnd' });
    }
});

//Save Product
router.post('/save', async (req, res) => {
    const {
        name,
        slug,
        category,
        images,
        price,
        countInStock,
        brand,
        rating,
        numReviews,
        description,
    } = req.body;
    console.log(req.body);

    try {
        const product = await Product.create({
            name,
            slug,
            category,
            images,
            price,
            countInStock,
            brand,
            rating,
            numReviews,
            description,
        });
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
