import React from "react";
import { motion } from "framer-motion";

function AboutUs() {
  return (
    <section className="py-24  relative xl:mr-0 lg:mr-5 mr-0">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
          <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
            <div className="w-full flex-col justify-center items-start gap-8 flex">
              <div className="flex-col justify-start lg:items-start items-center gap-4 flex">
                <h6 className="text-gray-400 text-base font-normal leading-relaxed">
                  About Us
                </h6>
                <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                  <h2 className="text-[#bf0000] text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                    The Tale of Our Achievement Journey
                  </h2>
                  <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                    Our journey at Spirit11 is a testament to teamwork,
                    dedication, and the passion for cricket. Together, we've
                    tackled challenges, celebrated victories, and built a legacy
                    of success. Every milestone we achieve reflects the
                    collective effort of players, coaches, and managers. As we
                    continue to evolve, our mission remains the same—empowering
                    teams with the best tools for seamless cricket management
                    and success on and off the field.
                  </p>
                </div>
              </div>
              <div className="w-full flex-col justify-center items-start gap-6 flex">
                <div className="w-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                  {[
                    {
                      title: "100+ Teams Managed",
                      subtitle:
                        "Streamlining Cricket Team Operations Effortlessly.",
                    },
                    {
                      title: "1,000+ Matches",
                      subtitle: "Enhancing Game Management with Precision.",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                        transition: { duration: 0.4, ease: "easeInOut" },
                      }}
                      className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 flex-col justify-start items-start gap-2.5 inline-flex"
                    >
                      <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">
                        {item.title}
                      </h4>
                      <p className="text-gray-500 text-base font-normal leading-relaxed">
                        {item.subtitle}
                      </p>
                    </motion.div>
                  ))}
                </div>
                <div className="w-full h-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                  {[
                    {
                      title: "50+ Awards",
                      subtitle:
                        "Excellence in Cricket Team Coordination and Scheduling.",
                    },
                    {
                      title: "99% Happy Clients",
                      subtitle: "Reflecting Our Commitment to Service.",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                        transition: { duration: 0.2, ease: "easeInOut" },
                      }}
                      className="w-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex"
                    >
                      <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">
                        {item.title}
                      </h4>
                      <p className="text-gray-500 text-base font-normal leading-relaxed">
                        {item.subtitle}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            <button className="sm:w-fit w-full group px-3.5 py-2 bg-red-50 hover:bg-red-100 rounded-lg shadow transition-all duration-700 ease-in-out flex items-center justify-center">
              <span className="px-1.5 text-[#bf0000] text-sm font-medium leading-6 group-hover:-translate-x-0.5 transition-all duration-700 ease-in-out">
                Read More
              </span>
              <svg
                className="group-hover:translate-x-0.5 transition-all duration-700 ease-in-out"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M6.75265 4.49658L11.2528 8.99677L6.75 13.4996"
                  stroke="#BF0000"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="w-full lg:justify-start justify-center items-start flex">
            <div className="sm:w-[564px] w-full sm:h-[646px] h-full sm:bg-gray-100 rounded-3xl sm:border border-gray-200 relative">
              <img
                className="sm:mt-5 sm:ml-5 w-full h-full rounded-3xl object-cover"
                src="https://pagedone.io/asset/uploads/1717742431.png"
                alt="About Us image"
                width={564}
                height={646}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
