let mongose=require('mongoose');
let validator=require('validator');

let userSchema=new mongose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new  Error('emain is not valid');
            }
        }
    },password:{
        type:String,
        required:true
    },cpassword:{
        type:String,
        required:true
    } 
})


let usermodel=new mongose.model("usermodel",userSchema);
module.exports=usermodel;