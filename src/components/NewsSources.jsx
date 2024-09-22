import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiKey = import.meta.env.VITE_NEWS_API_KEY;

function NewsSources({ onSourceChange, darkMode }) {
    const [sources, setSources] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const url = `https://newsapi.org/v2/sources?apiKey=${apiKey}`;

        axios.get(url)
            .then(response => {
                setSources(response.data.sources);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching sources:', error);
                setError('Failed to load news sources. Please try again later.');
                setIsLoading(false);
            });
    }, []);

    if (isLoading) return <div className="text-center">Loading news sources...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md rounded-lg p-4`}>
            <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>News Sources</h2>
            <select 
                onChange={(e) => onSourceChange(e.target.value)}
                className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-gray-500 bg-gray-800 text-white' : 'focus:ring-blue-500'}`}
            >
                {sources.map(source => (
                    <option key={source.id} value={source.id} className={`${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        {source.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default NewsSources;
