import { useState } from "react";

const FilterBar = ({ setFilter }) => {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Tech", "Sports", "Politics"];

  const handleFilterClick = (category) => {
    setActiveFilter(category);
    setFilter(category);
  };

  return (
    <div className="flex justify-center mb-4 space-x-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleFilterClick(category)}
          className={`px-4 py-2 rounded transition font-semibold
            ${activeFilter === category 
              ? "bg-blue-700 text-white shadow-lg" 
              : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
