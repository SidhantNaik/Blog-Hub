import React from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar() {
  return (
    <form className="flex items-center w-full max-w-md">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search here . . . ."
          className="w-full border-2 border-purple-300 rounded-2xl py-2 px-4 focus:outline-none focus:border-purple-400 focus:shadow-md"
        />
        <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-700">
          <FaSearch />
        </button>
      </div>
    </form>
  );
}