import React, { useState } from 'react';
import styles from './SelectWithSearch.module.css';
import { ArrowDown, ChevronDown } from 'react-feather';

interface SelectWithSearchProps {
  options: any[];
}

const SelectWithSearch: React.FC<SelectWithSearchProps> = ({ options }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptionText, setSelectedOptionText] = useState('');
  const [open, setOpen] = useState(false);
 
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleOptionSelect = (name: string, uuid: string) => {
   setOpen(false); 
   setSelectedOption(uuid);
   setSelectedOptionText(name);
  };

  const filteredOptions = options?.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.select_container}>
      <div
        className={styles.select_element}
      >
       <span onClick={() => setOpen(!open)}>{selectedOptionText.length > 0? selectedOptionText: 'Seleccionar contacto' } <ChevronDown size={16} /> </span>
        {open && (
        <div className={styles.options_container}>
         
          <input
        type="text"
        className={styles.search_input}
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className={styles.options}>
       
        {filteredOptions.map((option) => (
          <span onClick={() => handleOptionSelect(option.name, option.uuid)} key={option.uuid}>
            {option.name}
          </span>
        ))}
      </div>
        
        </div>
        )} 
        
      </div>
    </div>
  );
};

export default SelectWithSearch;
