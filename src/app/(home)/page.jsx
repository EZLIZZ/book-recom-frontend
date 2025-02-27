import Books from "./_components/Books";

export default async function Home(){
    try {
        const response = await fetch("https://book-recommendation-tb82.onrender.com//api/popular");
        if (!response.ok){
            throw new Error(`HTTP error! Status : ${response.status}`)
        }
        const result = await response.json();
        // console.log(result);  
        return(
            <>
            <Books books = {result.popular_books} /></>
        )
    } catch (error) {
        console.error("Error fetching books:", error);    
    }
   
   
}