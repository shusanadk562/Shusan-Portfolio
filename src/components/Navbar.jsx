import { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "../assets/Logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [forceVisible, setForceVisible] = useState(false);

  const lastScrollY = useRef(0);
  const timerId = useRef(null);

  useEffect(() => {
    const homeSection = document.querySelector("#home");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setForceVisible(true);
          setVisible(true);
        } else {
          setForceVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (homeSection) observer.observe(homeSection);
    return () => {
      if (homeSection) observer.unobserve(homeSection);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (forceVisible || menuOpen) {
        setVisible(true);
        return;
      }
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
        if (timerId.current) clearTimeout(timerId.current);
        timerId.current = setTimeout(() => {
          setVisible(false);
        }, 3000);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, [forceVisible, menuOpen]);

  return (
    /* Container: Mobile ma 92% width jasle chopine problem hataucha */
    <div className="fixed top-3 left-1/2 transform -translate-x-1/2 w-[92%] lg:w-[65%] z-50">
      <nav
        className={`relative flex items-center justify-between px-5 py-3 lg:py-5 transition-all duration-300 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/50
        ${visible ? "translate-y-0 opacity-100" : "-translate-y-28 opacity-0"}
        `}
      >
        {/* Logo Section */}
        <div className="flex items-center space-x-2 shrink-0">
          <img src={Logo} alt="Logo" className="w-15 h-15 lg:w-24 lg:w-20 object-contain" />
          {/* Text: Mobile ma tracking normal rakheko cha chopinna bhanera */}
          <div className="text-lg sm:text-2xl font-bold text-white hidden sm:block tracking-tight lg:tracking-tighter">
            SHUSAN
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center space-x-8">
          {["Home", "About", "Skills", "Projects", "Experience", "Contact"].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="text-white text-base font-medium hover:text-[#00ff41] transition-colors duration-300 uppercase"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#00ff41] text-2xl p-2 transition-transform active:scale-90"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Desktop Reach Out Button */}
        <div className="hidden lg:block">
          <a
            href="#contact"
            className="border-2 border-[#00ff41] bg-transparent text-[#00ff41] px-5 py-2 rounded-full font-bold uppercase tracking-wider hover:bg-[#00ff41] hover:text-black transition-all duration-300 text-sm"
          >
            Reach Out
          </a>
        </div>

        {/* Mobile Dropdown Menu */}
        <div 
          className={`absolute top-[115%] left-0 w-full overflow-hidden transition-all duration-500 ease-in-out lg:hidden
          ${menuOpen ? "max-h-[500px] opacity-100 visible" : "max-h-0 opacity-0 invisible"}`}
        >
          <div className="bg-black/95 backdrop-blur-2xl border border-[#00ff41]/20 rounded-2xl py-6 flex flex-col items-center space-y-4 shadow-2xl">
            {["Home", "About", "Skills", "Projects", "Experience", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="text-white text-lg font-mono hover:text-[#00ff41] transition-colors duration-300 uppercase tracking-widest py-1"
              >
                <span className="text-[#00ff41] opacity-50 mr-2">{">"}</span>{item}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 border border-[#00ff41] text-[#00ff41] px-8 py-2.5 rounded-full font-mono text-xs uppercase tracking-widest hover:bg-[#00ff41] hover:text-black transition-all"
            >
             Reach out 
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}