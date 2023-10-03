import React, { createContext, useContext, useState } from 'react';

import axios from 'axios';

const ResultContext = createContext();

const baseUrl = 'https://transvidweb-api-translate-web-video-image-search.p.rapidapi.com'

export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('Bitcoin');

    const getResults = async (type) => {
        setIsLoading(true);

        const response = await axios.request({
            method: 'POST',
            url: `${baseUrl}${type}`,
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
                'X-RapidAPI-Host': 'transvidweb-api-translate-web-video-image-search.p.rapidapi.com'
            },
            data: {
                text: searchTerm,
                safesearch: 'off',
                timelimit: '',
                region: 'wt-wt',
                color: '',
                size: 'small',
                type_image: '',
                layout: '',
                duration: '',
                resolution: ''
            }
        });

        setResults(response.data);

        setIsLoading(false);

    }

    return (
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
            {children}
        </ResultContext.Provider>
    )

}

export const useResultContext = () => useContext(ResultContext);

