import { useState, useEffect } from 'react';

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching URL:', url);
        console.log('Fetch options:', options);
        
        const response = await fetch(url, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
        });

        console.log('Response status:', response.status);
        
        if (!response.ok) {
          // Get error details from response
          const errorBody = await response.text();
          console.error('Error response:', errorBody);
          throw new Error(`HTTP error! status: ${response.status}, details: ${errorBody}`);
        }

        const result = await response.json();
        console.log('Fetch result:', result);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, JSON.stringify(options)]); // Add options to dependency array

  return { data, loading, error };
};