"use client";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button"; // Assuming your Button component is in the same folder
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-white/80 backdrop-blur-sm z-50 transition-colors duration-200 ${
        scrolled ? "border-b border-gray-100" : "border-b-0 border-gray-100 "
      }`}
    >
      <nav className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/VillageFullLogoRasterGreen.png"
              alt="Village Logo"
              width={100}
              height={40}
            />
          </Link>

          <div className="flex items-center">
            {/* Potentially add about and contact links tied to zoho SMPT */}
            <a
              className="text-black text-lg font-light hover:scale-105 hover:text-[#6EA215] transition duration-300"
              href="https://tally.so/r/w22QYp"
            >
              Join the Mission
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

// The 'export default' line makes this component available to be imported in other files.
