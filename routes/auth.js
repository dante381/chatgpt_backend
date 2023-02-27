const express=require('express');
const router=express.Router();

const authcontroller=require('../controller/authcontroller');

router.post('/register',authcontroller.register);
router.post('/login',authcontroller.login);
router.post('/search',authcontroller.search);
router.post('/dbdelete',authcontroller.dbdelete);
router.post('/update',authcontroller.update);

module.exports=router;
