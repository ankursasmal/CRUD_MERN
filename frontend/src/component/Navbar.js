import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
 import { toast } from 'react-toastify';


function Navbar() {
  let navigate=useNavigate();
       let [existUser,setExistUser]=useState(null);

      //  fetch data for hendel navber
 
      let handelUser= async(e)=>{
          try{ 
            let res= await fetch('http://localhost:3000/user-data',{
             method:"GET",
               
           //   use in login to store jwt and logout not neccery
            credentials:"include",
       
            })
            let result=await res.json();
          if(result.success){
            setExistUser(result.data)
 
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

// // for logout
const handleLogout = async (e) => {
  try {
 
     let res=await fetch('http://localhost:3000/logout');
     let result=await res.json();
     if(result.success){
       toast.success('Logout successful', { position: 'top-center' });
     navigate('/');
  setExistUser(null);
     }
   
  } catch (e) {
    toast.error('Logout not successful');
  }
};




  return (
    
    <div className='flex items-center justify-between w-[100vw] h-[68px] shadow-md bg-slate-200 px-4'>
     
       <NavLink style={({ isActive, isPending }) => {
    return {
      color: isActive ? "blue" : "inherit",
    };
  }}
  className={({ isActive, isPending }) => {
    return isActive ? "active" : isPending ? "pending" : "";
  }} to='/'> <span className='font-bold'>Home</span></NavLink>



      <div className='flex items-center gap-2'>
{/* if not signup then */}

     {!existUser?.email? 
     <div className='flex items-center gap-2'> 
     <NavLink
  style={({ isActive, isPending }) => {
    return {
      color: isActive ? "blue" : "inherit",
    };
  }}
  className={({ isActive, isPending }) => {
    return isActive ? "active" : isPending ? "pending" : "";
  }} to='/login' >Login
</NavLink>

<NavLink
  style={({ isActive, isPending }) => {
    return {
      color: isActive ? "blue" : "inherit",
    };
  }}
  className={({ isActive, isPending }) => {
    return isActive ? "active" : isPending ? "pending" : "";
  }} to='/signup' >SignUp</NavLink>
  </div>
: null}
       
  
       <NavLink
  style={({ isActive, isPending }) => {
    return {
      color: isActive ? "blue" : "inherit",
    };
  }}
  className={({ isActive, isPending }) => {
    return isActive ? "active" : isPending ? "pending" : "";
  }} to='/user' >User</NavLink>
    
   
    
    
       {/* onclick logout */}
    {existUser?.email?  <button type='submit' className='outline-none border-none' onClick={handleLogout} >Logout</button>:null}
 </div>
 </div>
  )
}

export default Navbar