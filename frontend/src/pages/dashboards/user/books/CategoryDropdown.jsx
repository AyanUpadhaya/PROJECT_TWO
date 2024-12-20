import React from "react";

const CategoryDropdown = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="w-full">
      <label htmlFor="category" className="block mb-2 font-bold">
        Category
      </label>
      <select
        id="category"
        name="category"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="" disabled>
          Select a category
        </option>
        {categories.map((category, idx) => (
          <option key={idx} value={category?._id}>
            {category?.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;
