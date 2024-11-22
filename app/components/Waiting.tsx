"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import { useRouter } from "next/navigation";
import { socket } from "../socket/socket"; // Ensure socket is initialized correctly

const Waiting = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code"); // Fetch the 'code' query parameter from the URL
  const [userId, setUserId] = useState<string | null>(null);
  const [players, setPlayers] = useState<any[]>([]);

  // Get userId from localStorage and set it
  useEffect(() => {
    const storedUserId = localStorage.getItem("triviaId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error("User ID is missing in localStorage");
    }
  }, []);

  // Join room when userId and code are available
  useEffect(() => {
    if (userId && code) {
      socket.emit("joinRoom", { userId, code });
    }
  }, [userId, code]);

  // Handle starting the game via socket
  useEffect(() => {
    socket.on("startGame", () => {
      console.log("Game is starting!");
      router.push("/quizgame");
    });

    // Cleanup the event listener on component unmount
    return () => {
      socket.off("startGame");
    };
  }, [router]);

  // Fetch players on initial load and at intervals
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(
          `/api/gameroom/getplayers?code=${code}`
        );
        console.log(response.data.gameRoom.players);
        setPlayers(response.data.gameRoom.players);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers(); // Initial fetch
    const interval = setInterval(fetchPlayers, 1000); // Fetch players every 1 second

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [code]);

  // Refresh player list manually when the Refresh button is clicked
  const handleRefresh = async () => {
    try {
      const response = await axios.get(`/api/gameroom/getplayers?code=${code}`);
      console.log(response.data.gameRoom.players);
      setPlayers(response.data.gameRoom.players);
    } catch (error) {
      console.error("Error refreshing players:", error);
    }
  };

  return (
    <div className="bg-[url('assets/dark.jpg')] bg-no-repeat bg-cover bg-center min-h-screen w-full flex flex-col items-center justify-center text-white relative">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 text-center px-4">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold mb-6 text-gradient bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Waiting for Other Players to Join
        </motion.h2>

        <p className="text-lg sm:text-xl mb-8 text-gray-300">
          Please hold on while the game is preparing...
        </p>

        <div className="flex items-center justify-center space-x-3">
          <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse animation-delay-200"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse animation-delay-400"></div>
        </div>

        {/* Display players with motion */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          {players.length > 0 ? (
            <ul className="space-y-4">
              {players.map((player, index) => (
                <motion.li
                  key={player.id}
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.3, duration: 0.5 }}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                  <span className="text-white font-medium">
                    {player.username}
                  </span>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="text-white">No players have joined yet.</p>
          )}
        </motion.div>

        <div className="mt-6">
          <button
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:bg-blue-600 transition duration-300"
            onClick={handleRefresh}
          >
            Refresh
          </button>
          <button
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-pink-600 text-white font-semibold rounded-full hover:bg-blue-600 transition duration-300"
            onClick={async () => {
              try {
                const res = await axios.post(
                  `http://localhost:8080/startGame`,
                  { room: code },
                  { headers: { "Content-Type": "application/json" } }
                );
                console.log(res.data);
                router.push("/quizgame");
              } catch (error) {
                console.error("Error starting game:", error);
              }
            }}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Waiting;
