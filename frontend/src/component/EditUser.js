import React, { createContext, useContext, useEffect, useState } from 'react'
import { Link,  useNavigate,  useParams } from 'react-router-dom';
 // import imgtObase64 from '../imgConvert/imgt0base64';
import { toast } from 'react-toastify';
  
function EditUser() {
     let navigate=useNavigate();
 let params=useParams();
   let [data,setData]=useState({ email:"",name:""})

let value,name;
let handelChange=(e)=>{
    name=e.target.name;
    value=e.target.value;
    setData({...data,[name]:value});
 }
// data fetch privious data

let handelUser= async(e)=>{
  try{ 
    let res= await fetch('http://localhost:3000/user-data',{
     method:"GET",
             credentials:"include",

    })
    let result=await res.json();
console.log(result)
  if(result.success){
      setData(result.data)
    toast.success('data get sucesful in fronteneed');
 }

   }
catch(e){
   toast.error('reg not sucesful in fronteneed');

console.log('reg not success in frontened',e)
}
}

useEffect(()=>{
  handelUser();
},[])
 
// sin in post 
 let handelEditUser= async(e)=>{
   try{ 
   e.preventDefault();
    let res= await fetch(`http://localhost:3000/user-update/${params.id}`,{
      method:"PUT",
      headers:{
         'Content-Type':'application/json',
      },   
    //   use in login to store jwt and logout not neccery
     credentials:"include",

      body:JSON.stringify(data)
    })
let result= await res.json()
  if(result.success){
    handelUser();
    toast.success('update sucesful in fronteneed');
    navigate('/user');
 }

 else{
  toast.error(' update not success ');
navigate(`/edit-uesr/${params.id}`)
}
   }
 catch(e){
    navigate(`/edit-uesr/${params.id}`)
    toast.error(' update not success ');

  }
}

 
 return (
     <center className='mt-[13vw] md:mt-[10vw] mx-[10vw] md:mx-[25vw] lg:mx-[30vw] px-3 py-4 shadow-2xl rounded-lg'>
        <form method='POST' action='/login' onSubmit={handelEditUser} className='flex   flex-col px-3 py-4'>
        <h1 className='text-center text-[4.5vw] md:text-[3.2vw] font-bold'>Update user detail</h1>

   <label htmlFor="" className='text-start  '>name:</label>

<input type='text' name='name' alt="" className='py-[.5vw] mb-3 border-[.5px] border-black rounded-lg' value={data.name} onChange={handelChange}/>
<label htmlFor="" className='text-start '>email:</label>

<input type='email' className='py-[.5vw] mb-3 border-[.5px] border-black rounded-lg' name='email' alt=""  value={data.email} onChange={handelChange} readOnly/>
 

  <button type='submit' className='rounded-full text-center self-center px-3 my-3 py-1 bg-red-500 text-white'>Updata</button>
       

        </form>
     </center>
   )
}
 
export default EditUser
