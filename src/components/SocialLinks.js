import { FaDiscord, FaGithub } from "react-icons/fa";

export default function SocialLinks() {
  return (
    <div className="social-links">
      <a href="https://discord.com/users/1212431696381612132" className="social-icon discord"><FaDiscord /></a>
      <a href="https://github.com/poloduvet" className="social-icon github"><FaGithub /></a>
    </div>
  );
}
