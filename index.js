const express = require("express");
require('dotenv').config();
const path = require('path');
require("./db/connection");
const {validateToken} = require('./middleware/auth');
const userRouter = require("./routes/user");
const cookieParser = require('cookie-parser');
const blogRoute = require("./routes/blog");
const Blog = require("./models/blog");


const PORT = process.env.PORT || 6000;

const app = express();
app.use(express.static(path.resolve(`${__dirname}`)));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(validateToken("token"));

// Routes:-
app.use("", userRouter);
app.use("/blog", blogRoute);


app.set("view engine", "ejs");
app.set('views', path.resolve('./views'));

app.get('/', async(req, res)=>{
    const allBlogs = await Blog.find({});
    const user = req.user;
    res.render("home", {user:user, blogs:allBlogs});
})

app.listen(PORT, (req, res)=>{
    console.log(`server is running on Port : ${PORT}`);
    console.log(`http://localhost:${PORT}`);
})