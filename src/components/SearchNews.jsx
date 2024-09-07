import React, { useState } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem';
// Impor ikon search dari react-icons
import { FaSearch } from 'react-icons/fa';

function SearchNews({ darkMode }) {
    const [query, setQuery] = useState('');
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchNews = () => {
        setIsLoading(true);
        setError('');
        const API_KEY = 'f8dd2b30bf734c90a0d67b2c5449d1ee';
        const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${API_KEY}`;

        axios.get(url)
            .then(response => {
                setArticles(response.data.articles);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching news:', error);
                setError('Failed to load news, please try again.');
                setIsLoading(false);
            });
    };

    return (
        <div className="mb-8">
            <div className="flex mb-4 relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search news..."
                    className={`flex-grow px-4 py-2 pr-12 border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white text-black'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                />
                <button 
                    onClick={fetchNews} 
                    className={`absolute right-0 top-0 h-full px-4 ${darkMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-r-md transition-all duration-300 transform hover:scale-105`}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    ) : (
                        <FaSearch className="text-xl" />
                    )}
                </button>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {articles.map(article => (
                    <NewsItem key={article.url} {...article} darkMode={darkMode} />
                ))}
            </div>
        </div>
    );
}

export default SearchNews;
