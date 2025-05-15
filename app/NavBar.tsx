"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, Bell, Menu, X } from "lucide-react";
import { useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white md:bg-transparent shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/plant.png"
            alt="Leaf Logo"
            width={45}
            height={45}
            className="object-contain cursor-pointer"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/">
            <span className="font-medium text-gray-800 hover:text-green-600">
              HOME
            </span>
          </Link>
          <Link href="/about">
            <span className="font-medium text-gray-800 hover:text-green-600">
              ABOUT
            </span>
          </Link>
          <Link href="/recommendation">
            <span className="font-medium text-gray-800 hover:text-green-600">
              RECOMMENDATION
            </span>
          </Link>
          <Link href="/prediction">
            <span className="font-medium text-gray-800 hover:text-green-600">
              PREDICTION
            </span>
          </Link>
          <Link href="/fertilizer">
            <span className="font-medium text-gray-800 hover:text-green-600">
              FERTILIZATION
            </span>
          </Link>
        </div>

        {/* Icons & Mobile Menu Toggle */}
        <div className="flex items-center gap-6">
          {/* These icons are hidden on mobile, visible on desktop */}
          <Search className="w-5 h-5 text-gray-600 hidden md:block" />
          <Bell className="w-5 h-5 text-gray-600 hidden md:block" />
          {/* Hamburger button on mobile */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? (
              <X className="w-6 h-6 text-gray-800" />
            ) : (
              <Menu className="w-6 h-6 text-gray-800" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 pb-4 bg-white shadow-md text-black">
          <Link href="/" onClick={() => setIsOpen(false)}>
            HOME
          </Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>
            ABOUT
          </Link>
          <Link href="/recommendation" onClick={() => setIsOpen(false)}>
            RECOMMENDATION
          </Link>
          <Link href="/prediction" onClick={() => setIsOpen(false)}>
            PREDICTION
          </Link>
          <Link href="/fertilizer" onClick={() => setIsOpen(false)}>
            FERTILIZATION
          </Link>
        </div>
      )}
    </nav>
  );
}
