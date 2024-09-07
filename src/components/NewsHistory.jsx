import React, { useState } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem';

function NewsHistory({ from, to, darkMode }) {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchNews = async () => {
        try {
            setIsLoading(true);
            setError('');
            const API_KEY = 'f8dd2b30bf734c90a0d67b2c5449d1ee';
            const url = `https://newsapi.org/v2/everything?q=world&from=${from}&to=${to}&apiKey=${API_KEY}`;

            const response = await axios.get(url);
            setArticles(response.data.articles.slice(0, 5));
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching news:', error.response || error);
            setError('Failed to load news history. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md rounded-lg p-4`}>
            <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>News History</h2>
            <button 
                onClick={fetchNews} 
                className={`mb-4 px-4 py-2 rounded-md text-white ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
                disabled={isLoading}
            >
                {isLoading ? 'Loading...' : 'Show News History'}
            </button>
            {error && <p className={`text-red-500 mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>{error}</p>}
            <div className="space-y-4">
                {articles.map(article => (
                    <NewsItem key={article.url} {...article} />
                ))}
            </div>
        </div>
    );
}

export default NewsHistory;
