const mongoose = require('mongoose');
require('mongoose-Currency').loadType(mongoose);
const Currency = mongoose.Types.Currency
const schema = mongoose.Schema;

const commentSchema = new schema({
    rating:{
        type: 'number',
        required: true,
        max:5,
        min:1
    },
    comment: {
        type: 'string',
        required: true
    },
    author:{
        type:'string',
        required: true
    }
},
    { timestamp: true }
)

const dishSchema = new schema({
    name: {
        type: 'string',
        required: true,
        unique: true
    },
    image: {
        type: "String",
        required: true
    },
    category: {
        type: "String",
        required: true
    },
    label: {
        type: "String",
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default:false      
    },
    description: {
        type: 'string',
        required: true
    },
    comments: [commentSchema]
},
    {
        timestamp: true
    })
const dishes = mongoose.model('dish', dishSchema)
module.exports = dishes;