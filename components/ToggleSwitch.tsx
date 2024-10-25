import { useState } from 'react';

// Define the props interface
interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (value: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ enabled, onChange }) => {
  const [isOn, setIsOn] = useState(enabled);

  const toggleSwitch = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    onChange(newValue);
  };

  return (
    <label className="relative inline-block w-12 h-6 transition duration-200 ease-linear align-middle select-none">
      <input type="checkbox" checked={isOn} onChange={toggleSwitch} className="hidden" />
      <span
        className={`${
          isOn ? 'bg-green-400' : 'bg-gray-400'
        } absolute block w-6 h-6 rounded-full shadow transform transition ease-in-out duration-300 cursor-pointer`}
        style={{ left: isOn ? '6px' : '0px' }}
      />
      <span
        className={`${
          isOn ? 'translate-x-6' : 'translate-x-1'
        } absolute left-0 bottom-0 w-12 h-6 bg-gray-200 rounded-full transition-transform duration-200 ease-in-out`}
      />
    </label>
  );
};

export default ToggleSwitch;
