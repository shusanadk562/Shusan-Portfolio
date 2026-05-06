import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

export default function IntroAnimation({ onFinish }) {
  const greetings = ["Hello", "नमस्ते", "مرحبا"];
  const [index, setIndex] = useState(0);
  const overlayRef = useRef(null);
  const greetingRef = useRef(null);

  useEffect(() => {
    let greetingTimer;

    if (index < greetings.length - 1) {
      gsap.fromTo(
        greetingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.12 }
      );
      greetingTimer = setTimeout(() => setIndex(i => i + 1), 180);
    } else {
      // अन्तिम ग्रिटिङको एनिमेसन
      gsap.fromTo(
        greetingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.12 }
      );

      greetingTimer = setTimeout(() => {
        const tl = gsap.timeline({
          onStart: () => {
            // यहाँ setTimeout हटाएर सिधै कल नगर्ने, तलको logic प्रयोग गर्ने
          },
          onComplete: () => {
            // एनिमेसन पूर्ण रूपमा सकिएपछि मात्र cleanup गर्ने
          }
        });

        tl.to([overlayRef.current, greetingRef.current], {
          duration: 1.4, // अलि स्मूथ बनाउन समय बढाएको
          y: "-100vh",
          ease: "power4.inOut",
          onUpdate: function() {
            // जब यो प्यानल २०% माथि पुग्छ, तब होमपेज देखाउन सुरु गर्ने
            // यसले गर्दा झ्याप्प पपअप हुँदैन
            if (this.progress() >= 0.2) {
              onFinish && onFinish();
            }
          }
        }).to(
          overlayRef.current.querySelector("path"),
          {
            duration: 1.4,
            morphSVG: "M0,0 L0,300 Q720,0 1440,300 L1440,0 Z",
            ease: "power4.inOut",
          },
          "<"
        );
      }, 500);
    }

    return () => clearTimeout(greetingTimer);
  }, [index, onFinish]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center text-white overflow-hidden"
      style={{ backgroundColor: "black" }}
    >
      <h1
        ref={greetingRef}
        className="text-5xl md:text-7xl lg:text-8xl font-bold absolute z-20 pointer-events-none font-mono tracking-tighter"
        style={{ 
          color: "#00ff41", 
          textShadow: "0 0 20px rgba(0, 255, 65, 0.8)" 
        }}
      >
        {greetings[index]}
      </h1>

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        <path fill="black" d="M0,0 L0,900 L1440,900 L1440,0 Z" />
      </svg>
    </div>
  );
}