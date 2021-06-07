const mongoose = require('mongoose');
const schema = mongoose.Schema;

const commentSchema = new schema({
    comment: {
        type: 'string',
        required: true
    }
})

const dishSchema = new schema({
    name: {
        type: 'string',
        required: true,
        unique: true
    },
    description: {
        type: 'string',
        required: true
    }
},
    {
        timestamp: true
    })
const dishes = mongoose.model('dish', dishSchema)
module.exports = dishes;