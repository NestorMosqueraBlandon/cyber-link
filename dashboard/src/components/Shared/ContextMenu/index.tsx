import { FunctionComponent, useState } from "react";
import styles from "./ContextMenu.module.css";
import { deleteItem } from "@/utilities/confirmDelete";
import { useDispatch } from "react-redux";
import UpdateModal from "@/components/screens/update/UpdateModal";

interface Props {
  item: any;
  openMenu: boolean;
  selected: string;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  screenName: string;
}
const ContextMenu: FunctionComponent<Props> = ({
  item,
  openMenu,
  setOpenMenu,
  setSelected,
  selected,
  screenName,
}) => {
  const handlerMenu = (uuid: string): void => {
    setOpenMenu((openMenu) => !openMenu);
    setSelected(uuid);
  };

  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  const handlerUpdate = (id: string) => {
    setSelected(id);
    setOpenModalUpdate(!openModalUpdate);
  };

  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.actions}>
        <button
          className={styles.btn_context}
          onClick={() => handlerMenu(item.uuid)}
        >
          <i className="bx bx-dots-vertical-rounded"></i>
        </button>
        <div
          className={`${styles.context_menu} ${
            openMenu && selected === item.uuid ? styles.active : ""
          }`}
        >
          <button
            className={styles.editButton}
            onClick={() => handlerUpdate(item.uuid)}
          >
            Editar
          </button>
          <button
            className={styles.deleteButton}
            onClick={() => deleteItem(dispatch, screenName, item.uuid)}
          >
            Eliminar
          </button>
        </div>
      </div>
      <UpdateModal
        screenName={screenName}
        idSelected={selected}
        setOpen={setOpenModalUpdate}
        open={openModalUpdate}
      />
    </>
  );
};

export default ContextMenu;
