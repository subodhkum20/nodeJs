var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

let user = new Schema({
    firstName:{
        type:"string",
        default:""
    },
    facebookId:String,
    lastName:{
        type:"string",
        default:""
    },
    admin: {
        type: "boolean",
        default: false
    }
})
user.plugin(passportLocalMongoose)
let users = mongoose.model('users', user);
module.exports = users;