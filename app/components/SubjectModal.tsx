"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { socket } from "../socket/socket";
interface SubjectModalProps {
  onClose: () => void;
}

const SubjectModal: React.FC<SubjectModalProps> = ({ onClose }) => {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  // Function to generate a random string for room code
  function generateRandomString() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setIsModalVisible(true);
    const storedUserId = localStorage.getItem("triviaId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
    return () => setIsModalVisible(false);
  }, []);

  const createGameRoom = async () => {
    const code = generateRandomString();
    if (!userId) {
      alert("User ID is not available. Please log in.");
      return;
    }
    socket.emit("joinRoom",{userId,roomCode})
    try {
      const response = await axios.post("/api/gameroom/creategame", {
        code,
        userId:userId
      });
      console.log(response);
      router.push(`/createquiz?code=${code}`);
    } catch (error) {
      console.error("Error creating game room:", error);
      alert("There was an error creating the room.");
    }
  };

  const joinGameRoom = async () => {
    if (roomCode.trim()) {
      try {
        const response = await axios.post("/api/gameroom/joingame", {
          code: roomCode,
          userId:userId
        });
        console.log(response);
        socket.emit("joinRoom",{userId,roomCode})
        router.push(`/waiting?code=${roomCode}`);
      } catch (error) {
        console.error("Error joining game room:", error);
        alert("Error joining the game room.");
      }
    } else {
      alert("Please enter a valid room code.");
    }
  };

  return (
    <div
      className={`fixed inset-auto top-20 w-full flex items-center justify-center bg-black bg-opacity-0 z-40 transition-transform duration-500 ${
        isModalVisible
          ? "transform translate-y-0"
          : "transform translate-y-[-100%]"
      }`}
    >
      <div className="bg-gray-800 p-6 rounded-lg max-w-lg w-full text-white relative transform transition-all duration-500">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <span className="text-3xl">&times;</span>
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Choose a Subject
        </h2>

        <div className="flex justify-around space-x-4">
          <div
            className="text-center hover:cursor-pointer"
            onClick={createGameRoom}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Computer_science_and_engineering.jpg"
              alt="Subject 1"
              className="rounded-lg w-20 h-20 mb-2 object-cover"
            />
            <span className="text-sm font-medium">Computer Science</span>
          </div>
          <div
            className="text-center hover:cursor-pointer"
            onClick={createGameRoom}
          >
            <img
              src="https://t3.ftcdn.net/jpg/08/18/68/84/360_F_818688492_NDraELsNDT8CNm966GrV4VuOD2sPcuzR.jpg"
              alt="Subject 2"
              className="rounded-lg w-20 h-20 mb-2 object-cover"
            />
            <span className="text-sm font-medium">General Knowledge</span>
          </div>
          <div
            className="text-center hover:cursor-pointer"
            onClick={createGameRoom}
          >
            <img
              src="https://i.pinimg.com/originals/ab/9f/8d/ab9f8d2c0a3c5d2eb84ad4edaa357032.jpg"
              alt="Subject 3"
              className="rounded-lg w-20 h-20 mb-2 object-cover"
            />
            <span className="text-sm font-medium">Mathematics</span>
          </div>
        </div>
        <div className="my-6 flex items-center justify-center text-lg font-bold text-gray-300 relative">
          <div className="w-full border-t-2 border-gray-600"></div>
          <span className="absolute left-1/2 transform -translate-x-1/2 px-4 bg-gray-800 text-xl font-semibold text-white z-10">
            OR
          </span>
        </div>
        {/* Room Code Input and Button */}
        <div className="mt-6">
          <label
            htmlFor="roomCode"
            className="block text-sm font-medium mb-2 text-white"
          >
            Enter Room Code:
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              id="roomCode"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              placeholder="Enter the room code"
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={joinGameRoom}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectModal;
