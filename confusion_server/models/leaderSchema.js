const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaderSchema = new Schema({
    name: {
        type: 'string',
        required: true,
        unique: true
    },
    image: {
        type: 'string',
        required: true
    },
    designation: {
        type: "String",
        default: ''
    },
    
    abbr:{
        type: "string",
        required: true
    },
    description: {
        type: "string",
        required: true
    },
    featured: {
        type: Boolean,
        default:false      
    }
},{
    timestamp: true
}
)
const leaders = mongoose.model('leader', leaderSchema)
module.exports = leaders;