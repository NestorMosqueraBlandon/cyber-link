import React from "react";
import styles from "./Search.module.css";

const SearchCpn: React.FC<{ onSearch: (value: string) => void }> = ({
  onSearch,
}) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onSearch(value);
  };

  return (
    <div className={styles.group}>
      <input
        placeholder="Buscar..."
        type="search"
        className={styles.input_src}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchCpn;
