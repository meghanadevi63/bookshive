import React, { useEffect, useState } from 'react'
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import { MdMenuBook } from "react-icons/md";
const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:5000/api/v1/get-favourite-books", { headers });
      setFavouriteBooks(response.data.data);
      //console.log(response.data.data);
    };
    fetch();


  }, [FavouriteBooks]);
  return (

    <>
      <h1 className='text-3xl text-white font-semibold '>Favourite Books</h1>
      {FavouriteBooks &&  FavouriteBooks.length === 0 &&  
        <div className='text-5xl  font-semibold h-[100%] text-zinc-500 flex items-center justify-center w-full gap-x-6'>No Favourite Books<MdMenuBook  className='text-6xl'/>

        </div>}

      <div className='grid grid-cols-4 gap-4 mt-6'>
        {FavouriteBooks && FavouriteBooks.map((items, i) => (
          <div key={i}>
            <BookCard data={items} favourite={true} />
          </div>
        ))

        }

      </div>
    </>
  )
}

export default Favourites;
