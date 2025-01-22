import React from 'react';
import Select from 'react-select';

interface LocationSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{
    label: string;
    value: string;
  }>;
  label?: string;
}

const LocationSelect: React.FC<LocationSelectProps> = ({
  value,
  onChange,
  options,
  label
}) => {
  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <Select
        value={selectedOption}
        onChange={(option) => onChange(option?.value || '')}
        options={options}
        isClearable
        classNames={{
          control: (state) => 
            `border-2 rounded-lg ${state.isFocused ? 'border-primary-500' : 'border-neutral-300'} 
             hover:border-primary-500 transition`,
          option: (state) => 
            `${state.isFocused ? 'bg-primary-50' : ''} 
             ${state.isSelected ? 'bg-primary-100' : ''}`,
          menu: () => "mt-1 border border-neutral-200 rounded-lg shadow-md",
          valueContainer: () => "px-3 py-1",
        }}
        placeholder="Select location..."
      />
    </div>
  );
};

export default LocationSelect;