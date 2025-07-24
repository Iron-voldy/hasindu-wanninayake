import { createContext, useContext, useState, useEffect } from 'react';

const VideoContext = createContext();

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};

export const VideoProvider = ({ children }) => {
  const [videoUrls] = useState({
    // Hero videos
    'hero-1': "https://res.cloudinary.com/dcu7jcmct/video/upload/v1753327859/hero-1_lidw3u.mp4",
    'hero-2': "https://res.cloudinary.com/dcu7jcmct/video/upload/v1753327831/hero-2_f01hrm.mp4",
    'hero-3': "https://res.cloudinary.com/dcu7jcmct/video/upload/v1753327936/hero-3_w9vukn.mp4",
    'hero-4': "https://res.cloudinary.com/dcu7jcmct/video/upload/v1753328012/hero-4_s9fzsf.mp4",
    'hero-5': "https://res.cloudinary.com/dcu7jcmct/video/upload/v1753327632/hero-5_nuke5r.mp4",
    'hero-6': "https://res.cloudinary.com/dcu7jcmct/video/upload/v1753327672/hero-6_klgyha.mp4",
    'hero-7': "https://res.cloudinary.com/dcu7jcmct/video/upload/v1753327637/hero-7_wuiqzh.mp4",
    // Feature videos
    'feature-1': "https://res.cloudinary.com/dcu7jcmct/video/upload/v1753327864/feature-1_v6hjjq.webm",
    'feature-2': "https://res.cloudinary.com/dcu7jcmct/video/upload/v1753328184/feature-2_qt2azq.mp4",
    'feature-3': "https://res.cloudinary.com/dcu7jcmct/video/upload/v1753328423/feature-3_mspoa4.mp4",
    'feature-4': "https://res.cloudinary.com/dcu7jcmct/video/upload/v1753328354/feature-4_gmlih6.mp4",
    'feature-5': "https://res.cloudinary.com/dcu7jcmct/video/upload/v1753327589/feature-5_dex7in.mp4"
  });

  const [preloadedVideos, setPreloadedVideos] = useState({});
  const [allVideosLoaded, setAllVideosLoaded] = useState(false);

  const getVideoUrl = (videoId) => {
    return videoUrls[videoId] || null;
  };

  const preloadAllVideos = async () => {
    console.log('Starting video preload...');
    const videoElements = {};
    let loadedCount = 0;
    const totalVideos = Object.keys(videoUrls).length;

    const loadVideo = (videoId, url) => {
      return new Promise((resolve) => {
        console.log(`Attempting to load ${videoId}: ${url}`);
        const video = document.createElement('video');
        video.preload = 'metadata'; // Changed from 'auto' to 'metadata' for faster loading
        video.muted = true;
        video.playsInline = true;
        video.crossOrigin = 'anonymous';
        
        const handleLoad = () => {
          loadedCount++;
          console.log(`✅ Loaded ${videoId}: ${loadedCount}/${totalVideos}`);
          videoElements[videoId] = video;
          resolve();
        };

        const handleError = (e) => {
          console.error(`❌ Failed to load ${videoId}:`, url, e);
          loadedCount++;
          resolve(); // Continue even if one video fails
        };

        const handleTimeout = () => {
          console.warn(`⏰ Timeout loading ${videoId}:`, url);
          loadedCount++;
          resolve();
        };

        video.addEventListener('loadedmetadata', handleLoad);
        video.addEventListener('error', handleError);
        video.addEventListener('abort', handleError);
        
        // Add timeout for individual videos
        const timeout = setTimeout(handleTimeout, 10000); // 10 second timeout per video
        
        video.addEventListener('loadedmetadata', () => clearTimeout(timeout));
        video.addEventListener('error', () => clearTimeout(timeout));
        
        video.src = url;
        video.load();
      });
    };

    try {
      // Load videos in smaller batches
      const batchSize = 2;
      for (let i = 0; i < Object.entries(videoUrls).length; i += batchSize) {
        const batch = Object.entries(videoUrls).slice(i, i + batchSize);
        console.log(`Loading batch ${Math.floor(i/batchSize) + 1}:`, batch.map(([id]) => id));
        await Promise.all(batch.map(([videoId, url]) => loadVideo(videoId, url)));
      }
      
      setPreloadedVideos(videoElements);
      setAllVideosLoaded(true);
      console.log('🎉 All videos preloaded successfully');
    } catch (error) {
      console.error('Error during video preloading:', error);
      setAllVideosLoaded(true); // Show content anyway
    }
  };

  useEffect(() => {
    preloadAllVideos();
    
    // Global fallback - show content after 15 seconds regardless
    const globalTimeout = setTimeout(() => {
      console.log('🚨 Global timeout reached - showing content anyway');
      setAllVideosLoaded(true);
    }, 15000);

    return () => clearTimeout(globalTimeout);
  }, []);

  return (
    <VideoContext.Provider value={{
      videoUrls,
      preloadedVideos,
      allVideosLoaded,
      getVideoUrl
    }}>
      {children}
    </VideoContext.Provider>
  );
};