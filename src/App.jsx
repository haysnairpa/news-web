import React, { useState } from 'react';
import NewsFeed from './components/NewsFeed';
import SearchNews from './components/SearchNews';
import NewsByLocation from './components/NewsByLocation';
import NewsHistory from './components/NewsHistory';
import NewsSources from './components/NewsSources';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

function App() {
  const [source, setSource] = useState('bbc-news');
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <motion.div 
      className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}
      initial={false}
      animate={{ backgroundColor: darkMode ? '#111827' : '#F3F4F6' }}
      transition={{ duration: 0.5 }}
    >
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-blue-600'} text-white p-4 shadow-md transition-colors duration-500`}>
        <div className="container mx-auto flex justify-between items-center">
          <motion.h1 
            className="text-3xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            UpNews
          </motion.h1>
          <motion.button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-500 hover:bg-blue-400'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              initial={false}
              animate={{ rotate: darkMode ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {darkMode ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-gray-200" />}
            </motion.div>
          </motion.button>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <SearchNews darkMode={darkMode} />
            <NewsFeed source={source} darkMode={darkMode} />
          </div>
          <div className="space-y-8">
            <NewsByLocation country="id" language="id" darkMode={darkMode} />
            <NewsHistory from="2023-01-01" to="2023-01-31" darkMode={darkMode} />
            <NewsSources onSourceChange={setSource} darkMode={darkMode} />
          </div>
        </div>
      </main>
    </motion.div>
  );
}

export default App;
