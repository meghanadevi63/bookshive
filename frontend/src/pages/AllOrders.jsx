import React, { useEffect, useState } from 'react'
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { FaUser } from "react-icons/fa";
import {Link} from "react-router-dom";
import SeeUserData from './SeeUserData';
import { IoOpenOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
const AllOrders = () => {
  const [AllOrders,SetAllOrders]=useState();
  const [Options,SetOptions] =useState(-1);
  const [Values,SetValues] =useState({ status :""});
  const [UserDiv,SetUserDiv]=useState("hidden");
  const [UserDivData,SetUserDivData]=useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(()=>{
    const fetch=async()=>{
      const response =await axios.get("http://localhost:5000/api/v1/get-all-orders",{headers});
      //console.log(response.data.data);
      SetAllOrders(response.data.data);
    };
    fetch();
  },[AllOrders]);

  const change=(e)=>{

    const {value} =e.target;
    SetValues({status:value});
  }

  const submitChanges=async(i) =>{
    const id =AllOrders[i]._id;
    const response=await axios.put(`http://localhost:5000/api/v1/update-status/${id}`,Values,{headers});
    alert(response.data.message);
  };

  AllOrders && AllOrders.splice(AllOrders.length-1,1);
  return (
        <>
        {!AllOrders && (<div className='h-[100%] flex items-center justify-center'>{" "}<Loader/></div>)}

        {AllOrders && AllOrders.length>0 && (
          <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
            <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>All Orders</h1>
            <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
              <div className='w-[3%]'>
                <h1 className='text-center'>Sr.

                </h1>
              </div>

              <div className='w-[40%] md:w-[22%]'>

                <h1 className=''>
                    Books                  
                </h1>
              </div>

              <div className='w-0 md:w-[45%]  hidden md:block'>
                <h1 className=''>Description
                  
                </h1>
              </div>

              <div className='w-[17%]  md:w-[9%]'>
                <h1 className=''>Price
                  
                </h1>
              </div>

              <div className='w-[30%] md:w-[16%]'>
                <h1 className=''>Status
                  
                </h1>
              </div>

              <div className='w-[10%] md:w-[5%]'>
                <h1 className=''>
                <FaUser />
                </h1>
              </div>


            </div>
            {AllOrders && AllOrders.map((items,i)=>(
              <div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300'>
                <div className='w-[3%]'>
                  <h1>{i+1}</h1>
                </div>

                <div className='w-[40%] md:w-[22%]'>
                  <Link 
                  to={`/view-book-details/${items.book._id}`}
                  className='hover:text-blue-300'
                  >{items.book.title}</Link>

                </div>

                <div className='w-0 md:w-[45%] hidden md:block'>
                  <h1 className=''>{items.book.desc.slice(0,50)}
                  ...</h1>
                </div>

                <div className='w-[17%] md:w-[9%]'>
                  <h1 className=''>{items.book.price}

                  </h1>
                </div>

                <div className='w-[36%] md:w-[16%]'>
                  <h1 className='font-semibold'>
                    <button className='hover:scale-105 transition-all duration-300' onClick={()=>SetOptions(i)}>
                      {items.status === "Order Placed" ?
                      (<div className='text-yellow-500'>
                        {items.status}
                      </div>

                      ):items.status === "Cancelled" ? (<div className='text-red-500'>
                        {items.status}

                      </div>

                      ):(
                        <div className='text-green-500'>{items.status}</div>

                      )}
                    </button>
                    <div className={`${Options === i ? "block" :"hidden"} flex mt-4`}>
                      <select name="status" id='' className='bg-gray-800' onChange={change} value={Values.status} >
                        {[
                            "Order Placed",
                            "Out for delivery",
                            "Delivered",
                            "Cancelled",

                          
                          ].map((items,i)=>(
                            <option value={items} key={i}>
                                {items}
                            </option>

                          ))}
                      </select>
                      <button className='text-green-500 hover:text-pink-600 mx-2' onClick={()=>{
                        SetOptions(-1);
                        submitChanges(i);
                      }}>
                         <FaCheck />
                      </button>

                    </div>
                  </h1>
                </div>
                <div className='w-[10%] md:w-[5%]'>
                        <button className='text-xl hover:text-orange-500'
                        onClick={()=>{
                          SetUserDiv("fixed");
                          SetUserDivData(items.user);
                        }}>
                         <IoOpenOutline />


                        </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {UserDivData && (<SeeUserData 
        UserDivData={UserDivData}
        UserDiv={UserDiv}
        SetUserDiv={SetUserDiv}/>
        )

        }
        </>
  );
};

export default AllOrders
