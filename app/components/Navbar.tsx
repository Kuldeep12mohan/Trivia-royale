"use client"
import { useEffect, useState } from "react";
import SubjectModal from "./SubjectModal";
import { useRouter } from "next/navigation";
import Avatar from "./Avatar";

export const Navbar = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in based on localStorage
    const triviaId = localStorage.getItem("triviaId");
    setIsLoggedIn(triviaId ? true : false);
  }, []); // Empty dependency array to run only once after mount

  const toggleModal = () => {
    if(isLoggedIn)setIsModalOpen(!isModalOpen);
    else router.push("/signup")
  };

  return (
    <nav className="w-full flex items-center justify-between py-4 px-8 bg-transparent text-white fixed top-0 z-10">
      {/* Logo */}
      <div className="text-xl font-bold flex items-center">
        <span>TRIVIA</span>
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex space-x-8 text-lg">
        <li><a href="#home" className="hover:text-gray-300">Home</a></li>
        <li><a href="#collectables" className="hover:text-gray-300">Collectables</a></li>
        <li>
          <button onClick={toggleModal} className="hover:text-gray-300">
            Game
          </button>
        </li>
        <li><a href="#team" className="hover:text-gray-300">Team</a></li>
        <li><a href="#faq" className="hover:text-gray-300">FAQ</a></li>
      </ul>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        {!isLoggedIn ? (
          <>
            <button className="hidden md:block px-6 py-2 bg-white text-slate-900 font-semibold rounded-full hover:bg-gray-300 transition duration-300" onClick={()=>router.push("/signin")}>
              Sign In
            </button>
            <button 
              className="hidden md:block px-6 py-2 bg-black text-white font-semibold rounded-full hover:bg-gray-900 transition duration-300" 
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </button>
          </>
        ) : (
          <Avatar />
        )}
      </div>

      {/* Subject Modal */}
      {isModalOpen && <SubjectModal onClose={toggleModal} />}
    </nav>
  );
};
