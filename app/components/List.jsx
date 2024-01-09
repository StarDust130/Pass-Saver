import React, { useState } from "react";
import { Copy, Pencil, PlusCircle, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { DeletePass } from "@/provider/redux/passSlice";

const List = () => {
  const passes = useSelector((state) => state.passSlice.pass);
  const [isCopied, setIsCopied] = useState(false);
  const dispatch = useDispatch();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);

    // Reset the copied message after 2 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };


  return (
    <>
      {passes.length > 1 ? (
        <div className="w-full bg-white shadow-md rounded overflow-hidden my-6">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-3 px-6 text-left hidden md:block font-semibold">
                    Index
                  </th>
                  <th className="py-3 px-6 text-left font-semibold">
                    Account Name
                  </th>
                  <th className="py-3 px-6 text-left font-semibold">
                    Password
                  </th>
                  <th className="py-3 px-10   text-left font-semibold">
                    Tools
                  </th>
                </tr>
              </thead>
              <tbody>
                {passes.map((singlePass, index) => (
                  <tr
                    key={singlePass.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } text-gray-800 hover:bg-gray-200 transition-all duration-300`}
                  >
                    <td className="py-4 px-6 relative hidden md:block">
                      {index + 1}
                    </td>
                    <td className="py-4 px-6">{singlePass.accountName}</td>
                    <td className="py-4 text-sm md:text-lg px-6">
                      {singlePass.password.slice(0, -3).replace(/./g, "*") +
                        singlePass.password.slice(-3)}
                    </td>
                    <td className="py-4 px-6 relative flex items-center space-x-4">
                      <div className="flex items-center space-x-2 md:space-x-4">
                        <Copy
                          className={`cursor-pointer  hover:text-green-500`}
                          onClick={() => copyToClipboard(singlePass.password)}
                        />
                        <Pencil className="cursor-pointer hidden md:block hover:text-blue-500" />
                        <Trash2
                          className="cursor-pointer hidden md:block hover:text-red-500"
                          onClick={() => dispatch(DeletePass(singlePass.id))}
                        />
                      </div>

                      {isCopied && (
                        <span className="text-green-500 font-bold bg-gray-600 z-50 absolute top-0  -translate-y-1/2 px-2 py-1 rounded transition-opacity duration-500">
                          Copied!
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center p-8  rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              No Passwords Saved Yet
            </h1>
            <p className="text-gray-500 mb-6">
              Click on the <span className="text-blue-500 font-bold"><PlusCircle /></span>{" "}
              icon to add a password
            </p>
            <span className="text-center">OR</span>
            <div className="text-4xl text-gray-500">Ctrl + Z</div>
          </div>
        </div>
      )}
    </>
  );
};

export default List;
