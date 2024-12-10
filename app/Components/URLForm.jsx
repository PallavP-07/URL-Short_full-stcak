"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import GeneratedData from './GeneratedData';
const URLForm = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [shortURL, setShortURL] = useState('')
  const[totalURl,setTotalURl]=useState('')
  const router = useRouter();

  // Regex pattern to validate a URL
  const isValidURL = (url) => {
    const pattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return pattern.test(url);
  };

  const handleClick = async () => {
    if (!isValidURL(value)) {
      setError('Please enter a valid URL.');
    } else {
      setError('');

      // Prepare the data to send to the backend
      const newPost = { title: value };

      try {
        // Send the URL to the backend to handle shortening
        const res = await fetch('/api/UrlShortner', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPost),
        });

        if (res.ok) {
          const data = await res.json();
          setShortURL(data.data.shortUrl);
          setValue('');
          router.push('/'); // Redirect to home or any other page
        } else {
          // Handle any errors returned by the backend
          setError('Error shortening URL. Please try again.');
        }
      } catch (error) {
        // Handle network or other unexpected errors
        setError('An error occurred. Please try again later.');
      }
    }
  };
  return (
    <div className="flex flex-col justify-center  items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Please enter your URL"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleClick}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          URL Shortener
        </button>
        {error && (
          <p className="mt-2 text-red-500 text-sm">{error}</p>
        )}
      </div>
      <p>{totalURl}</p>
      {shortURL ? <GeneratedData shortUrl={shortURL}
      /> : null}

    </div>
  );
};

export default URLForm;
