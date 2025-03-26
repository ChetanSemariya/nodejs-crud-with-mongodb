const express = require("express");
const app = express();
const mongoose = require("mongoose"); // import mongoose in express js
const Contact = require('./models/contacts.models');

// database connection
mongoose.connect('mongodb://127.0.0.1:27017/contact-crud').then(() => {
    console.log('Database connected');
});

// use middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'));

// Routes
app.get('/', async(req, res) => {
    const contacts = await Contact.find();
    // res.json(contacts);
    res.render('home', {contacts:contacts});
});

app.get('/show-contact/:id', async(req, res) => {
    // const contact = await Contact.findOne({ _id : req.params.id })
    const contact = await Contact.findById(req.params.id) // by mongoose method
    res.render('show-contact',{contact:contact});
})

app.get('/add-contact', (req, res) => {
   res.render('add-contact');
})

app.post('/add-contact', async(req, res) => {
    // const contact = await Contact.insertOne({
    //     first_name : req.body.first_name,
    //     last_name : req.body.last_name,
    //     email : req.body.email,
    //     phone : req.body.phone,
    //     address : req.body.address,
    // });

    // with mongoose method
    await Contact.create(req.body) // agar humare collection ki fields ke name and form-fields k name same hai tabhi iss tarah se likh skte hai 
    res.redirect('/');
})

app.get('/update-contact/:id', async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    res.render('update-contact', {contact});
})

app.post('/update-contact/:id', async(req, res) => {
 // agar database ki field ke name and form-field k name same nahi hai tab iss tarah se karenge
   const {first_name, last_name, email, phone, address} = req.body // Note form field ka sequence same rakhna hai jis order mai form hai usi tarah se

   await Contact.findByIdAndUpdate(req.params.id, {first_name, last_name, email, phone, address}) 

   // ------- mongoose method for update agar database and form fields same hai to -------- //
   //  await Contact.findByIdAndUpdate(req.params.id, req.body) 
   res.redirect('/');
})

app.get('/delete-contact/:id', async(req, res) => {
    await Contact.findByIdAndDelete(req.params.id) // with mongoose method
    res.redirect('/');
});

app.listen(3000, () => {
    console.log("Server started successfully on port 3000");
});