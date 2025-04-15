import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-green-600">
          MyTodo
        </Link>
        
        <div className="space-x-6 text-gray-700 font-medium">
          <Link
            to="/"
            className="hover:text-green-600 transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="hover:text-green-600 transition duration-200"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="hover:text-green-600 transition duration-200"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
