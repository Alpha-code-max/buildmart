// components/LoadingBar.tsx
import React, { useEffect, useState } from 'react';

const LoadingBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 15); // Speed of animation

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-2 bg-gray-200 rounded mt-5">
      <div
        className="h-full bg-blue-500 rounded transition-all duration-100 ease-linear"
        style={{ width: `${progress}%` }}
      />
      <h1 className='text-blue-500 text-3xl text-center'>{progress}%</h1>
    </div>
  );
};

export default LoadingBar;
