import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import items from "./items";
import { useEffect, useState } from "react";
import { HelpCircle, LogOut, User } from "react-feather";
import HeaderLink from "@/components/Shared/HeaderLink";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/states/auth";
import { PrivateRoutes } from "@/constant-definitions";
interface SubPath {
  name: string;
  path: string;
}
interface Path extends SubPath {
  subPaths?: SubPath[];
}
const Header = () => {
  const [active, setActive] = useState("");
  const { name, lastname, email } = JSON.parse(
    localStorage.getItem("user") as string
  );

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout() as any);
  };

  useEffect(() => {
    //  dispatch(getAdmin(auth.token) as any)
  }, [dispatch]);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link
          to="/"
          onClick={() => setActive(() => "")}
          className={
            active == "" ? `${styles.active_logo} ${styles.logo}` : styles.logo
          }
        >
          <img src="/cl_logo.png" alt="Logo Helebba" width={40} />{" "}
        </Link>
        {items.map((item: Path) => (
          <HeaderLink active={setActive} key={item.name} {...item} />
        ))}
      </nav>
      <div>
        <button>
          <HelpCircle color="#fff" size={20} />
        </button>
        <div className={styles.user_btn} onClick={() => setOpen(!open)}>
          <span>{"Admin".charAt(0)}</span>
          <div>
            <h3 className={styles.user_name}>
              {name} {lastname}
            </h3>
            <p className={styles.account}>{email}</p>
          </div>
          {open && (
            <ul className={styles.user_options}>
              <li>
                <Link to={PrivateRoutes.SETTINGS_USER}>
                  <User size={16} /> Editar perfil
                </Link>
              </li>

              <span className={styles.sepator}></span>
              <li>
                <button onClick={logoutHandler}>
                  <LogOut size={16} /> Desconectar
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
