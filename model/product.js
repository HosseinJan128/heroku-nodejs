var mongoose = require('mongoose');

var ProductSchema = mongoose.Schema({
    name : { type: String , require:true  },
    price : { type: String , require:true },
    created_at : Date,
    updated_at : Date
});

ProductSchema.pre('save',function(next){
    var currentDate = new Date();

    this.updated_at = currentDate;

    if(!this.created_at)
        this.created_at = currentDate;

    next();
});


var Product = mongoose.model('Product' , ProductSchema);

module.exports = Product;
