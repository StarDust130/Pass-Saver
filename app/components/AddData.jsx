"use client";
import { X } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AddPass } from "../../provider/redux/passSlice";

const AddData = ({ setShowAdd }) => {
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");

  const dipatch = useDispatch();

  const handlePasswordSave = () => {
    if (!accountName || !password) {
      return;
    }
    dipatch(AddPass({ accountName, password }));
    setShowAdd(false);
  };

const handleEnter = (e) => {
  if (e.key === "Enter") {
    handlePasswordSave();
  }
};

  return (
    <div className="flex justify-center w-full h-screen ">
      <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center backdrop-blur-sm">
        <div className="bg-white relative w-full max-w-md p-8 rounded-lg shadow-md border-t-4 border-blue-600">
          <X
            size={24}
            className="text-gray-500 absolute right-3 cursor-pointer top-3"
            onClick={() => setShowAdd(false)}
          />
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
            Pass Saver 🔒
          </h2>

          <input
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="w-full h-14 px-4 mb-4 rounded-md border border-gray-300 text-black font-bold focus:outline-none focus:gray-purple-600 bg-gray-100"
            placeholder="Account Name"
            autoFocus
          />

          <input
            type="text"
            className="w-full h-14 px-4 mb-6 rounded-md text-black font-bold border border-gray-300 focus:outline-none focus:gray-purple-600 bg-gray-100"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleEnter}
          />

          <button
            className="w-full h-14 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 ease-in-out"
            onClick={handlePasswordSave}
          >
            🚀 Save Password
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddData;
