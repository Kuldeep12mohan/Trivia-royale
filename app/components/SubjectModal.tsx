import React, { useEffect, useState } from "react";

// Define types for the onClose function
interface SubjectModalProps {
  onClose: () => void;
}

const SubjectModal: React.FC<SubjectModalProps> = ({ onClose }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Trigger the modal visibility when it's mounted
  useEffect(() => {
    setIsModalVisible(true);
    return () => setIsModalVisible(false); // Clean up when the modal unmounts
  }, []);

  return (
    <div
      className={`fixed inset-auto top-20 w-full flex items-center justify-center bg-black bg-opacity-0 z-20 transition-transform duration-500 ${
        isModalVisible ? "transform translate-y-0" : "transform translate-y-[-100%]"
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
          <div className="text-center hover:cursor-pointer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Computer_science_and_engineering.jpg"
              alt="Subject 1"
              className="rounded-lg w-20 h-20 mb-2 object-cover"
            />
            <span className="text-sm font-medium">Computer Science</span>
          </div>
          <div className="text-center hover:cursor-pointer">
            <img
              src="https://t3.ftcdn.net/jpg/08/18/68/84/360_F_818688492_NDraELsNDT8CNm966GrV4VuOD2sPcuzR.jpg"
              alt="Subject 2"
              className="rounded-lg w-20 h-20 mb-2 object-cover"
            />
            <span className="text-sm font-medium">General Knowledge</span>
          </div>
          <div className="text-center hover:cursor-pointer">
            <img
              src="https://i.pinimg.com/originals/ab/9f/8d/ab9f8d2c0a3c5d2eb84ad4edaa357032.jpg"
              alt="Subject 3"
              className="rounded-lg w-20 h-20 mb-2 object-cover"
            />
            <span className="text-sm font-medium">Mathematics</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectModal;
