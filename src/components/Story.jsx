import gsap from "gsap";
import { useRef } from "react";

import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

const FloatingImage = () => {
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };

  return (
    <div id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[10px]">
          My Journey in Technology
        </p>

        <div className="relative size-full">
          <div 
            className="mt-5 pointer-events-none relative z-10"
            style={{
              textShadow: '3px 3px 6px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.8), 6px 6px 12px rgba(0,0,0,0.6)'
            }}
          >
            <AnimatedTitle
              title="From St<b>u</b>dent to <br /> Software <b>E</b>ngineer"
              containerClass="!text-white [&_.animated-word]:!font-medium"
            />
          </div>

          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  ref={frameRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  src="/img/entrance.webp"
                  alt="entrance.webp"
                  className="object-contain"
                />
              </div>
            </div>

            {/* for the rounded corner */}
            <svg
              className="invisible absolute size-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="8"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite
                    in="SourceGraphic"
                    in2="flt_tag"
                    operator="atop"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start max-w-lg">
            <p className="mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start mb-6">
              With dual bachelor's degrees and hands-on experience in various technologies,
              I've evolved from a curious student to a passionate software engineer,
              leading projects and building innovative solutions.
            </p>

            <a
              href="https://hasindu-wanninayake.vercel.app/CV_Hasindu_Wanninayake.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 mb-8"
            >
              <Button
                id="journey-btn"
                title="View Full Resume"
                containerClass="cursor-pointer"
              />
            </a>
          </div>
        </div>

      </div>

      {/* Work Experience Cards - Below the image section */}
      <div className="bg-black py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-white font-bold text-2xl text-center mb-12">Professional Journey</h3>
          
          <div className="space-y-8">
            {/* Current Role - Centered Large Card */}
            <div className="flex justify-center">
              <div className="relative h-48 w-full max-w-2xl overflow-hidden rounded-md border border-white/20">
                <video
                  src="https://res.cloudinary.com/dcu7jcmct/video/upload/v1753327637/hero-7_wuiqzh.mp4"
                  loop
                  muted
                  autoPlay
                  className="absolute left-0 top-0 size-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
                  <div>
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2 mb-4 inline-block">
                      <h1 className="text-xl md:text-2xl font-semibold text-white font-sans tracking-wide">
                        Tutor at Destiny Lab
                      </h1>
                    </div>
                    <p className="mt-3 max-w-64 text-xs md:text-base text-white/90 drop-shadow-md">
                      Teaching Java, web development, and mobile app development to aspiring developers. (2022 - Present)
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium">CURRENT ROLE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Roles - Left and Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Recent Role */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative h-40 w-full max-w-md overflow-hidden rounded-md border border-white/20">
                  <video
                    src="https://res.cloudinary.com/dcu7jcmct/video/upload/v1753327632/hero-5_nuke5r.mp4"
                    loop
                    muted
                    autoPlay
                    className="absolute left-0 top-0 size-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-black/50"></div>
                  <div className="relative z-10 flex size-full flex-col justify-between p-4 text-blue-50">
                    <div>
                      <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1 mb-3 inline-block">
                        <h1 className="text-lg font-semibold text-white font-sans tracking-wide">
                          Junior Software Developer
                        </h1>
                      </div>
                      <p className="text-xs text-white/90 drop-shadow-md">
                        Xsoftus (Contract) • Developed websites and software solutions (2024)
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">CONTRACT</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - First Role */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative h-40 w-full max-w-md overflow-hidden rounded-md border border-white/20">
                  <video
                    src="https://res.cloudinary.com/dcu7jcmct/video/upload/v1753327672/hero-6_klgyha.mp4"
                    loop
                    muted
                    autoPlay
                    className="absolute left-0 top-0 size-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-black/50"></div>
                  <div className="relative z-10 flex size-full flex-col justify-between p-4 text-blue-50">
                    <div>
                      <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1 mb-3 inline-block">
                        <h1 className="text-lg font-semibold text-white font-sans tracking-wide">
                          Software Development Intern
                        </h1>
                      </div>
                      <p className="text-xs text-white/90 drop-shadow-md">
                        Sysoft Developers • Built client websites and software solutions (May 2022 - Oct 2022)
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-teal-500 text-white text-xs px-2 py-1 rounded-full font-medium">INTERNSHIP</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingImage;
