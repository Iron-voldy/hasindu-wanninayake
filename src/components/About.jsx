import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen bg-gray-50">
      {/* Header Section */}
      <div className="relative pt-24 pb-12 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px] text-gray-600">
          About Me
        </p>

        <AnimatedTitle
          title="Passionate <b>S</b>oftware <br /> Developer & <b>I</b>nnovator"
          containerClass="mt-5 !text-black text-center [&_.animated-word]:!font-medium"
        />

        <div className="max-w-4xl px-6 text-center">
          <p className="text-xl font-medium text-gray-800 mb-4">Building the future with innovative software solutions</p>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            I am a passionate software engineer with experience in full-stack web applications, 
            mobile apps, and IoT systems. As a project leader, I have successfully managed and 
            developed various applications, contributing to dynamic and challenging projects.
          </p>
        </div>
      </div>

      {/* Image Clip Section with Content Overlay */}
      <div className="h-dvh w-screen relative" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/about.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
        
        {/* Top Section - Education */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-full max-w-md z-30">
          <div className="bg-white/95 backdrop-blur-sm shadow-lg rounded-xl p-6 border border-gray-200 mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-6 bg-blue-500 rounded mr-3"></span>
              Education
            </h3>
            <div className="space-y-4">
              <div className="border-l-2 border-blue-200 pl-3">
                <h4 className="font-semibold text-gray-800">BSc (Hons) in Information Technology</h4>
                <p className="text-blue-600 text-sm font-medium">Sri Lanka Institute of Information Technology (SLIIT)</p>
                <p className="text-gray-500 text-xs">2024 - Present | GPA: 3.25</p>
              </div>
              <div className="border-l-2 border-blue-200 pl-3">
                <h4 className="font-semibold text-gray-800">BEng (Hons) in Software Engineering</h4>
                <p className="text-blue-600 text-sm font-medium">IIC University</p>
                <p className="text-gray-500 text-xs">2022 - 2025</p>
              </div>
              <div className="border-l-2 border-blue-200 pl-3">
                <h4 className="font-semibold text-gray-800">Advanced Level Education</h4>
                <p className="text-blue-600 text-sm font-medium">St. Joseph's College - Anuradhapura</p>
                <p className="text-gray-500 text-xs">Mathematics Stream | 3Cs</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Left Section - Experience */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 w-full max-w-sm z-30 hidden lg:block">
          <div className="bg-white/95 backdrop-blur-sm shadow-lg rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-6 bg-green-500 rounded mr-3"></span>
              Experience
            </h3>
            <div className="space-y-4">
              <div className="border-l-2 border-green-200 pl-3">
                <h4 className="font-semibold text-gray-800">Tutor at Destiny Lab</h4>
                <p className="text-green-600 text-sm font-medium">2022 - Present</p>
                <p className="text-gray-600 text-xs">Teaching Java, web development, and mobile app development</p>
              </div>
              <div className="border-l-2 border-green-200 pl-3">
                <h4 className="font-semibold text-gray-800">Junior Software Developer</h4>
                <p className="text-green-600 text-sm font-medium">Xsoftus (Contract) | 2024</p>
                <p className="text-gray-600 text-xs">Developed websites and software solutions</p>
              </div>
              <div className="border-l-2 border-green-200 pl-3">
                <h4 className="font-semibold text-gray-800">Software Development Intern</h4>
                <p className="text-green-600 text-sm font-medium">Sysoft Developers | May 2022 - Oct 2022</p>
                <p className="text-gray-600 text-xs">Built client websites and software solutions</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Section - Achievements */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-full max-w-sm z-30 hidden lg:block">
          <div className="bg-white/95 backdrop-blur-sm shadow-lg rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-6 bg-yellow-500 rounded mr-3"></span>
              Achievements
            </h3>
            <div className="space-y-4">
              <div className="border-l-2 border-yellow-200 pl-3">
                <h4 className="font-semibold text-gray-800">Robotics & Innovation Competition</h4>
                <p className="text-yellow-600 text-sm font-medium">1st Place (Maho Zone) - 2024 & 2025</p>
                <p className="text-yellow-600 text-sm font-medium">2nd & 3rd Place - 2025</p>
                <p className="text-gray-600 text-xs">Most Awarded School - Makalanegama</p>
              </div>
              <div className="border-l-2 border-yellow-200 pl-3">
                <h4 className="font-semibold text-gray-800">Young Computer Scientist</h4>
                <p className="text-yellow-600 text-sm font-medium">Merit Award - 2024</p>
              </div>
              <div className="border-l-2 border-yellow-200 pl-3">
                <h4 className="font-semibold text-gray-800">Certifications</h4>
                <p className="text-yellow-600 text-sm font-medium">SLIIT Codefest Merit Award</p>
                <p className="text-gray-600 text-xs">Java Game Development (2017-2018)</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile View - Bottom sections */}
        <div className="absolute bottom-8 left-4 right-4 z-30 lg:hidden">
          <div className="grid grid-cols-1 gap-4">
            {/* Experience Mobile */}
            <div className="bg-white/95 backdrop-blur-sm shadow-lg rounded-xl p-4 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <span className="w-2 h-5 bg-green-500 rounded mr-2"></span>
                Experience
              </h3>
              <div className="space-y-3">
                <div className="border-l-2 border-green-200 pl-2">
                  <h4 className="font-semibold text-gray-800 text-sm">Tutor at Destiny Lab</h4>
                  <p className="text-green-600 text-xs font-medium">2022 - Present</p>
                </div>
                <div className="border-l-2 border-green-200 pl-2">
                  <h4 className="font-semibold text-gray-800 text-sm">Junior Software Developer</h4>
                  <p className="text-green-600 text-xs font-medium">Xsoftus (Contract) | 2024</p>
                </div>
              </div>
            </div>
            
            {/* Achievements Mobile */}
            <div className="bg-white/95 backdrop-blur-sm shadow-lg rounded-xl p-4 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <span className="w-2 h-5 bg-yellow-500 rounded mr-2"></span>
                Achievements
              </h3>
              <div className="space-y-3">
                <div className="border-l-2 border-yellow-200 pl-2">
                  <h4 className="font-semibold text-gray-800 text-sm">Robotics & Innovation Competition</h4>
                  <p className="text-yellow-600 text-xs font-medium">1st Place (Maho Zone) - 2024 & 2025</p>
                </div>
                <div className="border-l-2 border-yellow-200 pl-2">
                  <h4 className="font-semibold text-gray-800 text-sm">Young Computer Scientist</h4>
                  <p className="text-yellow-600 text-xs font-medium">Merit Award - 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
