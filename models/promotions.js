const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const promotionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        required: false
    },
    cost: {
        type: Currency,
        required: true,
        min: 0
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Promotions = mongoose.model('Promotions', promotionSchema);

module.exports = Promotions; //booo i hate thiiiss