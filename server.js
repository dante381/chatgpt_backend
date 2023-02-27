const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const cors=require('cors');

const Authroute=require('./routes/auth');

mongoose.connect('mongodb+srv://root:root@ps-auth.sylou7t.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true});
const db=mongoose.connection;
db.on('error',(err)=>{
    console.log(err);
});

db.once('open',()=>{
    console.log("Connection Successful");
});

const app=express();

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/',Authroute);

app.listen(4000,()=>{
    console.log("Listening on Port 4000");
});
