const mongoose = require('mongoose');
const User = require('./user');

const blogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
      },
    body:{
        type:String,
        required:true
      },
    coverImageURL:{
        type:String,
        required:false
      },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }  
}, {timestamps:true})

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;
