import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function User() {
    let navigate=useNavigate();
    let [data,setData]=useState(null);
    let [id,setId]=useState(null);

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
setId(result.data._id);
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

 
  return (
    <div className='flex items-center justify-center md:justify-between'>
    {/* frist col for detail */}

       <div className='flex flex-col items-start p-4 shadow-lg rounded-lg m-4 bg-[#2d2f31]'> 
    <a className='text-[1rem] font-semibold text-blue-400'>Name:<span className='text-[.8rem]'>{data?.name}</span></a>
    <a className='text-[1rem] font-semibold text-blue-400 mt-2'>Email:<span className='text-[.8rem]'>{data?.email}</span></a>
<Link to={`/edit-uesr/${id}`}> <div className='flex items-end'><button className='px-[6px]  py-[2px] bg-blue-500 text-white text-[1.6vw] md:text-[1.4vw] rounded-lg' > Edit</button>
    </div> 
    </Link>
     </div>

        {/* 2nd col for detail */}
 
    </div>
  )
}

export default User
