const router=require("express").Router();
const User =require("../models/user");
const {authenticateToken}=require("./userAuth");

//put book to cart
router.put("/add-to-cart",authenticateToken,async(req,res)=>{
    try{
        const {bookid,id}=req.headers;
        const userData=await User.findById(id);
        const isBookincart =userData.cart.includes(bookid);
        if(isBookincart){
            return res.status(200).json({message :"Book  is already in  cart"});
        }
        await User.findByIdAndUpdate(id,{$push:{cart:bookid}});
        return res.status(200).json({message:"Book added to cart"});
 
    }
    catch(error){
        return res.status(500).json({message:"Internal Server Error"});
    }
});

//delete from cart
router.put("/delete-from-cart/:bookid",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        const {bookid}=req.params;
       
        await User.findByIdAndUpdate(id,{$pull:{cart:bookid},});
        
        
        return res.status(200).json({message:"Book removed from cart"});
 
    }
    catch(error){
        return res.status(500).json({message:"Internal Server Error"});
    }
});

//show books in cart
router.get("/get-cart-books",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        const userData=await User.findById(id).populate("cart");
        const cartbooks=userData.cart.reverse();
        return res.json({
            status:"Success",
            data:cartbooks,
        });
 
    }
    catch(error){
        return res.status(500).json({message:"Internal Server Error"});
    }
});
module.exports=router;