import React from 'react';
import { Settings } from 'lucide-react';

const Header = ({ setShowCreateForm }) => (
  <div className="p-4 flex justify-between items-center">
    <div>
      <h1 className="text-xl font-semibold">Delhi NCR</h1>
      <p className="text-gray-500 text-sm">Welcome to the tribe!</p>
    </div>
    <button 
      onClick={() => setShowCreateForm(true)}
      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
    >
      <Settings size={20} />
    </button>
  </div>
);

export default Header;