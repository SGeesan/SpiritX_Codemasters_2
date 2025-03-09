import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How can I create a cricket team?",
    answer:
      "Simply sign up on Spirit11, navigate to 'Create Team,' enter your team details, and invite players to join.",
  },
  {
    question: "Can I schedule matches using Spirit11?",
    answer:
      "Yes! You can set up fixtures, manage team availability, and track match schedules seamlessly within the platform.",
  },
  {
    question: "Is Spirit11 free to use?",
    answer:
      "Spirit11 offers both free and premium plans. The free plan includes basic features, while premium plans provide advanced management tools.",
  },
  {
    question: "Can I track player performance?",
    answer:
      "Absolutely! Spirit11 allows you to record player stats, track performance, and generate reports for better analysis.",
  },
  {
    question: "Does Spirit11 support tournament management?",
    answer:
      "Yes, you can create and manage tournaments, track standings, and update scores in real-time.",
  }
];


function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
          <div className="w-full lg:w-1/2">
            <img
              src="https://pagedone.io/asset/uploads/1696230182.png"
              alt="FAQ section"
              className="w-full rounded-xl object-cover"
            />
          </div>

          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-xl">
              <div className="mb-6 lg:mb-16">
                <h6 className="text-lg text-center font-medium text-[#bf0000] mb-2 lg:text-left">
                  FAQs
                </h6>
                <h2 className="text-4xl text-center font-bold text-gray-900 leading-[3.25rem] mb-5 lg:text-left">
                  Looking for answers?
                </h2>
              </div>

              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4">
                    {/* Question Button */}
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="flex justify-between items-center text-xl font-normal text-gray-600 w-full py-4 transition duration-500 hover:text-[#bf0000]"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`transition-transform duration-300 ${
                          openIndex === index ? "rotate-180 text-[#bf0000]" : "text-gray-900"
                        }`}
                      />
                    </button>

                    {/* Animated Answer */}
                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          style={{ overflow: "hidden" }}
                        >
                          <p className="text-base font-normal text-gray-600 mt-2">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
