import React from "react";
import {motion} from "framer-motion";

function ContactUs() {
  const locations = [
    {
      name: "Sri Lanka",
      address: "Passionate, unpredictable, spin-dominant",
      image: "https://c8.alamy.com/comp/EG2ECT/christchurch-new-zealand-feature-14th-feb-2015-christchurch-new-zealand-EG2ECT.jpg",
    },
    {
      name: "India",
      address: "Dominant, skilled, historic, determined.",
      image: "https://content.api.news/v3/images/bin/4d61b665f07fbae8736efe0c2f4b0604",
    },
    {
      name: "Australia",
      address: " Ruthless, competitive, champion-mentality, tactical.",
      image: "https://www.arenamusic.com.au/wp-content/uploads/2020/08/CaseStudy-TS-5-DT-1.jpg",
    },
    {
      name: "New Zealand",
      address: "Sportsmanlike, consistent, composed, strategic",
      image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_960,q_50/lsci/db/PICTURES/CMS/202300/202387.4.jpg",
    },
  ];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="md:flex gap-x-24 clear-left md:mb-16 mb-10">
          <div className="md:mb-0 mb-4">
            <h2 className="text-black font-manrope text-4xl font-semibold leading-10 mb-5 md:text-left text-center">
              Get In Touch
            </h2>
            <p className="text-gray-600 text-lg font-normal leading-7 mb-7 md:text-left text-center">
              Whether you have a concern or simply want to say hello, We are
              here to facilitate communication with you.
            </p>
            <div className="flex md:items-center md:justify-start justify-center">
              <button className="w-36 h-12 rounded-lg bg-[#bf0000] transition-all duration-700 hover:bg-red-400 shadow text-white text-center text-base font-semibold leading-6">
                Contact Us
              </button>
            </div>
          </div>
          <div className="border-l-2 md:border-[#bf0000] border-white px-10 py-6">
            <div className="mb-8">
              <h6 className="text-gray-500 text-sm font-medium leading-5 pb-3 md:text-start text-center">
                Email Address
              </h6>
              <h3 className="text-black text-xl font-semibold leading-8 md:text-start text-center">
                spirit11@gmail.com
              </h3>
            </div>
            <div>
              <h6 className="text-gray-500 text-sm font-medium leading-5 pb-3 md:text-start text-center">
                Phone Number
              </h6>
              <h3 className="text-black text-xl font-semibold leading-8 md:text-start text-center">
                +94 71 123 4567
              </h3>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
          {locations.map((location, index) => (
            <motion.div whileHover={{
              scale: 1.1,
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
              transition: { duration: 0.4, ease: "easeInOut" },
            }} key={index} className="h-96 relative flex justify-center">
              <div className="w-full h-full absolute bg-gradient-to-t from-gray-800/50 to-gray-600/50 rounded-lg"></div>
              <img
                src={location.image}
                alt={`${location.name} image`}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute bottom-0 mb-6 text-center px-6">
                <h5 className="text-white text-lg font-semibold leading-7 mb-2">
                  {location.name}
                </h5>
                <p className="text-white text-base font-medium leading-6">
                  {location.address}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
