 let express=require('express');
let route=express.Router();
require('../db/connection')
let usermodel=require('../model/user');
let nm=require('bcryptjs');
let jwt=require('jsonwebtoken');
 const auth = require('../middleware/auth');

route.get('/',(req,res)=>{
    res.send("ok")
})

// signup route
route.post('/signup',async(req,res)=>{
    try{
let payload=req.body;
  let exist=await usermodel.findOne({email:payload.email});
if(exist){
    throw new Error('User already exist')
}
let user=new usermodel(payload);
 user.password=await nm.hash(payload.password,10);
user.cpassword=await nm.hash(payload.cpassword,10);

 let data=await user.save();
 res.json({
    success:true,
    error:false,
    data:data,
    status:201
})


}
    catch(e){
        res.json({
            success:false,
            error:true,
             status:401,
             mess:e.message
        })
    }
 })

// login route
route.post('/login',async(req,res)=>{
    try{
let payload=req.body;
  let ExistUser=await usermodel.findOne({email:payload.email});
  if(!ExistUser){
    throw new Error('User not exist')
 }
let isMatch=await nm.compare(payload.password,ExistUser.password)
 if(isMatch){
     let tokon=jwt.sign({email:payload.email},'uuwijjijj82u388244hhh334u43hu33',{expiresIn:'3d'});
   
     res.cookie('jwt',tokon,{expiresIn:'3d',httpOnly:true,secure:true});
      res.json({
    success:true,
    error:false,
     status:201
})
}
else{
    throw new Error('User not exist')

}   

}
    catch(e){
        res.json({
            success:false,
            error:true,
             status:401,
             mess:e.message
        })
    }
 })

// get request
route.get('/user-data',auth,async(req,res)=>{
    try{
         let id=req.userId;
   let ExistUser=await usermodel.findOne({_id:id});
 if(!ExistUser){
    throw new Error('User not login')
 }
   res.json({
    success:true,
    error:false,
    data:ExistUser,
    status:201
})
 
}
    catch(e){
        res.json({
            success:false,
            error:true,
             status:401,
             mess:e.message
        })
    }
 })


//  update req
route.put('/user-update/:id',auth,async(req,res)=>{
    try{
        let userId=req.params.id;
        console.log(userId)
        let payload=req.body;

   let ExistUser=await usermodel.findOne({_id:userId});
 if(!ExistUser){
    throw new Error('User not login')
 }

 let data=await usermodel.findByIdAndUpdate({_id:userId},payload,{new:true})
   res.json({
    success:true,
    error:false,
    data:data,
    status:201
})
 
}
    catch(e){
        res.json({
            success:false,
            error:true,
             status:401,
             mess:e.message
        })
    }
 })



//  dalete req
// route.delete('/logout',async(req,res)=>{
//     try{
//         let userId=req.params.id;
 
//    let ExistUser=await usermodel.findOne({_id:userId});
//  if(!ExistUser){
//     throw new Error('User not user')
//  }

//  let data=await usermodel.findByIdAndDelete({_id:id},payload,{new:true})
//    res.json({
//     success:true,
//     error:false,
//      status:201
// })
 
// }
//     catch(e){
//         res.json({
//             success:false,
//             error:true,
//              status:401,
//              mess:e.message
//         })
//     }
//  })


 route.get('/logout',async(req,res)=>{
    try{
         res.clearCookie('jwt');
 
         res.status(200).json({
            success:true,
            data:[],
            error:false
        })
    }
    catch(e){
        console.log('not authorize');
        res.status(404).json({mess:'not authorize',
            e:e.message,
            success:false,
         })
    }
})


module.exports=route 