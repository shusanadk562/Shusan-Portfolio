import { useState, useEffect } from "react";
import IntroAnimation from "./components/IntroAnimation";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Launcher from "./components/Launcher";
import MusicPlayer from "./components/MusicPlayer";

export default function App() {
  const [isLaunched, setIsLaunched] = useState(false);
  const [withMusic, setWithMusic] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  const startApp = (musicChoice) => {
    setWithMusic(musicChoice);
    setIsLaunched(true);
  };

  if (!isLaunched) {
    return <Launcher onLaunch={startApp} />;
  }

  return (
    <div className="relative min-h-screen bg-[#1a1a1a] text-white">
      <CustomCursor />
      <MusicPlayer autoStart={withMusic} />

      {/* 
          OVERLAY LAYER: 
          IntroAnimation lai 'fixed' rakhera pointer-events-none garne 
          jaba yo sakinchha. 
      */}
      {!introDone && (
        <div className="fixed inset-0 z-[9999] bg-[#1a1a1a]">
          <IntroAnimation onFinish={() => setIntroDone(true)} />
        </div>
      )}

      {/* 
          PORTFOLIO LAYER:
          Yaslai 'opacity-0' haina, 'z-index' ra 'visibility' le control garne.
          Invisible rakheni background ma yo 'ready' obastha ma hunchha.
      */}
      <div className={`transition-opacity duration-1000 ${introDone ? "opacity-100" : "opacity-0"}`}>
        <Navbar />
        {/* Pointer events disable garne jaba samma intro done hudaina */}
        <main className={introDone ? "pointer-events-auto" : "pointer-events-none"}>
          <Home introDone={introDone} />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Testimonials />
          <Contact />
          <Footer />
        </main>
      </div>
    </div>
  );
}