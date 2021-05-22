const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partnerSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    featured: false, // i think this is wrong
    image:, //i dunno how to do this
}, {
    timestamps: true
});

const Partners = mongoose.model('Partners', partnerSchema);

module.exports = Partners;