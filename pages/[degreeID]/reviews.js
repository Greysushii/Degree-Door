import { jsonEval } from "@firebase/util";
import { collection, query, getDocs, orderBy } from "firebase/firestore";

import Navbar from '../../components/Navbar'
import { db } from '../../firebase' 
export default function Reviews({reviews}) {
  console.log(reviews)
  return (
    <div className="degree-home bg-white font-Karla relative">
      <Navbar links={[{route: "/", name: "Home"},{route: "/post", name: "Post Review"}, {route:"/signOut", name: "Sign Out"}]}/>
      <header className="header-wrapper w-full container mx-auto pt-12">
        <div className="name-description-wrapper flex flex-col items-center py-12">
          <div className="display-degree-name font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl">
            Reviews Page
          </div>
          <p className="text-lg text-gray-600 text-center">
            Here you can check out all of the reviews!
          </p>
        </div>
      </header>
      <nav className="degree-page-nav w-full py-4 border-t border-b bg-gray-100">
        <div className="w-full flex-grow sm:flex sm:items-center sm:w-auto">
          <div className="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
            <a href="/cs" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Overview</a>
            <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Links</a>
            <a href="/cs/reviews" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Reviews</a>
          </div>
        </div>
      </nav>
      <div className="text-center">Hello, this is an overview of what the Review page should look like.</div>
    </div>
  )
}

export async function getServerSideProps(context) {
  // Get a query on the sub collection for degree page reviews, sorting each review by timestamp
  const reviewsQuery = query(collection(db, `Degrees/${context.params.degreeID}/Reviews`), orderBy("timestamp"));
  const reviewsSnapshot = await getDocs(reviewsQuery);

  const reviewData = reviewsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  .map((review) => ({
    ...review,
  }))
  return {
    props: {
      reviews: JSON.stringify(reviewData)
    }
  }
}

