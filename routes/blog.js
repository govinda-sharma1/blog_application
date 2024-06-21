const express = require('express');
const { addBlog, getBlog, doComment } = require('../controllers/blog');
const multer = require('multer');
const router = express.Router();
const path = require('path');

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "./public/uploads/");
    },
    filename:(req, file, cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({storage:storage});


router.get("/addBlog",  (req, res)=>{
    res.render("addBlog", {user:req.user});
});

router.post("/addBlog", upload.single("coverImage"), addBlog);


router.get("/:id", getBlog)

router.post("/comment/:blogId", doComment);



module.exports = router;