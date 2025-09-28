import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import config from './constants';
import './index.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [moonFacts, setMoonFacts] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [backendConnected, setBackendConnected] = useState(false);

  const manifest = new Manifest({ baseURL: config.BACKEND_URL, appId: config.APP_ID });

  useEffect(() => {
    const checkBackendAndSession = async () => {
      console.log('🚀 [APP] Starting backend connection test...');
      try {
        const response = await fetch(`${config.BACKEND_URL}/api/health`);
        if (response.ok) {
          setBackendConnected(true);
          console.log('✅ [APP] Backend connection successful.');
          const user = await manifest.from('User').me().catch(() => null);
          if (user) {
            setCurrentUser(user);
            setCurrentScreen('dashboard');
          }
        } else {
          setBackendConnected(false);
          console.error('❌ [APP] Backend connection failed - status:', response.status);
        }
      } catch (error) {
        setBackendConnected(false);
        console.error('❌ [APP] Backend connection failed - error:', error.message);
      }
    };

    checkBackendAndSession();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await manifest.login(email, password);
      const user = await manifest.from('User').me();
      setCurrentUser(user);
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    await manifest.logout();
    setCurrentUser(null);
    setCurrentScreen('landing');
  };

  const loadMoonFacts = async () => {
    try {
      const response = await manifest.from('MoonFact').find({ 
        include: ['author'],
        sort: { createdAt: 'desc' }
      });
      setMoonFacts(response.data);
    } catch (error) {
      console.error('Failed to load moon facts:', error);
    }
  };

  const createMoonFact = async (factData) => {
    try {
      const newFact = await manifest.from('MoonFact').create(factData);
      // Refetch facts to get the author data included
      loadMoonFacts();
    } catch (error) {
      console.error('Failed to create moon fact:', error);
      alert('Failed to create fact. Please check the form and try again.');
    }
  };

  return (
    <div className='font-sans bg-gray-900 text-white'>
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className="text-xs text-gray-300">{backendConnected ? 'Connected' : 'Disconnected'}</span>
      </div>

      {currentScreen === 'landing' || !currentUser ? (
        <LandingPage onLogin={handleLogin} />
      ) : (
        <DashboardPage 
          user={currentUser} 
          facts={moonFacts} 
          onLogout={handleLogout} 
          onLoadFacts={loadMoonFacts}
          onCreateFact={createMoonFact}
        />
      )}
    </div>
  );
}

export default App;
