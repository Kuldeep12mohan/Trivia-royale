"use client"
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
interface Question {
  questionText: string;
  options: string[];
  correctOption: string;
}

const CreateQuiz = ({ subject, code }: { subject: String; code: String | undefined | string[] }) => {
  const router = useRouter();
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState<string[]>(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleOptionChange = (index: number, value: string) => {
    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index] = value;
      return newOptions;
    });
  };

  const addQuestion = async () => {
    if (
      questionText.trim() === "" ||
      options.some((opt) => opt.trim() === "") ||
      correctOption.trim() === ""
    ) {
      alert("Please fill in the question, all options, and the correct answer.");
      return;
    }
    const res = await axios.post("/api/question/add", { questionText, options, correctOption, code });
    setQuestions([...questions, { questionText, options, correctOption }]);

    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectOption("");
  };

  const goToNextStep = () => {
    router.push(`/waiting?code=${code}`)
  };

  return (
    <div className="bg-[url('assets/Quiz.jpg')] bg-no-repeat bg-cover bg-fixed bg-center min-h-screen w-full flex flex-col items-center justify-center text-white relative top-10">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <div className="relative z-10 bg-gray-800 bg-opacity-75 p-8 rounded-lg max-w-lg w-full shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gradient bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 bg-clip-text text-transparent">
          Create {subject} Quiz <br />
          <span className=" text-gradient bg-gradient-to-r from-cyan-400 via-green-500 to-blue-600 bg-clip-text text-transparen">Quiz Id- {code}</span>
        </h2>
        <h2>Question added {questions.length}</h2>
        
        <div className="flex flex-col space-y-4">
          <label className="block text-sm font-medium">Question:</label>
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Enter your question here"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <div className="grid grid-cols-2 gap-4">
            {options.map((option, index) => (
              <div key={index}>
                <label className="block text-sm font-medium">Option {index + 1}:</label>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            ))}
          </div>

          <label className="block text-sm font-medium mt-4">Correct Option:</label>
          <input
            type="text"
            value={correctOption}
            onChange={(e) => setCorrectOption(e.target.value)}
            placeholder="Enter the correct answer"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            onClick={addQuestion}
            className="w-full py-3 mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-600 transition duration-300"
          >
            Add Question
          </button>

          {/* Next Step Button */}
          <button
            onClick={goToNextStep}
            className="w-full py-3 mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
