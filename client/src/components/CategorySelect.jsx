import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown} from 'lucide-react';
import { GiCricketBat } from "react-icons/gi";
import { BiSolidCricketBall } from "react-icons/bi";
import { MdSportsCricket } from "react-icons/md";
import { TbCricket } from "react-icons/tb";


const PLAYER_CATEGORIES = [
  {
    title: 'Categories',
    types: [
      { value: 'Batsman', label: 'Batsman', icon: GiCricketBat, description: 'Scores runs, defends wicket, builds partnerships' },
      { value: 'Bowler', label: 'Bowler', icon: BiSolidCricketBall, description: 'Delivers ball, takes wickets, controls run-rate' },
      { value: 'All-Rounder', label: 'All-Rounder', icon: MdSportsCricket, description: 'Bats, bowls, fields, balances team' }
    ] 
  },
];



function CategorySelect({ filterByType }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('');
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

  const handleSelect = (value) => {
    setSelectedType(value);
    filterByType(value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full sm:w-60 md:w-72" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                 flex items-center justify-between
                 hover:border-[#bf0000] transition-all duration-300
                 focus:ring-[#bf0000] focus:border-[#bf0000] focus:outline-none p-2.5"
      >
        <div className="flex items-center gap-2">
          <TbCricket
            size={18} 
            className="text-[#bf0000] hidden sm:block" 
          />
          <span className="truncate font-semibold ">
            {selectedType || 'Choose a Category'}
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
                       sm:left-auto
                      w-full mx-auto">
          <div className="grid grid-cols-1  gap-2 p-3">
            {PLAYER_CATEGORIES.map((category, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-[#bf0000] font-medium text-sm border-b border-gray-200 pb-1">
                  {category.title}
                </h3>
                <div className="space-y-1">
                  {category.types.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => handleSelect(type.value)}
                      className={`w-full p-2 rounded-md flex items-start gap-2 text-sm
                               transition-all duration-300 hover:bg-[#bf0000]/5
                               ${selectedType === type.value ? 'bg-[#bf0000]/10' : ''}`}
                    >
                      <type.icon 
                        size={16} 
                        className="text-[#bf0000] mt-0.5 shrink-0" 
                      />
                      <div className="text-left min-w-0">
                        <div className="font-medium text-gray-800 truncate">
                          {type.label}
                        </div>
                        <div className="text-xs text-gray-500 line-clamp-1">
                          {type.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 p-2 border-t border-gray-200">
            <button
              onClick={() => handleSelect('All player Types')}
              className="text-sm text-[#bf0000] hover:text-[#bf0000]/80 font-medium 
                       transition-colors duration-300"
            >
              View All Categories
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategorySelect;