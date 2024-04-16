import React from "react";

const RoleSelect = ({ value, onChange }) => {
  const TypeColors = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
  };

  const typeOptions = Object.keys(TypeColors).map((type) => (
    <option key={type} value={type}>
      {type}
    </option>
  ));

  return (
    <>
      <label htmlFor="role" className="form-label">
        Role
      </label>
      <select
        className="form-select mb-3"
        id="role"
        name="role"
        value={value}
        onChange={onChange}
        aria-label="Role"
        required
      >
        <option value="">Choose a Role...</option>
        {typeOptions}
      </select>
    </>
  );
};

export default RoleSelect;
