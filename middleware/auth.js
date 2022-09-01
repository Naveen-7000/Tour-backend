const jwt = require('jsonwebtoken');

// model is optional

const auth = (req,res,next)=>{
    const token = req.header('Authorization').replace('Bearer ',"") 
    || req.cookie.token 
    || req.body.token;

    if(!token){
        return res.status(403).send("token is missing")
    }

    try {
     const decode = jwt.verify(token,process.env.SECRET_KEY)
     console.log(decode);
    } catch (error) {
        return res.status(401).send("Invalid token")
    }

    return next();
}

module.exports = auth;