import React from "react";
import Select from "react-select";

const LanguageOptions = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <div>
        <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    </div>
  );
};

export default LanguageOptions;