var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let user = new Schema({
    username: {
        type: "string",
        unique: true,
        required: true
    },
    password: {
        type: "string",
        required: true
    },
    admin: {
        type: "boolean",
        default: false
    }
})

let users = mongoose.model('users', user);
module.exports=users;