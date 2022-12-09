import Link from "next/link"
import Dropdown from "../components/Dropdown"
export default function NewNavbar({ pageTitle, userID }) {
  return (
    <nav className="bg-[#292828] border-gray-200 border-b-2 px-2 sm:px-4 py-2.5 shadow-md absolute top-0 min-w-full min-h-fit">
      <div className="container text-white flex flex-wrap justify-between items-center mx-auto h-10">
        <Link href={userID ? {pathname: "/", query: {userID: userID}} :"/login"}>
          <div className="navbar-brand cursor-pointer flex">
            <img className="w-6 h-6 ml-2 text-[#ffffff]" src="https://i.imgur.com/PUIKaAn.png"></img><b>egreeDoor</b>
          </div>
        </Link>
        <div className='text-white text-lg mr-28'>
          <b>{pageTitle}</b>
        </div>
        <div className="flex md:order-2">
          {userID && <Dropdown color="#FFFFFF"/> }
        </div>
      </div>
    </nav>
  )
}