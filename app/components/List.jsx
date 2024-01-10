import React, { useState } from "react";
import { Copy, Pencil, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { DeletePass } from "@/provider/redux/passSlice";

const List = () => {
  const passes = useSelector((state) => state.passSlice.pass);
  const [isCopied, setIsCopied] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState("");
  const [editMode, setEditMode] = useState(null);
  const [editedAccountName, setEditedAccountName] = useState("");
  const [editedPassword, setEditedPassword] = useState("");
  const dispatch = useDispatch();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setCopiedPassword(text);

    setTimeout(() => {
      setIsCopied(false);
      setCopiedPassword("");
    }, 2000);
  };

  const enterEditMode = (passId, accountName, password) => {
    setEditMode(passId);
    setEditedAccountName(accountName);
    setEditedPassword(password);
  };

  const exitEditMode = () => {
    setEditMode(null);
    setEditedAccountName("");
    setEditedPassword("");
  };

  const saveChanges = (passId) => {
    // Implement logic to save changes to the Redux store
    // For simplicity, this example just exits edit mode without saving
    exitEditMode();
  };

  return (
    <>
      {passes.length > 0 ? (
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
                  <th className="py-3 px-10 text-left font-semibold">Tools</th>
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
                    <td className="py-4 px-6">
                      {editMode === singlePass.id ? (
                        <input
                          type="text"
                          value={editedAccountName}
                          onChange={(e) => setEditedAccountName(e.target.value)}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      ) : (
                        singlePass.accountName
                      )}
                    </td>
                    <td className="py-4 text-sm md:text-lg px-6">
                      {editMode === singlePass.id ? (
                        <input
                          type="text"
                          value={editedPassword}
                          onChange={(e) => setEditedPassword(e.target.value)}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      ) : (
                        <span className="truncate">
                          {singlePass.password.slice(0, -3).replace(/./g, "*") +
                            singlePass.password.slice(-3)}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 relative flex items-center space-x-4">
                      <div className="flex items-center space-x-2 md:space-x-4">
                        <Copy
                          className={`cursor-pointer hover:text-green-500 transition duration-300 transform hover:scale-110`}
                          onClick={() => copyToClipboard(singlePass.password)}
                        />
                        {editMode === singlePass.id ? (
                          <>
                            <button
                              onClick={() => saveChanges(singlePass.id)}
                              className="text-green-500 hover:text-green-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => exitEditMode()}
                              className="text-red-500 hover:text-red-700"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <Pencil
                            className="cursor-pointer hidden md:block hover:text-blue-500 transition duration-300 transform hover:scale-110"
                            onClick={() =>
                              enterEditMode(
                                singlePass.id,
                                singlePass.accountName,
                                singlePass.password
                              )
                            }
                          />
                        )}
                        <Trash2
                          className="cursor-pointer hidden md:block hover:text-red-500 transition duration-300 transform hover:scale-110"
                          onClick={() => dispatch(DeletePass(singlePass.id))}
                        />
                      </div>

                      {copiedPassword &&
                        copiedPassword === singlePass.password && (
                          <span className="absolute top-0 -mt-6 text-green-500 font-bold bg-gray-600 px-2 py-1 rounded">
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
          {/* ... (no passwords saved message) */}
        </div>
      )}
    </>
  );
};

export default List;
