import { MoreVertical } from "react-feather";
import styles from "./ScreenHeader.module.css";
import ButtonOptions from "@/components/Shared/ButtonOptions";

interface Props {
  title: string;
  letter?: string;
  setOpen?: () => void;
  defaultOptions?: boolean;
  children?: React.ReactNode;
}

const ScreenHeader = ({
  title,
  letter,
  defaultOptions,
  children,
  setOpen,
}: Props) => {
  return (
    <div className={styles.header}>
      <h2>
        {title}
        {letter ? letter : ""}s
      </h2>
      <div className={styles.options}>
        {children}
        {defaultOptions && (
          <>
            <button onClick={setOpen} className={styles.create}>
              Nuev{letter ? "o" : title.charAt(title.length - 1)}{" "}
              {title.toLowerCase()}{" "}
              <span
                className={styles.shortcut}
                title="Acceso directo, presiona N"
              >
                N
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ScreenHeader;
