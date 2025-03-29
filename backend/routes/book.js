const router=require("express").Router();
const User=require("../models/user");
const jwt=require("jsonwebtoken");
const {authenticateToken} =require("./userAuth");
const Book =require("../models/books");
//add book --admin
router.post("/add-book",authenticateToken,async(req,res)=>{

    try{
        const {id} =req.headers;
        const user=await User.findById(id);
        if(user.role !=="admin"){
            return res.status(400).json({message:"You are not having access to perform admin work"});
        }

        const book=new Book({
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language,
        });
        await book.save();
        res.status(200).json({message:"Book added successfully"});

    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
});

//update-book --admin
router.put("/update-book",authenticateToken,async(req,res)=>{

    try{
        const {bookid} =req.headers;
        const user=await Book.findByIdAndUpdate(bookid,{
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language,
        },{new:true});
       
        
        
        res.status(200).json({message:"Book updated successfully"});

    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
});

//delete book --admin
router.delete("/delete-book",authenticateToken,async(req,res)=>{
    try{
        const {bookid}=req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({
            message:"Book deleted successfully",
        });
    }catch(error){
        return res.status(500).json({message:"An error occured"});

    }
});

//get all books api
router.get("/get-all-books",async(req,res)=>{
    try{
        const books=await Book.find().sort({createdAt :-1});
        return res.json({status:"Success",data:books,});

    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"An error occured"});
    }

});

//get recently added books limit 4
router.get("/get-recent-books",async(req,res)=>{
    try{
        const books=await Book.find().sort({createdAt :-1}).limit(4);
        return res.json({status:"Success",data:books,});

    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"An error occured"});
    }

});

//get book by id :details of a particular book
router.get("/get-book/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const book=await Book.findById(id);
        return res.json({status:"Success",data:book,});

    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"An error occured"});
    }

});

module.exports=router;