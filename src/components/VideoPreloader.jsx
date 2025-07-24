import { useState, useEffect } from 'react';

const VideoPreloader = ({ onAllVideosLoaded, children }) => {
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [totalVideos] = useState(12); // Total videos across all components
  const [loading, setLoading] = useState(true);

  // All video URLs that need to be preloaded
  const videoUrls = [
    // Hero videos
    "https://res.cloudinary.com/dcu7jcmct/video/upload/v1753327859/hero-1_lidw3u.mp4",
    "https://res.cloudinary.com/dcu7jcmct/video/upload/v1753327831/hero-2_f01hrm.mp4",
    "https://res.cloudinary.com/dcu7jcmct/video/upload/v1753327936/hero-3_w9vukn.mp4",
    "https://res.cloudinary.com/dcu7jcmct/video/upload/v1753328012/hero-4_s9fzsf.mp4",
    // Story videos
    "https://res.cloudinary.com/dcu7jcmct/video/upload/v1753327632/hero-5_nuke5r.mp4",
    "https://res.cloudinary.com/dcu7jcmct/video/upload/v1753327672/hero-6_klgyha.mp4",
    "https://res.cloudinary.com/dcu7jcmct/video/upload/v1753327637/hero-7_wuiqzh.mp4",
    // Feature videos
    "https://res.cloudinary.com/dcu7jcmct/video/upload/v1753327864/feature-1_v6hjjq.webm",
    "https://res.cloudinary.com/dcu7jcmct/video/upload/v1753328184/feature-2_qt2azq.mp4",
    "https://res.cloudinary.com/dcu7jcmct/video/upload/v1753328423/feature-3_mspoa4.mp4",
    "https://res.cloudinary.com/dcu7jcmct/video/upload/v1753328354/feature-4_gmlih6.mp4",
    "https://res.cloudinary.com/dcu7jcmct/video/upload/v1753327589/feature-5_dex7in.mp4"
  ];

  useEffect(() => {
    const preloadVideos = async () => {
      let loadedCount = 0;
      
      const loadVideo = (url) => {
        return new Promise((resolve, reject) => {
          const video = document.createElement('video');
          video.preload = 'metadata';
          video.muted = true;
          
          video.onloadeddata = () => {
            loadedCount++;
            setLoadedVideos(loadedCount);
            console.log(`Video loaded: ${loadedCount}/${totalVideos} - ${url}`);
            resolve();
          };
          
          video.onerror = () => {
            console.error(`Failed to load video: ${url}`);
            loadedCount++;
            setLoadedVideos(loadedCount);
            resolve(); // Continue even if one video fails
          };
          
          video.ontimeout = () => {
            console.warn(`Video loading timeout: ${url}`);
            loadedCount++;
            setLoadedVideos(loadedCount);
            resolve();
          };
          
          video.src = url;
        });
      };

      // Load videos in batches of 3 for better performance
      for (let i = 0; i < videoUrls.length; i += 3) {
        const batch = videoUrls.slice(i, i + 3);
        await Promise.all(batch.map(loadVideo));
      }
      
      setLoading(false);
      if (onAllVideosLoaded) {
        onAllVideosLoaded();
      }
    };

    preloadVideos();

    // Fallback timeout - show content after 20 seconds regardless
    const fallbackTimer = setTimeout(() => {
      console.log('Fallback timeout reached - showing content');
      setLoading(false);
      if (onAllVideosLoaded) {
        onAllVideosLoaded();
      }
    }, 20000);

    return () => clearTimeout(fallbackTimer);
  }, [onAllVideosLoaded, totalVideos]);

  if (loading) {
    const progress = (loadedVideos / totalVideos) * 100;
    
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-black">
        <div className="text-center">
          {/* Animated Logo/Brand */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 animate-pulse">
              Hasin<span className="text-yellow-400">d</span>u
            </h1>
            <p className="text-xl text-blue-200">Software Developer</p>
          </div>

          {/* Loading Animation */}
          <div className="mb-6">
            <div className="flex justify-center space-x-1 mb-4">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>

          {/* Progress Info */}
          <div className="space-y-4">
            <p className="text-2xl font-bold text-white">Preparing Experience</p>
            <p className="text-lg text-blue-200">Loading portfolio content...</p>
            
            {/* Progress Bar */}
            <div className="w-80 bg-gray-700 rounded-full h-3 mx-auto">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            {/* Progress Text */}
            <p className="text-sm text-gray-300">
              {loadedVideos} of {totalVideos} assets loaded ({Math.round(progress)}%)
            </p>
          </div>

          {/* Loading Tips */}
          <div className="mt-8 text-xs text-gray-400 max-w-md mx-auto">
            <p className="animate-pulse">
              {progress < 30 && "Initializing portfolio..."}
              {progress >= 30 && progress < 60 && "Loading project videos..."}
              {progress >= 60 && progress < 90 && "Almost ready..."}
              {progress >= 90 && "Finalizing experience..."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default VideoPreloader;