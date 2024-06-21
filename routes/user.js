const express = require('express');
const {registerUser, loginUser, logoutUser} = require('../controllers/user');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "./public/image")
    },
    filename:(req, file, cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({storage:storage});

router.get("/signup", (req, res)=>{
    res.render("register");
});

router.post("/signup", upload.single("image"), registerUser);

router.get("/signin", (req, res)=>{
    res.render("login");
});

router.post("/signin", loginUser);

router.get('/logout', logoutUser);


module.exports = router;