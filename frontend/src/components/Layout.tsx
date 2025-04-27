import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Sparkles,
  LogIn,
  Twitter,
  Github,
  Disc as Discord,
} from "lucide-react";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";

const Layout: React.FC = () => {
  const location = useLocation();
  const { open } = useAppKit();
  const { isConnected, address } = useAppKitAccount();

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const navLinkClasses = (path: string) => `
    text-sm font-medium transition-colors relative
    ${isActiveRoute(path) ? "text-pink" : "text-pink/60 hover:text-pink"}
    ${
      isActiveRoute(path)
        ? 'after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-pink/40 after:rounded-full'
        : ""
    }
  `;

  const handleLogin = () => {
    open();
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-dark bg-gradient-dots bg-[length:24px_24px] flex flex-col">
      <div className="fixed inset-0 bg-gradient-radial from-transparent via-transparent to-black/70 pointer-events-none" />

      <header className="relative py-4 px-6 mb-8 bg-dark-light/90 backdrop-blur-lg border-b border-pink/10">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-dark-lighter rounded-xl p-2.5 transform group-hover:rotate-12 transition-all duration-300 shadow-glow border border-pink/20">
              <Sparkles className="text-pink h-5 w-5" />
            </div>
            <h1 className="font-cursive text-2xl md:text-3xl font-bold text-pink group-hover:scale-105 transition-transform">
              Game of Raffle
            </h1>
          </Link>

          <div className="flex items-center">
            <nav className="hidden md:block mr-8">
              <ul className="flex items-center space-x-8">
                <li>
                  <Link to="/" className={navLinkClasses("/")}>
                    Raffle
                  </Link>
                </li>
                <li>
                  <Link to="/spinner" className={navLinkClasses("/spinner")}>
                    Spinner
                  </Link>
                </li>
                {/* <li>
                  <Link 
                    to="/about" 
                    className={navLinkClasses('/about')}
                  >
                    About
                  </Link>
                </li> */}
              </ul>
            </nav>

            <button onClick={handleLogin} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink to-purple opacity-50 blur rounded-xl transform transition-all duration-300 group-hover:scale-110" />
              <div className="relative bg-dark-lighter px-4 py-2 rounded-xl border border-pink/20 backdrop-blur-sm transition-all duration-300 group-hover:border-pink/40">
                <span className="flex items-center space-x-2 text-pink">
                  <span className="text-xs font-medium">
                    {isConnected ? formatAddress(address!) : "Login"}
                  </span>
                  <LogIn className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 pb-16 relative flex-grow">
        <Outlet />
      </main>

      <footer className="relative border-t border-pink/10 bg-dark-light/90 backdrop-blur-lg mt-auto">
        <div className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="bg-dark-lighter rounded-xl p-2 shadow-glow border border-pink/20">
                <Sparkles className="text-pink h-4 w-4" />
              </div>
              <span className="font-cursive text-xl text-pink/60">
                Game of Raffle
              </span>
            </div>

            <div className="flex items-center justify-center space-x-6">
              <a
                href="https://twitter.com/gameofraffle"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink/20 to-purple/20 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity" />
                <div className="relative bg-dark-lighter p-2.5 rounded-xl border border-pink/10 transition-colors group-hover:border-pink/20">
                  <Twitter className="w-4 h-4 text-pink/60 group-hover:text-pink transition-colors" />
                </div>
              </a>
              <a
                href="https://discord.gg/gameofraffle"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink/20 to-purple/20 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity" />
                <div className="relative bg-dark-lighter p-2.5 rounded-xl border border-pink/10 transition-colors group-hover:border-pink/20">
                  <Discord className="w-4 h-4 text-pink/60 group-hover:text-pink transition-colors" />
                </div>
              </a>
              <a
                href="https://github.com/gameofraffle"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink/20 to-purple/20 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity" />
                <div className="relative bg-dark-lighter p-2.5 rounded-xl border border-pink/10 transition-colors group-hover:border-pink/20">
                  <Github className="w-4 h-4 text-pink/60 group-hover:text-pink transition-colors" />
                </div>
              </a>
            </div>

            <p className="text-pink/40 text-sm text-center md:text-right">
              © {new Date().getFullYear()} Game of Raffle. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
