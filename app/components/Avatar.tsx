"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
const Avatar = () => {
  const [isShow, setIsShow] = useState(false);
  const router = useRouter();
  const toggleDropdown = () => {
    setIsShow(!isShow);
  };

  return (
    <div className="relative">
      {/* Avatar Image */}
      <div className="hover:cursor-pointer" onClick={toggleDropdown}>
        <img 
          src="https://cdn-icons-png.flaticon.com/512/6858/6858504.png" 
          alt="Avatar" 
          className="rounded-full w-10 h-10 mb-2 object-cover border-2 border-gray-300 shadow-md hover:border-gray-500 transition duration-300" 
        />
      </div>
      
      {/* Dropdown Menu */}
      {isShow && (
        <div className="absolute right-0 w-20 bg-white shadow-lg rounded-lg z-10">
          <button 
            onClick={() => {
              console.log("Logging out...");
              localStorage.removeItem("triviaId");
              router.push("/")
              window.location.reload();

            }} 
            className="w-full text-sm text-gray-700 hover:bg-gray-900 hover:text-white rounded-lg py-2 text-left px-3 transition duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Avatar;
