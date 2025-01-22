import React, { useState } from 'react';
import { useDebounce } from '@/app/hooks/useDebounce';
import AsyncSelect from 'react-select/async';
import { X } from 'lucide-react';
import Image from 'next/image';

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface UserAutoCompleteProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const UserAutoComplete: React.FC<UserAutoCompleteProps> = ({
  value,
  onChange
}) => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 500);

  // Function to fetch users - replace with your actual API call
  const loadUsers = async (inputValue: string) => {
    try {
      const response = await fetch(`/api/users/search?query=${inputValue}`);
      const data = await response.json();
      return data.map((user: User) => ({
        value: user.id,
        label: user.email,
        user: user
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };

  // Format the options for react-select
  const formatOptionLabel = ({ user }: { user: User }) => (
    <div className="flex items-center gap-2">
      {user.image && (
        <Image
          src={user.image} 
          alt={user.name} 
          className="w-6 h-6 rounded-full"
        />
      )}
      <div>
        <div className="font-medium">{user.name}</div>
        <div className="text-sm text-gray-500">{user.email}</div>
      </div>
    </div>
  );

  const removeUser = (userId: string) => {
    onChange(value.filter(id => id !== userId));
    setSelectedUsers(prev => prev.filter(user => user.id !== userId));
  };

  return (
    <div className="space-y-2">
      <AsyncSelect
        isMulti
        value={selectedUsers.map(user => ({
          value: user.id,
          label: user.email,
          user: user
        }))}
        loadOptions={loadUsers}
        onChange={(newValue) => {
          const users = newValue.map(v => v.user);
          setSelectedUsers(users);
          onChange(users.map(u => u.id));
        }}
        onInputChange={(newValue) => setInputValue(newValue)}
        formatOptionLabel={formatOptionLabel}
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
        placeholder="Search users by email or username..."
      />

      {selectedUsers.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedUsers.map((user) => (
            <div 
              key={user.id}
              className="flex items-center gap-1 bg-primary-50 text-primary-700 px-2 py-1 rounded-full"
            >
              {user.image && (
                <Image 
                  src={user.image} 
                  alt={user.name} 
                  className="w-4 h-4 rounded-full"
                />
              )}
              <span className="text-sm">{user.name}</span>
              <button
                onClick={() => removeUser(user.id)}
                className="text-primary-700 hover:text-primary-900"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserAutoComplete;