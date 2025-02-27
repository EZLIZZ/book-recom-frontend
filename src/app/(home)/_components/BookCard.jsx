"use client";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";

export default function BookCard({ item, index }) {
  const [recommend, setRecommend] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRecommendClick = async (bookTitle) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://book-recommendation-tb82.onrender.com/api/recommend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_input: bookTitle }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setRecommend(data.recommended_books);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
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
        <Drawer>
          <DrawerTrigger
            onClick={() => handleRecommendClick(item["Book-Title"])}
            className="absolute text-white py-2 opacity-0 bottom-0 bg-red-700 rounded-sm mb-2 left-2 right-2 group-hover:opacity-100 transition-opacity duration-300"
          >
            Recommendations
          </DrawerTrigger>
          <DrawerContent className="px-[5%]">
            <DrawerHeader>
              <DrawerTitle className="text-2xl font-semibold">
                Recommendations
              </DrawerTitle>
              <DrawerDescription>
                {loading ? "Fetching recommendations..." : ""}
              </DrawerDescription>
            </DrawerHeader>

            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-5">
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
            )}
          </DrawerContent>
        </Drawer>
      </div>

      <h1 className="text-gray-700 mt-3">{item["Book-Title"]}</h1>
      <p className="font-semibold">{item["Book-Author"]}</p>
      <p className="font-semibold">{item["avg_rating"]}</p>
    </div>
  );
}
