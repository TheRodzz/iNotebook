var jwt=require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req,res,next) =>{
    // get the user from jwt token and add the user id to the req object
    const token = req.header('auth-token');
    if(!token){
        req.status(401).send({error: 'Authenticate using valid token'});
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    } catch (error) {
        req.status(401).send({error: 'Authenticate using valid token'});
    }
}
module.exports = fetchuser;