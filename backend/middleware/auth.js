let cookieParser=require('cookie-parser');
let jwt=require('jsonwebtoken');
const usermodel = require('../model/user');

async function auth(req,res,next){
try{
 let tokon=req.cookies.jwt;

 let verifiedUser= jwt.verify(tokon,'uuwijjijj82u388244hhh334u43hu33');
// console.log(verifiedUser);
let user=await usermodel.findOne({email:verifiedUser.email});
 req.userId=user._id;
 next();
}
catch(e){
    res.status(404).json({
        mess:'not auth ',
        success:false,
        error:true,
        e:e.message || e
}
)}
}

module.exports=auth