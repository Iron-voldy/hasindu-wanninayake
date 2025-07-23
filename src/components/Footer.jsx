import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";

const socialLinks = [
  { href: "https://www.linkedin.com/in/hasindu-wanninayake-1ab155276/", icon: <FaLinkedin /> },
  { href: "https://github.com/Iron-voldy", icon: <FaGithub /> },
  { href: "mailto:hasindutwm@gmail.com", icon: <FaEnvelope /> },
  { href: "tel:+94779393662", icon: <FaPhone /> },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-[#5542ff] py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left">
          ©Hasindu Wanninayake 2025. All rights reserved
        </p>

        <div className="flex justify-center gap-4  md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-colors duration-500 ease-in-out hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a
          href="https://hasindu-theekshana-theta.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-center text-sm font-light hover:underline md:text-right"
        >
          View Full Portfolio
        </a>
      </div>
    </footer>
  );
};

export default Footer;
