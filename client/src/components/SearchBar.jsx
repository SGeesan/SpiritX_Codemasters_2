import React from 'react';

function SearchBar({ setsearchKey }) {
  return (
    <form className="max-w-lg sm:w-1/3 mx-auto w-full">
      <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-[#bf0000]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="search"
          onChange={(e) => setsearchKey(e.target.value)}
          className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-[#bf0000] focus:border-[#bf0000] focus:outline-none h-10 transition-all duration-300 font-semibold"
          placeholder="Players' Names..."
          required
        />
      </div>
    </form>
  );
}

export default SearchBar;