import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem';

function NewsByLocation({ country, language, darkMode }) {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const API_KEY = 'f8dd2b30bf734c90a0d67b2c5449d1ee';
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&language=${language}&apiKey=${API_KEY}`;

        axios.get(url)
            .then(response => {
                console.log('API response:', response.data);
                setArticles(response.data.articles.slice(0, 5));
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Failed to load local news. Please try again later.');
                setIsLoading(false);
            });
        
        console.log('Fetching news for country:', country, 'language:', language);
        console.log('Articles:', articles);
    }, [country, language]);

    if (isLoading) return <div className="text-center">Loading local news...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;
    if (articles.length === 0) return <div className="text-center">No local news available at the moment.</div>;

    return (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md rounded-lg p-4`}>
            <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>Local News</h2>
            <div className="space-y-4">
                {articles.map(article => (
                    <NewsItem key={article.url} {...article} darkMode={darkMode} />
                ))}
            </div>
        </div>
    );  
}

export default NewsByLocation;
