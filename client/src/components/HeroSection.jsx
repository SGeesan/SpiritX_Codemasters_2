import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative">
      {/* Hero Section with Navbar Inside */}
      <section className="relative bg-center bg-no-repeat bg-cover bg-[url('https://images.unsplash.com/photo-1595207732481-22cccd3480fe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGNyaWNrZXR8ZW58MHx8MHx8fDA%3D')] bg-gray-700 bg-blend-multiply min-h-screen flex flex-col items-center">
        {/* Navbar Positioned Over the Image */}
        <nav className="absolute top-0 left-0 w-full bg-transparent text-white">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <a href="/home" className="text-2xl font-bold">
                {" "}
               <img src="./logo.png" className="w-20" alt="" />
              </a>

              {/* Desktop Menu */}
              <ul className="hidden md:flex space-x-6">
                <li>
                  <a href="/signup" className="hover:text-gray-300">
                    Sign Up
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-gray-300">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-gray-300">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-gray-300">
                    FAQs
                  </a>
                </li>
              </ul>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-white focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden bg-gray-800">
              <ul className="flex flex-col items-center py-4 space-y-4">
                <li>
                  <a
                    href="/"
                    className="hover:text-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="hover:text-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="/faqs"
                    className="hover:text-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
          )}
        </nav>

        {/* Hero Content */}
        <motion.div
      initial={{ opacity: 0, y: 50 }} // Start position
      animate={{ opacity: 1, y: 0 }} // End position
      transition={{ duration: 2, ease: "easeOut" }} // Animation timing
      className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56"
    >
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
        Master the Game, Lead the Team
      </h1>
      <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
      At Spirit11, we provide seamless and efficient team management solutions to help you strategize, organize, and lead your cricket team to victory.
      </p>
      <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
        <motion.a
          href="/vehicles"
          whileHover={{ scale: 1.1 }} // Hover effect
          whileTap={{ scale: 0.9 }} // Tap effect
          className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-[#bf0000] hover:bg-red-300 transition-all duration-700"
        >
          Get started
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </motion.a>
        <motion.a
          href="/signin"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 transition-all duration-700"
        >
          Sign In
        </motion.a>
      </div>
    </motion.div>
      </section>
    </header>
  );
};

export default HeroSection;
