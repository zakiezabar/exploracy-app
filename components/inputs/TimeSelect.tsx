import React, { useState } from 'react';
import Select from 'react-select';

interface TimeRange {
  start: string;
  end: string;
}

interface TimeSelectProps {
  value?: TimeRange[];
  onChange: (value: TimeRange[]) => void;
}

const TimeSelect: React.FC<TimeSelectProps> = ({
  value = [],
  onChange
}) => {
  const [timeRanges, setTimeRanges] = useState<TimeRange[]>(value);

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        options.push({
          value: time,
          label: time
        });
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  const addTimeRange = () => {
    const newRange = { start: '09:00', end: '17:00' };
    const updatedRanges = [...timeRanges, newRange];
    setTimeRanges(updatedRanges);
    onChange(updatedRanges);
  };

  const removeTimeRange = (index: number) => {
    const updatedRanges = timeRanges.filter((_, i) => i !== index);
    setTimeRanges(updatedRanges);
    onChange(updatedRanges);
  };

  const updateTimeRange = (index: number, field: 'start' | 'end', value: string) => {
    const updatedRanges = timeRanges.map((range, i) => {
      if (i === index) {
        return { ...range, [field]: value };
      }
      return range;
    });
    setTimeRanges(updatedRanges);
    onChange(updatedRanges);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Operating Hours
        </label>
        <button
          type="button"
          onClick={addTimeRange}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          Add Time Range
        </button>
      </div>

      {timeRanges.map((range, index) => (
        <div key={index} className="flex items-center gap-2">
          <Select
            value={{ value: range.start, label: range.start }}
            onChange={(option) => updateTimeRange(index, 'start', option?.value || '')}
            options={timeOptions}
            classNames={{
              control: (state) => 
                `border-2 rounded-lg ${state.isFocused ? 'border-primary-500' : 'border-neutral-300'} 
                 hover:border-primary-500 transition`,
              menu: () => "mt-1 border border-neutral-200 rounded-lg shadow-md",
              valueContainer: () => "px-3 py-1",
            }}
            className="w-32"
          />
          <span>to</span>
          <Select
            value={{ value: range.end, label: range.end }}
            onChange={(option) => updateTimeRange(index, 'end', option?.value || '')}
            options={timeOptions}
            classNames={{
              control: (state) => 
                `border-2 rounded-lg ${state.isFocused ? 'border-primary-500' : 'border-neutral-300'} 
                 hover:border-primary-500 transition`,
              menu: () => "mt-1 border border-neutral-200 rounded-lg shadow-md",
              valueContainer: () => "px-3 py-1",
            }}
            className="w-32"
          />
          {timeRanges.length > 1 && (
            <button
              type="button"
              onClick={() => removeTimeRange(index)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      {timeRanges.length === 0 && (
        <div className="text-sm text-gray-500">
          No operating hours set. Click &quot;Add Time Range&quot; to set operating hours.
        </div>
      )}
    </div>
  );
};

export default TimeSelect;