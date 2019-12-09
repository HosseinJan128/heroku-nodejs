var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    title : { type: String , require:true  },
    slug : { type: String , require:true },
    description : { type: String , require:true },
    category_id : mongoose.Schema.Types.ObjectId,
    created_at : Date,
    updated_at : Date
});

PostSchema.pre('save',function(next){
    var currentDate = new Date();

    this.updated_at = currentDate;

    if(!this.created_at)
        this.created_at = currentDate;

    next();
});


var Post = mongoose.model('Post' , PostSchema);

module.exports = Post;

module.exports.slug = function(str) {
    var slug = '';
    var trimmed = str.trim();
    slug = trimmed.replace(/[^a-z0-9-]/gi, '-').
    replace(/-+/g, '-').
    replace(/^-|-$/g, '');
    return slug.toLowerCase();
}
