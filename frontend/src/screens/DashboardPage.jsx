import React, { useEffect, useState } from 'react';
import config from '../constants.js';

const DashboardPage = ({ user, facts, onLogout, onLoadFacts, onCreateFact }) => {
  const [newFact, setNewFact] = useState({ title: '', details: '', category: 'Science' });

  useEffect(() => {
    onLoadFacts();
  }, [onLoadFacts]);

  const handleCreateFact = async (e) => {
    e.preventDefault();
    if (!newFact.title || !newFact.details) {
      alert('Title and details are required.');
      return;
    }
    await onCreateFact(newFact);
    setNewFact({ title: '', details: '', category: 'Science' });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome, {user.name}!
            </h1>
            <p className="text-gray-400">Share your knowledge about the Moon.</p>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href={`${config.BACKEND_URL}/admin`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
            >
              Admin
            </a>
            <button 
              onClick={onLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
        
        <div className="bg-gray-800/50 p-6 rounded-lg shadow-2xl mb-12 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-white">Add a New Moon Fact</h2>
          <form onSubmit={handleCreateFact} className="space-y-4">
            <input
              type="text"
              placeholder="Fact Title (e.g., 'The Moon is Drifting Away')"
              value={newFact.title}
              onChange={(e) => setNewFact({...newFact, title: e.target.value})}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <textarea
              placeholder="Details about the fact..."
              value={newFact.details}
              onChange={(e) => setNewFact({...newFact, details: e.target.value})}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <select 
              value={newFact.category}
              onChange={(e) => setNewFact({...newFact, category: e.target.value})}
              className='w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none'
            >
              <option>Science</option>
              <option>Geology</option>
              <option>History</option>
              <option>Exploration</option>
              <option>Pop Culture</option>
            </select>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg shadow-blue-600/30">
              Submit Fact
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Community Facts</h2>
          {facts.length === 0 ? (
            <p className="text-gray-400 text-center py-10">No facts have been submitted yet. Be the first!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facts.map(fact => (
                <div key={fact.id} className="bg-gray-800/50 rounded-lg p-6 shadow-lg border border-gray-700 flex flex-col justify-between hover:border-blue-500 transition-colors">
                  <div>
                    <span className='inline-block bg-blue-500/20 text-blue-300 text-xs font-semibold px-2.5 py-1 rounded-full mb-3'>{fact.category}</span>
                    <h3 className="font-bold text-xl text-white mb-2">{fact.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{fact.details}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-700">Submitted by {fact.author?.name || 'Anonymous'}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
