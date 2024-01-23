
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Transaction = require('./models/Transaction.js');
const app = express();
const { default: mongoose } = require("mongoose");

app.use(cors());
app.use(express.json());
app.get('/api/test',(req,res)=>{
    res.json('test ok2');
});

//POST requets
// name, description, datetime, price 
app.post('/api/transaction',async(req,res)=>{
    await mongoose.connect(process.env.MONGO_URL);
    const {name,description,datetime,price}=req.body;
    const transaction = await Transaction.create({name,description,datetime,price});
    res.json(transaction);

});

app.get('/api/transactions' , async(req,res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const transactions = await Transaction.find();
    res.json(transactions);
});

app.listen(4000)

