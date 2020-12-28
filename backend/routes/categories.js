const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const categories = await Category.find().sort('name');

    res.send(categories);
});

router.post('/', async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
    });
    category = await category.save();

    if (!category) return res.status(404).send('The category cannot be added');

    res.send(category);
});

router.put('/:id', async (req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color,
        },
        { new: true }
    );

    if (!category)
        return res
            .status(404)
            .send('The category with the given ID was not found.');

    res.send(category);
});

router.delete('/:id', async (req, res) => {
    const category = await Category.findByIdAndRemove(req.params.id);

    if (!category)
        return res
            .status(404)
            .send('The category with the given ID was not found.');

    res.send(category);
});

router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category)
        return res
            .status(404)
            .send('The category with the given ID was not found.');

    res.send(category);
});

module.exports = router;
