"use client"
import { useEffect, useState } from "react";
import BookCard from "./BookCard";

export default function Books() {
    
const [books,setBooks] = useState([]);
useEffect(()=>{
    getBooks();
},[])

const getBooks = async () => {
    try {
        const response = await fetch("https://book-recommendation-tb82.onrender.com//api/popular");
        if (!response.ok){
            throw new Error(`HTTP error! Status : ${response.status}`)
        }
        const result = await response.json();
        console.log(result);  
        setBooks(result.popular_books);
    } catch (error) {
        console.error("Error fetching books:", error);    
    }
   
}

  return (
    <div className="w-full flex justify-center mt-8">
      <div className="w-[90%] ">
        <div className="flex justify-between py-5">
          <h1 className="text-3xl font-semibold">Popular Books</h1>
          {/* <Button className="bg-themePrimary p-5 rounded-sm">View all</Button> */}
        </div>
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-5  ">
          {books.map((books, index) => (
            <BookCard key={index} item={books} index ={index}/>
          ))}
        </div>
      </div>
    </div>
  );
}