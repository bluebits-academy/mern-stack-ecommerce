const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    cartItems: [
        {
            quantity: Number,
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
        },
    ]
});

exports.Cart = mongoose.model('Cart', cartSchema);
exports.cartSchema = cartSchema;
