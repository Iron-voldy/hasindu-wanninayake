import { useState, useRef, useEffect } from 'react';

const CloudinaryVideo = ({ 
  publicId, 
  className = "", 
  autoPlay = false, 
  loop = false, 
  muted = true,
  onLoadedData,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef(null);

  // Your Cloudinary cloud name
  const CLOUD_NAME = "dcu7jcmct";

  // Cloudinary video URL with optimizations
  const getVideoUrl = (publicId) => {
    return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_auto/${publicId}.mp4`;
  };

  const handleLoadedData = () => {
    setIsLoaded(true);
    if (onLoadedData) {
      onLoadedData();
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video && autoPlay && isLoaded) {
      video.play().catch(console.error);
    }
  }, [autoPlay, isLoaded]);

  return (
    <div className="relative">
      {!isLoaded && (
        <div className={`absolute inset-0 bg-gray-200 animate-pulse ${className}`}>
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}
      <video
        ref={videoRef}
        src={getVideoUrl(publicId)}
        className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        onLoadedData={handleLoadedData}
        preload="metadata"
        {...props}
      />
    </div>
  );
};

export default CloudinaryVideo;