const jwt = require("jsonwebtoken");
const protect = (req, res, next)=>{
try{
const authHeader = req.headers.authorization;
if(!authHeader || !authHeader.startsWith("Bearer ")){
return res.status(401).json({ message: "No token, authorization denied" });
}
const token = authHeader.split(" ")[1]; 
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = decoded;
next();
}catch(error){
 console.error("Token verification failed:", error.message);
    res.status(401).json({ message: "Token is not valid" })
}
};


module.exports = protect; 