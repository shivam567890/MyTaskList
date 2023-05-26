const  express =require('express');
const router= express.Router();
const { body, validationResult } = require('express-validator');
const User =require('../models/User');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const JWT_SECRET='shivamisachampion';
var fetchuser=require('../middleware/fetchuser');
//Route1: creating  a User: POST :/api/auth/createuser     no login  required
router.post('/createuser',[
    body('name','enter a valid name ').isLength({ min: 3 }),
    body('email','enter a valid email').isEmail(),
    body('password','password must be atleast 5 characters').isLength({ min: 5 })
],async(req,res)=>{
 var success= false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try{
      const salt= await bcrypt.genSalt(10);
      const secPass=await bcrypt.hash(req.body.password,salt);
    let user= await User.findOne({email:req.body.email})
    if(user) {return res.status(400).json({success,error: 'Please enter a unique value for email'})} 
       user=await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
            otp: req.body.otp
          })
          const data={
            user:{
             id:user.id,
            }
          }
         const authtoken= jwt.sign(data,JWT_SECRET);
         success=true
           res.json({success, authtoken});
        }
        catch(error){
            console.log(error.message)
            res.status(500).send("Internal server error");
        }
})
//Route2: Authenticate a User: POST :/api/auth/login     no login  required

router.post('/login',[
  body('email','enter a valid email').isEmail(),
  body('password','Password cannot be blank').exists(),
],async(req,res)=>{
 
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}
const {email,password}=req.body;
try{
  const user=await User.findOne({email});
  if(!user){
    return res.status(400).json({success:false,error:"Please try to login with correct credentials "});
  }
const passwordCompare=await bcrypt.compare(password,user.password);
  if(!passwordCompare){  
    return res.status(400).json({success:false,error:"Please try to login with correct credentials "});
  }
  const data={
    user:{
     id:user.id,
    }
  }
 const authtoken= jwt.sign(data,JWT_SECRET);
   res.json({success:true, authtoken:authtoken});
}
catch(error){
  console.log(error.message);
  res.status(500).send("Internal server error");
}
})
// Routes 3: Get loggedin User Details using: POST "/api/auth/getuser".  Login required
router.post('/getuser',fetchuser,async(req,res)=>{
 try{
 var userId=req.user.id;
  const user=await User.findById(userId).select("-password");
  console.log(user);
  res.send(user);
 }
 catch(error){
  console.error(error.message);
  res.status(500).send("Internal Server Error");
 }
})
module.exports = router