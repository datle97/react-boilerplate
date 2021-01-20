import { useState } from 'react';

const useSelect = () => {
  const [isSelect, setIsSelect] = useState(null);
  const handleSelect = id => {
    setIsSelect(id);
  };
  const handleUnselect = () => {
    setIsSelect(null);
  };
  return { isSelect, handleSelect, handleUnselect };
};

export default useSelect;
