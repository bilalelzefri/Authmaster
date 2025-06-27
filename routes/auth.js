const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const protect = require("../middleware/authMiddleware");
const router = express.Router();
const user = require("../modules/user");
router.post("/signup", async (req,res) => {
const {name,email,password} = req.body;
try{
    const existingUser = await user.findOne({email});
    if(existingUser){
        return res.status(400).json({message:"the user exist already"})
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    const newUser = new user({
        name,
        email,
        password:hashedPassword,
    });
    await newUser.save();
    res.status(201).json({message:"User created successfully"})

}catch(error){
console.log(error);
res.status(500).json({message:"server error"})
}


});
router.post("/login", async (req,res)=>{
const {email, password} = req.body;
try{
    const foundUser = await user.findOne({email});
    if(!foundUser){
        return res.status(400).json({message:"Invalid email or password"});
    }
    const isMatched = await bcrypt.compare(password, foundUser.password);
    if(!isMatched){
        return res.status(400).json({message:"Invalid email or password"});
    }
    const payload = {
      userId: foundUser._id,
      email: foundUser.email
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

     res.status(200).json({ message: "Login successful",token:token });
}catch(error){
console.log(error);
res.status(500).json({message:"server problem"});
}
});
router.get("/dashboard", protect ,(req, res)=>{
res.json({
    message: `Welcome to your dashboard, ${req.user.email}`,
    user: req.user
  });
})






module.exports = router;