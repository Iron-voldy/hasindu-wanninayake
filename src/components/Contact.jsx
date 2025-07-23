import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} />
  </div>
);

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen  px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="/img/contact-1.webp"
            clipClass="contact-clip-path-1"
          />
          <ImageClipBox
            src="/img/contact-2.webp"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>

        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src="/img/swordman-partial.webp"
            clipClass="absolute md:scale-125"
          />
          <ImageClipBox
            src="/img/swordman.webp"
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase">
            Get In Touch
          </p>

          <div style={{
            textShadow: '4px 4px 8px rgba(0,0,0,1), 0 0 25px rgba(0,0,0,1), 8px 8px 16px rgba(0,0,0,0.8), 2px 2px 4px rgba(0,0,0,1)'
          }}>
            <AnimatedTitle
              title="let&#39;s w<b>o</b>rk <br /> t<b>o</b>gether on your <br /> n<b>e</b>xt pr<b>o</b>ject."
              className="special-font !md:text-[2.5rem] w-full font-zentry !text-xl !font-light !leading-[.9] [&_.animated-word]:!font-light"
            />
          </div>

          <div className="mt-10 flex flex-col items-center gap-4">
            <a href="mailto:hasindutwm@gmail.com" className="text-blue-50 hover:text-yellow-300 transition-colors">
              hasindutwm@gmail.com
            </a>
            <p className="text-blue-50">+94 77 9393662</p>
            <div className="flex gap-4 mt-4">
              <a href="https://www.linkedin.com/in/hasindu-wanninayake-1ab155276/" target="_blank" rel="noopener noreferrer" className="text-blue-50 hover:text-yellow-300 transition-colors">
                LinkedIn
              </a>
              <a href="https://github.com/Iron-voldy" target="_blank" rel="noopener noreferrer" className="text-blue-50 hover:text-yellow-300 transition-colors">
                GitHub
              </a>
              <a href="https://hasindu-theekshana-theta.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-50 hover:text-yellow-300 transition-colors">
                Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
