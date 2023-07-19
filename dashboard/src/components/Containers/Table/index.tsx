import React, { useState } from "react";
import styles from "./Table.module.css";
import { DivisaFormater } from "@/utilities/divisa-formater";
import { Link } from "react-router-dom";
import ContextMenu from "@/components/Shared/ContextMenu";

interface DataRecord {
  [key: string]: any;
}

interface Props<T extends DataRecord> {
  data: T[];
  headers: string[];
  keys: string[];
  screenName: string;
}

const Table = <T extends DataRecord>({
  headers,
  data,
  keys,
  screenName,
}: Props<T>) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [selected, setSelected] = useState("");
  return (
    <div className={styles.table_wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.uuid}>
              {keys.map((key) => (
                <td key={key}>
                  <Link to={`/products/${d.uuid}`}>
                    {key === "buy_price" ||
                    key === "sale_price" ||
                    key === "sub_total"
                      ? DivisaFormater({ value: d[key.toLowerCase()] })
                      : key == "category.name"
                      ? d.category?.name
                      : key == "client.lastname"
                      ? d.client?.lastname
                      : key == "client.name"
                      ? d.client?.name
                      : key == "client.identification"
                      ? d.client?.identification
                      : key === "products.name"
                      ? d.products?.map((product: any) => product.name + " / ")
                      : d[key.toLowerCase()]}
                  </Link>
                </td>
              ))}
              <td>
                <ContextMenu
                  item={d}
                  openMenu={openMenu}
                  selected={selected}
                  setSelected={setSelected}
                  setOpenMenu={setOpenMenu}
                  screenName={screenName}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
