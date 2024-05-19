import React, {  forwardRef } from "react";
import CreatableSelect from "react-select/creatable";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: "40px",
    backgroundColor: "rgba(255, 255, 255, 0.2)", // bg-white/20
    borderColor: state.isFocused ? "transparent" : "transparent",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(59, 130, 246, 0.5)" : "none", // focus:ring-2 focus:ring-blue-400
    borderRadius: "0.375rem", // rounded-md
    "&:hover": {
      borderColor: "transparent",
    },
    outline: "none",
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
    backgroundColor: "rgba(31, 41, 55)", // bg-gray-800/90
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#3b82f6" // bg-blue-500
      : state.isFocused
      ? "rgba(255, 255, 255, 0.1)" // bg-white/10
      : "transparent",
    color: state.isSelected ? "#ffffff" : "#ffffff", // text-white
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)", // bg-white/10
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#ffffff", // text-white
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#ffffff", // text-white
  }),
  input: (provided) => ({
    ...provided,
    color: "#ffffff", // text-white
  }),
};
const SelectWithAddOption = forwardRef(({ value, onChange, onCreateOption, options },ref) => {
  return (
    <div>
      <CreatableSelect
        className="w-full text-white"
        classNamePrefix="select"
        ref={ref}
        value={value}
        onChange={onChange}
        onCreateOption={onCreateOption}
        options={options}
        styles={customStyles}
        placeholder="Select or create an option"
      />
    </div>
  );
});

export default SelectWithAddOption;
