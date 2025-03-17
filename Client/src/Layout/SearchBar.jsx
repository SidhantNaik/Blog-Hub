import React from 'react';

export default function SearchBar() {
  return (
    <form className=" flex items-center">

      <input
        type="text"
        placeholder="Search here . . . ."
        className="border-3 border-purple-300 rounded-2xl p-0  m-2 hover:border-purple-400 hover:shadow-2xl focus:outline-none focus:shadow-2xl lg:p-2 w-100"
      />
 
      <i className="fas fa-search ml-2 text-purple-700 scale-120 cursor-pointer" ></i>

    </form>
  );
}
