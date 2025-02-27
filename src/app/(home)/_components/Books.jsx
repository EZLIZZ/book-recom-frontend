"use client"
import { useEffect, useState } from "react";
import BookCard from "./BookCard";

export default function Books({ books }) {
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    if (books && books.length > 0) {
      setLoading(false);
    }
  }, [books]);

  return (
    <div className="w-full flex justify-center mt-8">
      <div className="w-[90%] ">
        <div className="flex justify-between py-5">
          <h1 className="text-3xl font-semibold">Popular Books</h1>
        </div>
        {Loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-lg font-medium mt-4 text-blue-500">
                Fetching your books...
              </p>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-5">
            {books.map((book, index) => (
              <BookCard key={index} item={book} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
