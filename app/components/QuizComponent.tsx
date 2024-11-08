import { useState, useEffect } from "react";

export default function QuizComponent() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleOptionClick = (option:any) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption) {
      alert(`You selected option: ${selectedOption}`);
    } else {
      alert("Please select an option before submitting.");
    }
  };

  return (
    <div className="bg-[url('assets/back3.jpg')] bg-no-repeat bg-cover bg-center h-screen w-full flex flex-col items-center justify-center text-white relative">
      {/* Timer */}
      <div className="absolute top-10 text-2xl font-semibold text-red-500 z-20">
        {timeLeft > 0 ? `Time Left: ${timeLeft}s` : "Time's up!"}
      </div>

      {/* Quiz Container */}
      <div className="max-w-lg w-full p-6 text-center space-y-6 shadow-lg z-20 bg-black/70 rounded-lg">
        <p className="text-2xl font-semibold">
          Smyths Sea can be found on which body in the Solar System?
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleOptionClick("a")}
            className={`py-3 rounded-lg transition font-medium border-2 ${
              selectedOption === "a" ? "border-green-400" : "border-transparent"
            } hover:border-blue-400`}
          >
            a: The Sun
          </button>
          <button
            onClick={() => handleOptionClick("b")}
            className={`py-3 rounded-lg transition font-medium border-2 ${
              selectedOption === "b" ? "border-green-400" : "border-transparent"
            } hover:border-blue-500`}
          >
            b: The Moon
          </button>
          <button
            onClick={() => handleOptionClick("c")}
            className={`py-3 rounded-lg transition font-medium border-2 ${
              selectedOption === "c" ? "border-green-400" : "border-transparent"
            } hover:border-blue-500`}
          >
            c: Mars
          </button>
          <button
            onClick={() => handleOptionClick("d")}
            className={`py-3 rounded-lg transition font-medium border-2 ${
              selectedOption === "d" ? "border-green-400" : "border-transparent"
            } hover:border-blue-500`}
          >
            d: Earth
          </button>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="mt-6 w-full py-3 rounded-lg bg-green-500 hover:bg-green-600 transition font-medium"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
