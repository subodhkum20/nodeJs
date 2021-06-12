const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-Currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const promotionSchema = new Schema({
    name: {
        type: 'string',
        required: true,
        unique: true
    },
    image: {
        type: 'string',
        required: true
    },
    label: {
        type: "String",
        default: ''
    },
    price:{
        type: Currency,
        required: true,
        min: 0
    },
    description: {
        type: "string",
        required: true
    },featured: {
        type: Boolean,
        default:false      
    }
},{
timestamp: true
}
)
const promotions = mongoose.model('promotion', promotionSchema)
module.exports = promotions;