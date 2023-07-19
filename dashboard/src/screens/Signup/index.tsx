import styles from "./Signup.module.css";
import Field from "@/components/Shared/Field";
import Input from "@/components/Shared/Input";
import Button from "@/components/Shared/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/redux/states/auth";
import { AppStore } from "@/redux/store";
import { Link, useNavigate } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "@/constant-definitions";
import { CreateUserDto } from "@/types/models/user";
import swal from "sweetalert";
import { StatusType } from "@/types";

const Signup = () => {
  const { success } = useSelector((state: AppStore) => state.users);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState<CreateUserDto>({
    name: "",
    lastname: "",
    identification: 0,
    email: "",
    password: "",
    address: "",
    phone: 0,
    photo: "",
    username: "",
    status: StatusType.ACTIVE,
  });

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUser((prev: any) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(user) as any)
      .then(() => {
        swal("Registro de usuario exitoso", {
          icon: "success",
        }).then(() => {
          window.location.replace(PrivateRoutes.HOME);
        });
      })
      .catch((error: Error) => {
        console.error(`Error al crear el usuario: ${error.message}`, error);

        swal("Error al crear el usuario", {
          icon: "error",
        });
      });
  };

  return (
    <>
      <div className={styles.container_form}>
        <form className={styles.form}>
          <h2 className={styles.title}>Registro de usuario</h2>
          <div className={styles.form_items}>
            <div className={styles.items_left}>
              <Field label="Nombre">
                <Input
                  type="name"
                  name="name"
                  id="name"
                  placeholder="Introduce tu nombre"
                  onChange={handleChange}
                />
              </Field>
              <Field label="Apellido">
                <Input
                  type="lastname"
                  name="lastname"
                  id="lastname"
                  placeholder="Introduce tu Apellido"
                  onChange={handleChange}
                />
              </Field>

              <Field label="Email">
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Introduce tu correo electronico"
                  onChange={handleChange}
                />
              </Field>
              <Field label="Contraseña">
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Introduce tu Contraseña"
                  onChange={handleChange}
                />
              </Field>
            </div>
            <div className={styles.items_right}>
              <Field label="Documento">
                <Input
                  type="identification"
                  name="identification"
                  id="identification"
                  placeholder="Introduce tu numero de documento"
                  onChange={handleChange}
                />
              </Field>
              <Field label="Direccion">
                <Input
                  type="address"
                  name="address"
                  id="address"
                  placeholder="Introduce tu direccion"
                  onChange={handleChange}
                />
              </Field>

              <Field label="telefono">
                <Input
                  type="phone"
                  name="phone"
                  id="phone"
                  placeholder="Introduce tu telefono"
                  onChange={handleChange}
                />
              </Field>
            </div>
          </div>

          <Button type="submit" className={styles.submit} onClick={onSubmit}>
            Registrarse
          </Button>
          <div className={styles.footer_signup}>
            <p>
              {" "}
              Ya tienes cuenta,{" "}
              <Link to={PublicRoutes.SIGNIN}>Inicia Sesion Aqui</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
