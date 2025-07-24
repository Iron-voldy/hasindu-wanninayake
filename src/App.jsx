import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import VideoPreloader from "./components/VideoPreloader";
import { VideoProvider } from "./context/VideoContext";

function App() {
  return (
    <VideoProvider>
      <VideoPreloader>
        <main className="relative min-h-screen w-screen overflow-x-hidden">
          <NavBar />
          <Hero />
          <About />
          <Features />
          <Story />
          <Contact />
          <Footer />
        </main>
      </VideoPreloader>
    </VideoProvider>
  );
}

export default App;
