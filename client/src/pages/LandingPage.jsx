import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import { FaArrowUp } from "react-icons/fa";
import ChatButton from "../components/ChatModal";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3 }}
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 bg-[#bf0000] text-white p-3 rounded-full shadow-lg"
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </motion.button>
    )
  );
};

function LandingPage() {

  

  return (
    <div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={sectionVariants}
      >
        <HeroSection />
      </motion.div>

      <motion.div
        id="about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={sectionVariants}
      >
        <AboutUs />
      </motion.div>

      <motion.div
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={sectionVariants}
      >
        <ContactUs />
      </motion.div>

      <motion.div
        id="faq"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={sectionVariants}
      >
        <FAQ />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={sectionVariants}
      >
        <Footer />
      </motion.div>
      <ChatButton/>
      <ScrollToTopButton />
    </div>
  );
}

export default LandingPage;
