import {Navbar} from "./components/Navbar"

export default function Home() {
  return (
    <div
      className="bg-[url('assets/background.jpg')] bg-no-repeat bg-cover bg-center h-screen w-full flex flex-col items-center justify-center text-white relative"
    >
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="text-center mt-20">
        <h1 className="text-6xl md:text-7xl font-bold mb-4">Trivia Royale</h1>
        <p className="text-lg md:text-2xl mb-8">Brain and Lightning Bolt</p>
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold transition duration-300">
          Discover Trivia Royale
        </button>
      </div>
    </div>
  );
}
