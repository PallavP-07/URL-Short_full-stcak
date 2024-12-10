"use client";
import React, { useState, useEffect, useRef } from "react";
import QRCode from "react-qr-code";

const GeneratedData = ({ shortUrl }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [totalUrl, setTotalUrl] = useState(0);

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3000/api/fetchData/${shortUrl}`);
    setIsCopied(true);

    // Reset the "Copied" status after 2 seconds
    setTimeout(() => setIsCopied(false), 2000);
  };

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/getCount");
        if (response.ok) {
          const data = await response.json();
          setTotalUrl(data.totalUrls);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCount();
  }, []);


  return (
    <div className="p-4 bg-white rounded-md shadow-md max-w-md mx-auto mt-8">
      <h2 className="text-lg font-semibold mb-2 text-gray-800">Your Short URL</h2>
      <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-md">
        <p className="text-blue-600 font-semibold truncate">
          {`http://localhost:3000/api/fetchData/${shortUrl}`}
        </p>
        <button
          onClick={handleCopy}
          className="ml-4 bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {isCopied ? "Copied!" : "Copy"}
        </button>
      </div>
      {isCopied && (
        <p className="text-green-600 text-sm mt-2">Link copied to clipboard!</p>
      )}
      {totalUrl ? (
        <p className="text-violet-800 font-medium mt-4">Total URLs Shortened: {totalUrl}</p>
      ) : null}

      {/* QR Code Button */}
      <button
        onClick={() => setShowQR(!showQR)}
        className="mt-4 bg-gray-800 text-white py-1 px-3 rounded-md hover:bg-gray-900 transition duration-200"
      >
        {showQR ? "Hide QR Code" : "Generate QR Code"}
      </button>

      {/* QR Code Canvas */}
      {showQR && (
        <div className="mt-4 flex justify-center">

          <QRCode
          
            size={256}
         
            className="h-full w-[150px] border-gray-500 border-2 p-2 rounded-md"
            value={`http://localhost:3000/api/fetchData/${shortUrl}`}
            viewBox={`0 0 256 256`}
          />

        </div>
      )}
     
    </div>
  );
};

export default GeneratedData;
