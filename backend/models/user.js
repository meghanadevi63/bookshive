const mongoose =require("mongoose");
const user=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
       
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"],
    },
    favourites:[{
        type:mongoose.Types.ObjectId,
        ref:"books",
    },
    ],
    cart:[
        {
            type:mongoose.Types.ObjectId,
            ref:"books",

        },
    ],
    orders:[{
        type:mongoose.Types.ObjectId,
        ref:"order",

    },
],


},{timestamps:true}
);

// Middleware to set avatar based on first letter of username
user.pre("save", function (next) {
    if (!this.avatar && this.username) {
        const firstLetter = this.username.charAt(0).toUpperCase();
        this.avatar = `https://ui-avatars.com/api/?name=${firstLetter}&background=random&color=fff&size=128`;
    }
    next();
});


module.exports=mongoose.model("user",user);