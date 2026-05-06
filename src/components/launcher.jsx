import React, { useState, useEffect } from "react";

const Launcher = ({ onLaunch }) => {
  const [displayText, setDisplayText] = useState("");
  const [progress, setProgress] = useState(0);
  
  const targetText = "CHOOSE YOUR BOOT MODE";
  const chars = "001000000100001001001111";

  useEffect(() => {
    let iteration = 0;
    const totalIterations = targetText.length;

    const interval = setInterval(() => {
      setDisplayText(() => 
        targetText.split("")
          .map((letter, index) => {
            if(index < iteration) return targetText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      setProgress(() => {
        const currentProgress = Math.ceil((iteration / totalIterations) * 100);
        return currentProgress > 100 ? 100 : currentProgress;
      });

      if (iteration >= totalIterations) {
        setProgress(100);
        clearInterval(interval);
      }

      iteration += 1 / 3; 
    }, 40);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center p-3 z-[9999] font-mono">
      
      {/* Main Container: max-w-lg बनाएर मोबाइलमा साइज घटाइएको छ */}
      <div className="w-full max-w-md sm:max-w-lg bg-black border-[2px] border-[#00ff41] rounded-sm overflow-hidden shadow-[0_0_20px_rgba(0,255,65,0.15)]">
        
        {/* Terminal Header */}
        <div className="bg-[#00ff41] p-1.5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-black text-[#00ff41] px-1.5 py-0.5 text-[10px] sm:text-[13px] font-bold uppercase">
              LAUNCHER
            </div>
            <span className="text-black font-bold text-[10px] sm:text-[13px] animate-pulse">
              {progress < 100 ? "DECRYPTING..." : "//BOOT_READY"}
            </span>
          </div>

          <div className="flex gap-1 px-1">
            <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-black rounded-full opacity-30"></div>
          </div>
        </div>

        {/* Terminal Body: मोबाइलमा p-5 र डेस्कटपमा मात्र p-8 */}
        <div className="p-5 sm:p-8">
          <div className="mb-5 sm:mb-8">
            <h2 className="text-[#00ff41]/60 text-[9px] sm:text-xs mb-1 uppercase tracking-[0.2em]">
              {">"} Ready to Enter Portfolio
            </h2>
            
            {/* Decrypting Text: Mobile मा size सानो बनाएर chop हुनबाट बचाइएको छ */}
            <div className="text-[#00ff41] text-lg sm:text-xl font-black tracking-tight min-h-[1.5em] drop-shadow-[0_0_8px_#00ff41] uppercase">
              {displayText}
            </div>

            <div className="mt-3 flex items-center gap-1.5">
              <h2 className="text-[#00ff41]/60 text-[8px] sm:text-[10px] uppercase tracking-[0.1em]">
                {">"} Awaiting user input
              </h2>
              <span className="w-1 h-1 bg-[#00ff41] rounded-full animate-bounce [animation-delay:0s]"></span>
              <span className="w-1 h-1 bg-[#00ff41] rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1 h-1 bg-[#00ff41] rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>

          {/* Progress Bar Section */}
          <div className="mb-6 sm:mb-8">
            <div className="flex justify-between text-[10px] sm:text-[13px] text-[#00ff41] mb-1.5 font-bold uppercase">
              <span className="flex items-center">
                Installing Music
                <span className="flex ml-1 w-6">
                  <span className="animate-[pulse_1.2s_infinite_0ms]">.</span>
                  <span className="animate-[pulse_1.2s_infinite_300ms]">.</span>
                  <span className="animate-[pulse_1.2s_infinite_600ms]">.</span>
                </span>
              </span> 
              <span>{progress}%</span>
            </div>

            <div className="w-full h-1.5 bg-[#00ff41]/10 border border-[#00ff41]/30 p-[1px]">
              <div 
                className="h-full bg-[#00ff41] shadow-[0_0_10px_#00ff41] transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Action Buttons: मोबाइलमा सानो र चिटिक्क पारिएको छ */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => onLaunch(true)}
              className="group bg-black border border-[#00ff41] py-2.5 text-[#00ff41] font-bold text-sm hover:bg-[#00ff41] hover:text-black transition-all active:scale-95"
            >
              ACCESS_WITH_AUDIO
            </button>

            <button 
              onClick={() => onLaunch(false)}
              className="bg-black border border-[#00ff41]/30 py-2.5 text-[#00ff41]/40 font-bold text-sm hover:border-[#00ff41] hover:text-[#00ff41] transition-all active:scale-95"
            >
              SILENT_BOOT
            </button>
          </div>

          {/* Terminal Footer Logs */}
          <div className="mt-6 pt-3 border-t border-[#00ff41]/10 text-[8px] sm:text-[10px] text-[#00ff41]/30 flex justify-between uppercase">
            <p>{">"} SYS_ID: {Math.random().toString(36).substring(7).toUpperCase()}</p>
            <p>Bypassed_OK</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Launcher;