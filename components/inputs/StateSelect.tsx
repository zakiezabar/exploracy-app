'use client'

import useMalaysianStates from "@/app/hooks/useMalaysianStates";
import Select from 'react-select';

export type StateSelectValue = {
    label: string;
    value: string;
}

interface StateSelectProps {
    value?: StateSelectValue;
    onChange: (value: StateSelectValue) => void;
}

const StateSelect: React.FC<StateSelectProps> = ({
    value,
    onChange
}) => {
    const { getAll } = useMalaysianStates();

    return (
        <div>
            <Select 
                placeholder="Select state"
                isClearable
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as StateSelectValue)}
                formatOptionLabel={(option: any) => (
                    <div className="flex flex-row items-center gap-3">
                        <div>{option.label}</div>
                    </div>
                )}
                classNames={{
                    control: () => 'p-3 border-2',
                    input: () => 'text-lg',
                    option: () => 'text-lg'
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 8,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#E7EEDE'
                    }
                })}
            />
        </div>
    );
}

export default StateSelect;