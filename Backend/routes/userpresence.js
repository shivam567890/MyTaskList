const  express =require('express');
const router= express.Router();
const User =require('../models/User');
const { body, validationResult } = require('express-validator');
router.post('/fetchid',[
    body('email','enter a valid email').isEmail()  
],async(req,res)=>{
    const errors = validationResult(req);
    console.log(req.body.email);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try{
        let user= await User.findOne({email:req.body.email})
        if(user) {return res.status(400).json({success:true,error: 'Email Id alredy registered'})}
        else
        res.json({success:false});
    }
    catch(error){
        console.log(error.message)
        res.status(500).send("Internal server error");
    }
})

module.exports = router


