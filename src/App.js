import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import MusicPlayer from "./components/MusicPlayer";
import SocialLinks from "./components/SocialLinks";
import profilePic from "./assets/profile.png";
import background from "./assets/background.jpg";
import "./styles.css";

export default function App() {
  const [bio, setBio] = useState("hey...\nI'm Duvet!");
  const [tabName, setTabName] = useState("duvet");
  const [userCount, setUserCount] = useState(17); // Initial user count is 100
  const tabVariations = ["duvet", "uvet d", "vet du", "et duv", "t duve"];
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.3); // Default volume set to 30%
  let tabIndex = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setTabName(tabVariations[tabIndex % tabVariations.length]);
      tabIndex++;
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.title = tabName;
  }, [tabName]);

  // Update progress bar based on audio currentTime
  useEffect(() => {
    const interval = setInterval(() => {
      const audio = document.getElementById("audio");
      if (audio) {
        setProgress((audio.currentTime / audio.duration) * 100 || 0);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    const audio = document.getElementById("audio");
    if (audio) {
      audio.volume = e.target.value;
    }
  };

  useEffect(() => {
    const createSparkle = (e) => {
      const sparkle = document.createElement("div");
      sparkle.classList.add("sparkle");
      document.body.appendChild(sparkle);
      const x = e.clientX;
      const y = e.clientY;
      sparkle.style.left = `${x - 5}px`;  // Adjust for centered position
      sparkle.style.top = `${y - 5}px`;

      setTimeout(() => {
        sparkle.remove();
      }, 1000);  // Remove sparkle after 1 second
    };

    document.addEventListener("mousemove", createSparkle);

    return () => {
      document.removeEventListener("mousemove", createSparkle);
    };
  }, []);

  // Set an interval to add 5 users every hour
  useEffect(() => {
    const interval = setInterval(() => {
      setUserCount((prevCount) => prevCount + 5);  // Add 5 users every hour
    }, 3600000);  // 1 hour in milliseconds (3600000 ms)

    return () => clearInterval(interval);  // Cleanup on unmount
  }, []);

  return (
    <div
      className="container"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="profile-card">
        <div className="viewer-count">
          <Eye className="eye-icon" />
          <span>{userCount}</span>
        </div>
        <img src={profilePic} alt="Profile" className="profile-pic" />
        <h1 className="username">{tabName}</h1>
        <textarea
          className="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <SocialLinks />
        <MusicPlayer
          progress={progress}
          volume={volume}
          onVolumeChange={handleVolumeChange}
        />
      </div>
    </div>
  );
}
