import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { useVideo } from "../context/VideoContext";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <div className="bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2 mb-4 inline-block">
            <h1 className="text-2xl md:text-4xl font-semibold text-white font-sans tracking-wide">
              {title}
            </h1>
          </div>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base text-white/90 drop-shadow-md">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => {
  const { getVideoUrl } = useVideo();
  
  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular-web text-3xl md:text-4xl font-bold text-blue-50 mb-4">
            My Projects
          </p>
          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            Showcase of innovative projects spanning IoT systems, healthcare applications, 
            e-commerce platforms, and modern web technologies.
          </p>
        </div>

        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src={getVideoUrl('feature-1')}
            title="IoT Piano Visualizer"
            description="Interactive piano learning tool with ESP32, RGB LEDs, and web application. Features tutorial and play modes with real-time LED guidance. (June 2024 – Nov 2024)"
          />
        </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src={getVideoUrl('feature-2')}
            title="Ravana Health Care Application"
            description="Hospital management system with QR scanning, medicine tracking, report management, and role-based authentication. Technologies: Java, QR Code, Database Management (Feb 2023 – April 2023)"
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src={getVideoUrl('feature-3')}
            title="Diatel AI Chat Application"
            description="AI-powered chatbot application built with PHP, web technologies, and wit.ai integration for intelligent conversational experiences. (June 2023)"
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src={getVideoUrl('feature-4')}
            title="Hotel Table Reservation System"
            description="Java-based hotel table booking system with QR Code functionality, database management, and web development technologies. (Feb 2025 – March 2025)"
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <BentoCard
            src={getVideoUrl('feature-5')}
            title="Fuel Management System"
            description="MERN stack application for fuel management with React frontend, MongoDB database, Node.js/Express.js backend, and PDF generation capabilities. (Feb 2025 – March 2025)"
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-gradient-to-br from-blue-600 to-purple-700 p-5">
            <div className="bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2 mb-4 inline-block">
              <h1 className="text-xl md:text-3xl font-semibold text-white font-sans tracking-wide">
                View More Projects
              </h1>
            </div>
            <div className="flex flex-col space-y-2 text-white/90 text-sm">
              <a href="https://github.com/Iron-voldy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                → GitHub Portfolio
              </a>
              <p className="text-xs text-white/70">15+ projects and counting...</p>
            </div>
            <TiLocationArrow className="m-5 scale-[5] self-end text-white/80" />
          </div>
        </BentoTilt>
      </div>
    </div>
  </section>
  );
};

export default Features;
