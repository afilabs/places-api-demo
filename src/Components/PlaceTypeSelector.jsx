import React from 'react';
import Select, { components } from 'react-select';
import './PlaceTypeSelector.scss';

const MultiValueLabel = ({ data, ...props }) => {
  const Icon = data.icon;
  return (
    <components.MultiValue {...props}>
      <div className="multi-value-container">
        <Icon className="multi-value-icon" />
        <span>{data.label}</span>
      </div>
    </components.MultiValue>
  );
};

const DropdownOption = ({ data, ...props }) => {
  const Icon = data.icon;
  return (
    <components.Option {...props}>
      <div className="dropdown-option">
        <Icon className="option-icon" />
        <span>{data.label}</span>
      </div>
    </components.Option>
  );
};

const PlaceTypeSelector = ({ options, selectedOptions, onSelectionChange }) => {
  return (
    <div className="PlaceTypeSelector">
      <label className="selector-label">Place Types</label>
      <Select
        closeMenuOnSelect={false}
        value={selectedOptions}
        isMulti
        options={options}
        components={{ MultiValue: MultiValueLabel, Option: DropdownOption }}
        onChange={onSelectionChange}
      />
    </div>
  );
};

export default React.memo(PlaceTypeSelector);
