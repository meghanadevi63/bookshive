import {Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from "../Loader/Loader";
import { GrLanguage } from "react-icons/gr";
import { IoHeartCircleSharp } from "react-icons/io5";
import { FaCartArrowDown } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";



const ViewBookDetails = () => {
    const { id } = useParams();
    const navigate=useNavigate();
    //console.log(id);
    const [Data, setData] = useState();
    const isLoggedIn = useSelector((state) => state.auth.isloggedIn);
    const role = useSelector((state) => state.auth.role);
    // console.log(isLoggedIn);
    //console.log(role);
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                `http://localhost:5000/api/v1/get-book/${id}`
            );
            //console.log(response);
            setData(response.data.data);
        };
        fetch();

    }, []);

    const headers={
        id:localStorage.getItem("id"),
        authorization:`Bearer ${localStorage.getItem("token")}`,
        bookid:id,
      };

    const  handleFavourite=async()=>{
        const response =await axios.put(`http://localhost:5000/api/v1/add-book-to-favourite`,{},{headers});
        //console.log(response.data.message);
        alert(response.data.message);
    };
   
    const handleCart=async()=>{
        const response=await axios.put(`http://localhost:5000/api/v1/add-to-cart`,{},{headers});
        alert(response.data.message);
        navigate("/all-books");
    }


    const deleteBook =async()=>{
        const response = await axios.delete(`http://localhost:5000/api/v1/delete-book`,{headers});
       // console.log(response.data.message);
       alert(response.data.message);
       navigate("/all-books");
    }

    return (

        <>
            {Data && (<div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 items-start'>
                <div className='w-full lg-w-3/6 '>
                    {" "}
                    <div className="flex justify-around bg-zinc-800 p-12 rounded">{" "}
                        <img src={Data.url} alt="/" className="h-[50vh] lg:h-[70vh] rounded" />
                        {isLoggedIn === true && role === "user" && (<div className="flex flex-col gap-y-6 md:gap-y-8">
                            <button className="bg-white w-14 h-14 rounded-full text-3xl flex items-center justify-center text-red-500" onClick={handleFavourite}>
                              
                                <IoHeartCircleSharp />{" "}
                            </button>
                            <button className="bg-white w-14 h-14 rounded-full text-3xl flex items-center justify-center text-blue-500" onClick={handleCart}>
                                <FaCartArrowDown />{" "}
                            </button>
                        </div>)

                        }

                        {isLoggedIn === true && role === "admin" && (<div className="flex flex-col gap-y-6 md:gap-y-8">
                            <Link to={`/updateBook/${id}`} className="bg-white w-14 h-14 rounded-full text-3xl flex items-center justify-center text-blue-900">
                                
                            <CiEdit />{""}
                            </Link>
                            <button className="bg-white w-14 h-14 rounded-full text-3xl flex items-center justify-center text-red-500" onClick={deleteBook}>
                            <MdDeleteOutline />{""}
                            </button>
                        </div>)

                        }
                    </div>





                </div>
                <div className='bg-zinc-800 rounded p-4 w-full lg-w-3/6'>
                    <h1 className="text-4xl text-zinc-300 font-semibold">{Data.title}</h1>
                    <p className="text-zinc-400 mt-1">by {Data.author}</p>
                    <p className="text-zinc-500 mt-4 text-xl">{Data.desc}</p>
                    <p className="flex mt-4 items-center justify-start text-zinc-400">
                        <GrLanguage className="me-3" />{Data.language}
                    </p>
                    <p className="mt-4 text-zinc-100 text-3xl font-semibold">
                        Price : ₹ {Data.price}{" "}
                    </p>

                </div>

            </div>)}
            {!Data && <div className="h-screen bg-zinc-900 flex items-center justify-center"><Loader /></div>}
        </>
    );
};

export default ViewBookDetails
    ;