import { ReactNode, useEffect, useState } from "react";
import styles from "./ScreenContainer.module.css";
import { Briefcase, Users } from "react-feather";
import SearchCpn from "@/components/Shared/Search";
import { filterData } from "@/utilities/filteredData";

interface Props {
  children: ReactNode;
  data: any[];
  setObject: Function;
}

const ScreenContainer = ({ children, data, setObject }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };
  const newData = filterData(data, searchTerm);

  useEffect(() => {
    setObject(newData);
  }, [data, searchTerm, setObject]);

  return (
    <div className={styles.container}>
      <div className={styles.container_header}>
        <div className={styles.buttons}>
          <button>Todos</button>
          <button>
            <Briefcase size={14} />{" "}
          </button>
          <button>
            <Users size={14} />
          </button>
        </div>
        <div className={styles.options}>
          <SearchCpn onSearch={handleSearch} />
          {/**   <Input icon={<Search color="#333" size={32} />} />
           * <button className={styles.option}>
            <DownloadCloud size={18} strokeWidth={2} />{" "}
          </button> */}
        </div>
      </div>
      {children}
    </div>
  );
};

export default ScreenContainer;
