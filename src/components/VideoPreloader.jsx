import { useVideo } from '../context/VideoContext';

const VideoPreloader = ({ children }) => {
  const { allVideosLoaded } = useVideo();

  if (!allVideosLoaded) {
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

          {/* Loading Message */}
          <div className="space-y-4">
            <p className="text-2xl font-bold text-white">Preparing Experience</p>
            <p className="text-lg text-blue-200">Loading portfolio content...</p>
            
            {/* Simple loading bar */}
            <div className="w-80 bg-gray-700 rounded-full h-3 mx-auto">
              <div className="bg-gradient-to-r from-yellow-400 to-blue-500 h-3 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default VideoPreloader;