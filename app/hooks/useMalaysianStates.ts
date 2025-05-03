import { useState } from "react";

type State = {
  value: string;
  label: string;
};

const states = [
  { value: 'JHR', label: 'Johor' },
  { value: 'KDH', label: 'Kedah' },
  { value: 'KTN', label: 'Kelantan' },
  { value: 'MLK', label: 'Malacca' },
  { value: 'NSN', label: 'Negeri Sembilan' },
  { value: 'PHG', label: 'Pahang' },
  { value: 'PNG', label: 'Penang' },
  { value: 'PRK', label: 'Perak' },
  { value: 'PLS', label: 'Perlis' },
  { value: 'SBH', label: 'Sabah' },
  { value: 'SWK', label: 'Sarawak' },
  { value: 'SGR', label: 'Selangor' },
  { value: 'TRG', label: 'Terengganu' },
  { value: 'KUL', label: 'Kuala Lumpur' },
  { value: 'LBN', label: 'Labuan' },
  { value: 'PJY', label: 'Putrajaya' },
  { value: 'ID', label: 'Indonesia' }
];

const useMalaysianStates = () => {
  const getAll = () => states;

  const getByValue = (value: string) => {
      return states.find((state) => state.value === value);
  }

  return {
      getAll,
      getByValue
  };
}

export default useMalaysianStates;