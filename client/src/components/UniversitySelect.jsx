import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, GraduationCap } from 'lucide-react';

const UNIVERSITIES = [
  "All Universities",
  "University of Colombo",
  "University of Peradeniya",
  "University of Sri Jayewardenepura",
  "University of Kelaniya",
  "University of Moratuwa",
  "University of Jaffna",
  "University of Ruhuna",
  "Eastern University, Sri Lanka",
  "South Eastern University of Sri Lanka",
  "Rajarata University of Sri Lanka",
  "Sabaragamuwa University of Sri Lanka",
  "Wayamba University of Sri Lanka",
  "Uva Wellassa University",
  "University of the Visual & Performing Arts",
  "The Open University of Sri Lanka",
  "Gampaha Wickramarachchi University of Indigenous Medicine",
  "University of Vavuniya",
  "General Sir John Kotelawala Defence University",
  "National Institute of Business Management (NIBM)",
  "Sri Lanka Institute of Information Technology (SLIIT)",
  "Informatics Institute of Technology (IIT)",
  "NSBM Green University",
  "CINEC Campus",
  "SLTC Research University",
  "ICBT Campus",
  "Horizon Campus",
  "British College of Applied Studies (BCAS)"
];

// Group universities by their starting letter
const groupUniversitiesByLetter = (universities) => {
  const grouped = {};
  universities.sort((a, b) => a.localeCompare(b)); // Sort universities alphabetically

  universities.forEach((university) => {
    const firstLetter = university[0].toUpperCase();
    if (!grouped[firstLetter]) {
      grouped[firstLetter] = [];
    }
    grouped[firstLetter].push(university);
  });

  return grouped;
};

function UniversitySelect({ filterByDistrict }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (university) => {
    setSelectedUniversity(university);
    filterByDistrict(university === "All Universities" ? "all" : university); // Fix for "All of Sri Lanka"
    setIsOpen(false);
  };

  // Group universities by their starting letter
  const groupedUniversities = groupUniversitiesByLetter(UNIVERSITIES);

  return (
    <div className="relative w-full sm:w-60 md:w-72" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                 flex items-center justify-between
                 hover:border-[#bf0000] transition-all duration-300
                 focus:ring-[#bf0000] focus:border-[#bf0000] focus:outline-none p-2.5"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <GraduationCap
            size={18} 
            className="text-[#bf0000] hidden sm:block" 
          />
          <span className="truncate font-semibold">
            {selectedUniversity || 'Choose a university'}
          </span>
        </div>
        <ChevronDown 
          size={18} 
          className={`text-gray-500 transition-transform duration-300 
                   ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Mega Menu Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white rounded-lg shadow-lg 
                      border border-gray-300 overflow-hidden
                      w-full sm:w-[480px] md:w-[640px] lg:w-[800px] left-1/2 transform -translate-x-1/2 scale-100 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 max-h-96 overflow-y-auto">
            {Object.entries(groupedUniversities).map(([letter, universities]) => (
              <div key={letter} className="space-y-2">
                <div className="font-bold text-2xl text-[#bf0000]">{letter}</div>
                {universities.map((university, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(university)}
                    className={`w-full p-1 rounded-md flex items-start gap-1 text-sm
                             transition-all duration-300 hover:bg-[#bf0000]/5
                             ${selectedUniversity === university ? 'bg-[#bf0000]/10' : ''}`}
                  >
                    <div className="text-left min-w-0">
                      <div className="font-medium text-gray-800 truncate">
                        {university}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UniversitySelect;