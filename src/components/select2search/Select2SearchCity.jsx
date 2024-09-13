import React from 'react';
import Select from 'react-select';

const Select2SearchCity = ({ id, name, value, onChange, placeholder, excludedValues = [], locations }) => {

  // Handle selection change
  const handleChange = (selectedOption) => {
    onChange(selectedOption);
  };

  // Filter locations based on excluded values
  const filteredLocations = locations.filter(location => !excludedValues.includes(location.value));

  return (
    <Select
      id={id}
      name={name}
      value={filteredLocations.find(loc => loc.value === value)}
      onChange={handleChange}
      options={filteredLocations}
      placeholder={placeholder}
      isClearable
    />
  );
};

export default Select2SearchCity;
