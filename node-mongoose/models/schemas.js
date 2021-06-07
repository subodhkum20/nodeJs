const mongoose = require('mongoose');
const schema = mongoose.Schema;

const commentSchema = new schema({
    rating:{
        type: 'number',
        required: true,
        max:5,
        min:1
    },
    comments: {
        type: 'string',
        // required: true
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