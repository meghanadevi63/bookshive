import React from 'react'
import logo from "./logo.jpg";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const links =
    [
      {
        title: "Home",
        link: "/",
      },
      {
        title: "About Us",
        link: "/about-us",
      },
      {
        title: "All Books",
        link: "/all-books",
      },
      {
        title: "Cart",
        link: "/cart",
      },
      {
        title: "Profile",
        link: "/profile",
      },
      {
        title: "Admin Profile",
        link: "/profile",
      },
    ];
  const isLoggedIn= useSelector((state)=>state.auth.isloggedIn);
  const role=useSelector((state)=>state.auth.role);
  //console.log(isLoggedIn);
  if(isLoggedIn===false){
    links.splice(3,3);

  }

  
  if(isLoggedIn===true && role==="user"){
    links.splice(5,1);
  }

  if(isLoggedIn===true && role==="admin"){
    links.splice(3,2);
  }


  const [mobileNav, setMobileNav] = useState("hidden");
  return (
    <>
      <nav className='z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between'>
        <Link to="/" className='flex items-center'>
          <img className='h-10 me-4' src={logo} alt="logo" />
          <h1 className='text-2xl font-semibold'>Kitaab Dosth</h1>
        </Link>
        <div className='nav-links-bookheaven block md:flex items-center gap-4'>
          <div className='hidden md:flex gap-4'>
            {
              links.map((items, i) => (
                <div className='flex items-center'>
                {items.title==="Profile" || items.title==="Admin Profile" ?(<Link to={items.link}
                  className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration:300' key={i}>
                  {items.title}
                </Link>  ):(
                <Link to={items.link}
                className='hover:text-blue-500 transition-all duration-300' key={i}>
                {items.title}{" "}
              </Link>)
                }
                </div>
              ))
            }

          </div>
        {isLoggedIn===false && (<>
          <div className='hidden md:flex gap-4'>
            <Link to="/LogIn" className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration:300'>login</Link>
            <Link to="/SignUp" className='px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>signup</Link>

          </div></>)
        }
          <button className='block md:hidden text-white text-2xl hover:text-zinc-400'
            onClick={() =>
              mobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")}>
            <FaGripLines />
          </button>
        </div>

      </nav>
      <div className={`${mobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
        {
          links.map((items, i) => (
            <Link to={items.link}
              className={`${mobileNav} text-white mb-8 text-3xl font-semibold  hover:text-blue-500 transition-all duration-300`} key={i}
              onClick={() =>
                mobileNav === "hidden"
                  ? setMobileNav("block")
                  : setMobileNav("hidden")}>
              {items.title}{" "}
            </Link>
          ))
        }

        {isLoggedIn===false && (<>
          <Link to="/LogIn" className={`${mobileNav} px-8 py-2 mb-8 text-3xl font-semibold border border-blue-500 rounded text-white  hover:bg-white hover:text-zinc-800 transition-all duration:300`}onClick={() =>
                mobileNav === "hidden"
                  ? setMobileNav("block")
                  : setMobileNav("hidden")}>login</Link>
        <Link to="/SignUp" className={`${mobileNav} px-8 py-2 mb-8 text-3xl font-semibold bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}onClick={() =>
                mobileNav === "hidden"
                  ? setMobileNav("block")
                  : setMobileNav("hidden")}>signup</Link>
        </>)}

      </div>
    </>
  );
};

export default Navbar;
