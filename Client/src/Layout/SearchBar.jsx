import React from 'react';

export default function SearchBar() {
  return (
      <input
        type="text"
        placeholder="Search here . . . ."
        className="bg-white border border-gray-300 rounded-full py-3 px-4 w-100 mt-2 focus:outline-none focus:border-blue-500 transition-shadow focus:shadow-lg hover:shadow-xl  "
      />
  );
}
