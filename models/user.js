const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userschema=new Schema({
    name:{
        type: String
    },
    username:{
        type:String
    },
    email:{
        type: String
    },
    phone:{
        type: String
    },
    org_password:{
        type:String
    },
    password:{
        type: String
    }
},{timestamps:true});

const User=mongoose.model('users',userschema);

module.exports=User;