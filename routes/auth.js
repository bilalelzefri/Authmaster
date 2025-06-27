const express = require("express");
const bcrypt = require("bcryptjs")
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
    const notexistingUser = await user.findOne({email});
    if(!notexistingUser){
        return res.status(400).json({message:"Invalid email or password"});
    }
    const isMatched = bcrypt.compare(password, user.password);
    if(!isMatched){
        return res.status(400).json({message:"Invalid email or password"});
    }
     res.status(200).json({ message: "Login successful" });
}catch(error){
console.log(error);
res.status(500).json({message:"server problem"});
}
})






module.exports = router;