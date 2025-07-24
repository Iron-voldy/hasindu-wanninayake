import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import VideoPreview from "./VideoPreview";

const TypingEffect = ({ text, delay = 150, startDelay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
      setShowCursor(true);
    }, startDelay);
    return () => clearTimeout(startTimeout);
  }, [startDelay]);

  useEffect(() => {
    if (started && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (started && currentIndex >= text.length) {
      // Hide cursor after typing is complete
      const hideTimeout = setTimeout(() => {
        setShowCursor(false);
      }, 1000);
      return () => clearTimeout(hideTimeout);
    }
  }, [currentIndex, text, delay, started]);

  return (
    <span>
      {displayedText}
      {showCursor && <span className="animate-pulse text-yellow-300">|</span>}
    </span>
  );
};

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4; // 4 hero videos available
  const nextVdRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => {
      const newCount = prev + 1;
      console.log(`Video loaded: ${newCount}/${totalVideos}`);
      return newCount;
    });
  };

  useEffect(() => {
    // Wait for at least 2 videos to load (main background video + preview video)
    if (loadedVideos >= 2) {
      setLoading(false);
    }
  }, [loadedVideos]);

  // Fallback timer to prevent infinite loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 15000); // 15 second fallback for production
    return () => clearTimeout(timer);
  }, []);

  const handleMiniVdClick = () => {
    setHasClicked(true);

    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVdRef.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getVideoSrc = (index) => {
    const videoUrls = {
      1: "https://res.cloudinary.com/dcu7jcmct/video/upload/v1753327859/hero-1_lidw3u.mp4",
      2: "https://res.cloudinary.com/dcu7jcmct/video/upload/v1753327831/hero-2_f01hrm.mp4",
      3: "https://res.cloudinary.com/dcu7jcmct/video/upload/v1753327936/hero-3_w9vukn.mp4",
      4: "https://res.cloudinary.com/dcu7jcmct/video/upload/v1753328012/hero-4_s9fzsf.mp4"
    };
    return videoUrls[index];
  };

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="flex flex-col items-center gap-6">
            {/* https://uiverse.io/G4b413l/tidy-walrus-92 */}
            <div className="three-body">
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600 mb-2">Preparing Experience</p>
              <p className="text-lg text-gray-600">Crafting something amazing for you...</p>
              <div className="w-64 bg-gray-200 rounded-full h-2 mt-4">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(loadedVideos / totalVideos) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                <video
                  ref={nextVdRef}
                  src={getVideoSrc((currentIndex % totalVideos) + 1)}
                  loop
                  muted
                  id="current-video"
                  className="size-64 origin-center scale-150 object-cover object-center"
                  onLoadedData={handleVideoLoad}
                  preload="metadata"
                />
              </div>
            </VideoPreview>
          </div>

          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
            preload="metadata"
          />
          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
            preload="metadata"
          />
        </div>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <div className="mb-6">
              <h1 className="special-font text-blue-100 uppercase font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
                Hasin<b>d</b>u
              </h1>
              <h2 className="special-font text-blue-100 uppercase font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 ml-2">
                Wanninayake
              </h2>
            </div>

            <div className="mb-8 max-w-2xl">
              <div className="text-blue-100 font-robert-regular leading-relaxed">
                <div className="mb-4 text-lg sm:text-xl md:text-2xl lg:text-3xl">
                  <TypingEffect text="Software Developer" delay={120} startDelay={500} />
                </div>
                <div className="text-white text-base sm:text-lg md:text-xl lg:text-2xl">
                  <TypingEffect text="Building Innovative Solutions" delay={100} startDelay={2500} />
                </div>
              </div>
            </div>

            <a
              href="https://hasindu-wanninayake.vercel.app/CV_Hasindu_Wanninayake.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                id="view-portfolio"
                title="View Portfolio"
                leftIcon={<TiLocationArrow />}
                containerClass="bg-yellow-300 flex-center gap-1 cursor-pointer"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
