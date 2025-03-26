const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    first_name :{
        type:String
    },
    last_name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    address:{
        type:String
    }
});

// Schema ko kis collection mai dalenge uske liye model ka use hota hai
const contact = mongoose.model("Contact", contactSchema)

module.exports = contact


// db.contacts.insertOne({
//     first_name:"Pawan",
//     last_name:"Sahu",
//     email:"pawan@gmail.com",
//     phone:"8978796990",
//     address:"Vijay Nagar indore"
// });