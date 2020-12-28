const { Order } = require('../models/order');
const express = require('express');
const { Product } = require('../models/product');
const router = express.Router();

router.get('/', async (req, res) => {
    const orders = await Order.find().populate('user').sort('dateOrdered');
    res.send(orders);
});

router.post('/', async (req, res) => {
    const totalPrice =  await getTotalPrice(req.body.orderItems);
    
    let order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user,
    });
    order = await order.save();

    res.send(order);
});

router.put('/:id', async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status,
        },
        { new: true }
    );
    if (!order)
        return res
            .status(404)
            .send('The order with the given ID was not found.');

    res.send(order);
});

router.delete('/:id', async (req, res) => {
    const order = await Order.findByIdAndRemove(req.params.id);

    if (!order)
        return res
            .status(404)
            .send('The order with the given ID was not found.');

    res.send(order);
});

router.get('/:id', async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate({
            path: 'orderItems.product',
            populate: { path: 'category' },
        })
        .populate('user', '-passwordHash');

    if (!order)
        return res
            .status(404)
            .send('The order with the given ID was not found.');

    res.send(order);
});

router.get('/get/count', async (req, res) => {
    const ordersCount = await Order.countDocuments((count) => count);
    if (!ordersCount) {
        return res.status(404).send('The orders not found');
    }
    res.send({
        ordersCount: ordersCount,
    });
});

router.get('/get/totalsales', async (req, res) => {
    const totalsales = await Order.aggregate([
        { $group: { _id: null, totalsales: { $sum: '$totalPrice' } } },
    ]);
    if (!totalsales) {
        return res.status(404).send('The otders total sale not found');
    }
    res.send({ totalsales: totalsales.pop().totalsales });
});


async function getTotalPrice(orderItems) {
    
    const totalPricePromises = await orderItems.map(async (orderItem) => {
        const productId = orderItem.product.id? orderItem.product.id : orderItem.product;
        const product = await Product.findById(productId);
        const totalPrice = product.price * orderItem.quantity;
        return totalPrice
    });
    const totalPrices = await Promise.all(totalPricePromises);
    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

    return await totalPrice;
}

module.exports = router;
