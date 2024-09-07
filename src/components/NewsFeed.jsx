import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import { motion } from 'framer-motion';

function NewsFeed({ source, darkMode }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const url = `https://newsapi.org/v2/top-headlines?sources=${encodeURIComponent(source)}&apiKey=f8dd2b30bf734c90a0d67b2c5449d1ee`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setError('Failed to load news. Please try again later.');
        setIsLoading(false);
      });
  }, [source]);

  if (isLoading) return <div className="text-center">Loading news...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <motion.div 
      className={`grid grid-cols-1 md:grid-cols-2 gap-4`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      {articles.map((article, index) => (
        <motion.div
          key={article.url}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <NewsItem {...article} darkMode={darkMode} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default NewsFeed;