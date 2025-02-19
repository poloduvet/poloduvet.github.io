import React, { useEffect, useState } from "react";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";
import music from "../assets/music.mp3"; // Import music file

export default function MusicPlayer({ progress }) {
  const [playing, setPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(progress); // Local state for audio progress
  const [audio] = useState(new Audio(music)); // Create an audio element

  useEffect(() => {
    audio.volume = 0.3;
    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, [audio]);

  const togglePlay = () => {
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  const skipForward = () => {
    audio.currentTime += 10;
  };

  const skipBackward = () => {
    audio.currentTime -= 10;
  };

  const updateProgress = () => {
    setAudioProgress((audio.currentTime / audio.duration) * 100 || 0);
  };

  const seek = (e) => {
    const progressContainer = e.currentTarget; // Get the progress container
    const rect = progressContainer.getBoundingClientRect(); // Get its dimensions
    const offsetX = e.clientX - rect.left; // Calculate the click position relative to the progress bar
    const newProgress = (offsetX / rect.width) * 100; // Calculate the new progress percentage
    audio.currentTime = (newProgress / 100) * audio.duration; // Set the new current time
    setAudioProgress(newProgress); // Update the local progress state
  };
  
  return (
    <div className="music-player cute-player">
      <div className="controls">
        <button onClick={skipBackward} className="music-button cute-button">
          <SkipBack />
        </button>
        <button onClick={togglePlay} className="music-button cute-button">
          {playing ? <Pause /> : <Play />}
        </button>
        <button onClick={skipForward} className="music-button cute-button">
          <SkipForward />
        </button>
      </div>

      <div
        className="progress-container cute-progress"
        onClick={seek}
      >
        <div className="progress-bar" style={{ width: `${audioProgress}%` }}></div>
      </div>
    </div>
  );
}
