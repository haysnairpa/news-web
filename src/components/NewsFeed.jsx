import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import { motion } from 'framer-motion';

const apiKey = import.meta.env.VITE_NEWS_API_KEY;

function NewsFeed({ source, darkMode }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const url = `https://newsapi.org/v2/top-headlines?sources=${encodeURIComponent(source)}&apiKey=${apiKey}`;
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
    <div>
      {data && data.length > 0 ? data.map(item => (
        <motion.div
          key={item.url}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <NewsItem {...item} darkMode={darkMode} />
        </motion.div>
      )) : <p>Memuat data...</p>}
    </div>
  );
}

export default NewsFeed;