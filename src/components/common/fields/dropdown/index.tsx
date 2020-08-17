import React from 'react';
import Select from 'react-select';

import { LabelValue } from 'src/interfaces';

const customStyles = {
  container: () => ({
    height: '40px',
    width: '200px'
  }),
  control: () => ({
    height: '100%'
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  menuList: () => ({
    padding: 0
  })
};

interface DropdownProps {
  name?: string;
  fieldName: string;
  value: any;
  options: LabelValue[];
  isMultiple?: boolean;
  isClearable?: boolean;
  handleChange: Function;
}

const Dropdown: React.FC<DropdownProps> = ({
  name,
  fieldName,
  value,
  options,
  isMultiple,
  isClearable,
  handleChange
}) => {
  const onChange = (value: any) => handleChange(fieldName, value);
  const formattedValue = (value: any) => options.find(option => option.value === value);

  return (
    <Select
      name={name}
      value={formattedValue(value)}
      options={options}
      styled={customStyles}
      isMulti={isMultiple}
      isClearable={isClearable}
      onChange={onChange}
    />
  );
};

export default Dropdown;
