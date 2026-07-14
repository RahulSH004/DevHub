import { FaGithub, FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 rounded-sm"
        >
          <Logo />
        </Link>
        
        {/* Middle: Contact Us & Copyright */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <Link 
            href="mailto:hello@devhub.dev" 
            className="text-sm font-medium text-zinc-500 hover:text-stone-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 rounded-sm px-1"
          >
            Contact Us
          </Link>
          <p className="text-sm text-zinc-400">
            &copy; {new Date().getFullYear()} DevHub. All rights reserved.
          </p>
        </div>

        {/* Right: Social Icons */}
        <div className="flex items-center gap-5">
          <Link 
            href="https://twitter.com" 
            target="_blank" 
            rel="noreferrer" 
            className="text-zinc-400 hover:text-stone-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 rounded-sm p-1"
          >
            <span className="sr-only">X (formerly Twitter)</span>
            <FaXTwitter className="w-5 h-5" />
          </Link>
          <Link 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer" 
            className="text-zinc-400 hover:text-stone-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 rounded-sm p-1"
          >
            <span className="sr-only">GitHub</span>
            <FaGithub className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </footer>
  );
}
