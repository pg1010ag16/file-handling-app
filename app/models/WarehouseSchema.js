const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const warehouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});

warehouseSchema.index({ location: "2dsphere" });

module.exports = mongoose.model('Warehouse', warehouseSchema);  