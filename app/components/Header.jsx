/* eslint-disable react-hooks/exhaustive-deps */
import { PlusCircle } from "lucide-react";
import { useEffect } from "react";

const Header = ({ setShowAdd, showAdd }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "z") {
        setShowAdd(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="bg-black">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-bold text-5xl md:text-4xl text-blue-500">
            Pass Saver 🔐
          </span>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <div className="relative flex-grow">
              <label className="sr-only" htmlFor="search">
                Search
              </label>
              <input
                className="h-10 w-full rounded-full border-none bg-white pe-10 ps-4 text-sm shadow-sm sm:w-56"
                id="search"
                type="search"
                placeholder="Search for a accounts"
              />
              <button
                type="button"
                className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
              >
                <span className="sr-only">Search</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
            <PlusCircle
              size={35}
              color="gray"
              onClick={() => setShowAdd(!showAdd)}
              className="cursor-pointer"
            />
            <span className="font-bold text-gray-500 hidden sm:block">
              <span className="font-bold">Ctrl</span> + Z
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
