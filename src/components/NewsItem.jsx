import React from 'react';
import { motion } from 'framer-motion';

function NewsItem({ title, description, url, urlToImage, darkMode }) {
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
    e.target.alt = 'No image available';
  };

  return (
    <motion.div 
      className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md rounded-lg overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <img 
        src={urlToImage || 'https://via.placeholder.com/300x200?text=No+Image'} 
        alt={title} 
        onError={handleImageError} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className={`font-bold text-lg mb-2 line-clamp-2 ${darkMode ? 'text-white' : 'text-black'}`}>{title}</h3>
        <p className={`text-sm mb-4 line-clamp-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
        <motion.a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`inline-block ${darkMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white text-sm py-2 px-4 rounded`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Read More
        </motion.a>
      </div>
    </motion.div>
  );
}

export default NewsItem;
