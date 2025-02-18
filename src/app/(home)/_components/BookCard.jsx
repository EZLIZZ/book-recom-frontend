"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";

export default function BookCard({ item, index }) {
  const [recommend, setRecommend] = useState([]);
  const handleRecommendClick = async (bookTitle) => {
    try {
      const response = await fetch("https://book-recommendation-tb82.onrender.com//api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_input: bookTitle }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setRecommend(data.recommended_books);
      }
    } catch (error) {
      console.error("Error fetching", error);
    }
  };
  return (
    <div key={index} className="cursor-pointer group mb-5">
      <div className="relative overflow-hidden">
        <img
          src={item["Image-URL-M"]}
          alt={item["Book-Title"] || "Product Image"}
          className="w-full h-full object-cover"
        />
        <div className="absolute right-3 top-3 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <Drawer className="rounded-none">
          <DrawerTrigger
            onClick={() => handleRecommendClick(item["Book-Title"])}
            className="absolute text-white py-2 opacity-0 bottom-0 bg-red-700 rounded-sm mb-2 left-2 right-2 group-hover:opacity-100 transition-opacity duration-300"
          >
            Recommendations
          </DrawerTrigger>
          <DrawerContent className="px-[5%]">
            <DrawerHeader>
              <DrawerTitle className="text-2xl font-semibold">Recommendations</DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2  gap-5  ">
              {recommend.map((books, idx) => (
                <div key={idx} className="cursor-pointer group sm:mb-5 mb-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={books[2]}
                      alt={books[0] || "Product Image"}
                      className="w-full lg:h-[20%] h-[10%] object-contain"
                    />
                  </div>
                  <h1 className="text-gray-700 mt-3">{books[0]}</h1>
                  <p className="font-semibold">{books[1]}</p>
                </div>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <h1 className="text-gray-700 mt-3">{item["Book-Title"]}</h1>
      <p className="font-semibold">{item["Book-Author"]}</p>

      <p className="font-semibold">{item["avg_rating"]}</p>
    </div>
  );
}
