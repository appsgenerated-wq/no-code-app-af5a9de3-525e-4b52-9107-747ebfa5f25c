import React from 'react';
import config from '../constants';

const LandingPage = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage: `url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop')`}}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/80 to-gray-900"></div>
      
      <div className="relative z-10 text-center max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">
          LunarLog
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          A collaborative encyclopedia of fascinating facts about our celestial neighbor. Discover, share, and explore the wonders of the Moon.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => onLogin('user@example.com', 'password')}
            className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg shadow-blue-600/30"
          >
            Explore as Demo User
          </button>
          <a 
            href={`${config.BACKEND_URL}/admin`} 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-300"
          >
            Admin Panel
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
