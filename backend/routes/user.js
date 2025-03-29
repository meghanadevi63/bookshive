const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

//Sign Up
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        //check username length is more than 3
        if (username.length < 4) {
            return res.status(400).json({ message: "Username length should be greater than 3" });
        }

        //check username already exists ?
        const existingUsername = await User.findOne({ username: username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        //check email already exists?
        const existingEmail = await User.findOne({ email: email });

        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }
        //check passwords length
        if (password.length <= 5) {
            return res.status(400).json({ message: "password length should be greater than 5" });

        }
        const hashpassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username: username,
            email: email,
            password: hashpassword,
            address: address,
        });
        await newUser.save();
        return res.status(200).json({ message: "Signup Successfully" });



    }
    catch (error) {
        res.status(500).json({ message: "Internal Server error", error: error.message });
    }
});

//Sign-in
router.post("/sign-in", async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            res.status(400).json({ message: "Invalid Credentials" });
        }

        await bcrypt.compare(password, existingUser.password, (err, data) => {
            if (data) {
                const authClaims = [

                    { name: existingUser.username },
                    { role: existingUser.role },
                ];
                const token = jwt.sign({ authClaims }, "bookstore123", {
                    expiresIn: "30d",
                });


                res.status(200).json({ id: existingUser._id, role: existingUser.role, token: token, });
            }
            else {
                res.status(400).json({ message: "Invalid Credentials" });
            }
        });



    }
    catch (error) {
        res.status(500).json({ message: "Internal Server error", error: error.message });
    }
});

//get-user-information
router.get("/get-user-information", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const data = await User.findById(id).select('-password'); //to exclude displaying of password details
        if (!data) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(data);

    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });

    }
});

//Update Address
router.put("/update-address",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        const {address}=req.body;
        await User.findByIdAndUpdate(id,{address:address});
        return res.status(200).json({message:"Address updated successfully"});

    }catch(error){
        res.status(500).json({message:"Internal Server error"});

    }
})
module.exports = router;