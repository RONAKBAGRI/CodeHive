import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="relative border-t border-gray-800/50 mt-auto bg-[#0f0f0f] text-gray-400">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gray-900 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Logo and Tagline */}
          <div className="space-y-4">
            <img src="/logo4.png" alt="Logo" className="w-[180px] h-auto" />
            <p className="font-semibold text-sm leading-relaxed text-gray-300">
              Where <span className="text-white font-bold">Code Meets Community</span>.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">
              Quick Links
            </h3>
            <ul className="space-y-1">
              <li>
                <Link href="/support" className="hover:text-white transition-colors duration-200">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors duration-200">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Creator */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">
              Developed by
            </h3>
            <p className="text-gray-300 font-medium">Ronak Bagri</p>
            <div className="flex items-center gap-4 text-xl">
              <a
                href="https://github.com/RONAKBAGRI"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/ronakbagri/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="mailto:ronakbagri9@gmail.com"
                className="hover:text-white transition-colors"
                aria-label="Gmail"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} CodeHive. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
