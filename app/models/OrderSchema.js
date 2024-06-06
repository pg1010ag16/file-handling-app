const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    status: {
        type: String,
        enum: [ 'approved', 'rejected'],
        default: 'approved'
    },
});

module.exports = mongoose.model('Order', orderSchema);
