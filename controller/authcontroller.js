const User=require('../models/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const register=(req,res,next)=>{
    //console.log(req.body.name);
    //console.log(req.body.password);
    bcrypt.hash(req.body.password,10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            });
        }
        
        let user=new User({
            name:req.body.name,
            username:req.body.username,
            email:req.body.email,
            phone:req.body.phone,
            org_password:req.body.password,
            password:hashedPass,
        });
    
        user.save()
        .then(user=>{
            res.json({
                message:"1"
            });
        })
        .catch(error=>{
            res.json({
                message:"0"
            });
        });
    });
};

const login=(req,res,next)=>{
    var username=req.body.username;
    var password=req.body.password;
    
    User.findOne({$or:[{username:username},{email:username},{phone:username}]})
    .then(user=>{
        if(user){
            bcrypt.compare(password,user.password,function(err,result){
                if(err){
                    res.json({
                        error:err
                    });
                }
                if(result){
                    let token=jwt.sign({name:user.name},'verySecretValue',{expiresIn:'1h'});
                    res.json({
                        message:'1',
                        token
                    });
                }
                else{
                    res.json({
                        message:'0'
                    })
                }
            })
        }
        else{
            res.json({
                message:"User Not Found"
            })
        }
    })
};

module.exports={register,login};