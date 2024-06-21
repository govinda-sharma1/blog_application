const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Database Connected SuccessFully.");
})
.catch((err) =>{
    console.log(err);
});
