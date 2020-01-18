const mongoose = require("mongoose")
// const db = "mongodb+srv://admin:Qw#!145682@!#@cluster0-cahoy.mongodb.net/test?retryWrites=true&w=majority"
// const db = process.env.MONGO_URI || "mongodb+srv://admin:Qw#!145682@!#@cluster0-cahoy.mongodb.net/test?retryWrites=true&w=majority"
const uri = "mongodb+srv://admin:ACfqoN544cuin4eL@cluster0-cahoy.mongodb.net/test?retryWrites=true&w=majority";
try {
    mongoose.connect(
        uri,
        {
            useNewUrlParser: true
        }
    );
} catch(err) {
    console.log(err)
}
