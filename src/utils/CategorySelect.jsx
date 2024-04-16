import React from "react";

const CategorySelect = ({ categories, value, onChange }) => {
  return (
    <>
      <label htmlFor="category" className="form-label">
        Category / Team
      </label>
      <select
        className="form-select mb-3"
        id="category"
        name="category"
        value={value}
        onChange={onChange}
        aria-label="Category"
        required
      >
        <option value="">Choose Categories...</option>
        {categories.map((category) => (
          <option key={category.id} value={category.category}>
            {category.category}
          </option>
        ))}
      </select>
    </>
  );
};

export default CategorySelect;
