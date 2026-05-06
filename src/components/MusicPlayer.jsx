import React, { useRef, useState, useEffect } from "react";

const MusicPlayer = ({ autoStart = false }) => {
  const playlist = [
    "/iwasneverthere.mp3",
  ];

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (autoStart && audioRef.current) {
      playTrack(0);
    }
  }, [autoStart]);

  const setSourceAndMaybePlay = (src, shouldPlay) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = src;
    audio.load();
    if (shouldPlay) {
      audio.play().catch((err) => console.log("Autoplay blocked:", err));
    }
  };

  const playTrack = (index) => {
    setCurrentTrackIndex(index);
    setSourceAndMaybePlay(playlist[index], true);
  };

  const shuffleNextTrack = () => {
    const nextIndex = Math.floor(Math.random() * playlist.length);
    setCurrentTrackIndex(nextIndex);
    setSourceAndMaybePlay(playlist[nextIndex], true);
  };

  return (
    <audio 
      ref={audioRef} 
      onEnded={shuffleNextTrack} 
      preload="auto" 
    />
  );
};

export default MusicPlayer;