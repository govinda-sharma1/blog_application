const Blog = require("../models/blog");
const Comment = require("../models/comment");


const addBlog = async(req, res) => {
    const {title, body} = req.body;

    const blog = await Blog.create({
        title,
        body,
        createdBy:req.user._id,
        coverImageURL:`public/uploads/${req.file.filename}`
    });

    return res.render("blog", {blog:blog, user:req.user});
}


const getBlog = async(req, res) =>{
    const id = req.params.id;
    const blog = await Blog.findById(id).populate("createdBy");
    const comments = await Comment.find({blogId:id}).populate("createdBy");
    // console.log("blog ",blog);
    res.render("blog", {user:req.user, blog:blog, comments:comments});
}


const doComment = async(req, res) => {
    const blogId = req.params.blogId;
    await Comment.create({
        content:req.body.content,
        blogId:blogId,
        createdBy:req.user._id,
    })

    return res.redirect(`/blog/${blogId}`);
}



module.exports = {addBlog, getBlog, doComment};