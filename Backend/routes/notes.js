const  express =require('express');
var fetchuser=require('../middleware/fetchuser');
const Note =require('../models/Note');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get ALl the NOtes using :  GET "/api/auth/getuser".  lOGIN REQUIRED
const router= express.Router();
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try{
        const notes=await Note.find({user:req.user.id});
        res.json(notes)
    }
    catch(error){
        console.log(error.message)
        res.status(500).send("Internal server error");
    }
  
})
// ROUTE 2: Add a new NOte using :  POST "/api/auth/addnote".  lOGIN REQUIRED
router.post('/addnote',fetchuser,[
    body('title','enter a valid title ').isLength({ min: 3 }),
    body('description','description must be atleast 5 characters').isLength({ min: 5 })
],async(req,res)=>{
    try{
    const {title,description,tag}=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
const  note=new Note({
    title,description,tag,user:req.user.id
})

const savedNote=await  note.save();
res.json(savedNote);
    }
    catch(error){
        console.log(error.message)
        res.status(500).send("Internal server error");
    }

})

// ROUTE 3:Update the NOte using :  GET "/api/auth/getuser".  lOGIN REQUIRED

router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    try{
        const {title,description,tag}=req.body;
        //Create a newNote object

        const newNote={};
        if(title){newNote.title=title;}
        if(description){newNote.description=description;}
        if(tag){newNote.tag=tag;}

         // Find the note to be updated and update it

        let note=await Note.findById(req.params.id);
         if(!note){return res.status(404).send("Not Found")};

         if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not ALlowed");
         }
         note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
         res.json({note});
    }
    catch(error){
        console.log(error.message)
        res.status(500).send("Internal server error");
    }
  
})



// ROUTE 4:Delete the Note using :  DELETE  "/api/notes/deletenotes".  lOGIN REQUIRED

router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    try{

         // Find the note to be delete and delete it

        let note=await Note.findById(req.params.id);
         if(!note){return res.status(404).send("Not Found")};

         if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not ALlowed");
         }
         note=await Note.findByIdAndDelete(req.params.id);
         res.json({"Success": "Note has been deleted Successfully",note:note});
    }
    catch(error){
        console.log(error.message)
        res.status(500).send("Internal server error");
    }
})


module.exports = router