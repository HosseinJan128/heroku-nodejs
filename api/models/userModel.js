'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    fullName:{
        type: String,
        trim: true,
        required: true
    },
    email:{
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    hash_password:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now
    },
    updated_at:{
        type: Date,
        default: Date.now
    },
});

// UserSchema.pre('save',function(next){
//     var currentDate = new Date();

//     this.updated_at = currentDate;

//     if(!this.created_at)
//         this.created_at = currentDate;

//     next();
// });


var User = mongoose.model('User' , UserSchema);

module.exports = User;

module.exports.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8) , null);
}

module.exports.validPassword = function (password , hash) {
    return bcrypt.compareSync(password, hash);
}
