import styles from "./Settings.module.css";
import Field from "@/components/Shared/Field";
import Input from "@/components/Shared/Input";
import Button from "@/components/Shared/Button";
import { useState } from "react";
import { BodyPassword } from "@/redux/states/auth/slice";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { UpdateUser, updatePasswordThunks } from "@/redux/states/auth";
import { useNavigate } from "react-router-dom";
import { UpdateUserDto, User } from "@/types/models/user";

const SettingsUser = () => {
  const userData: any = JSON.parse(localStorage.getItem("user") as string);
  const dispatch = useDispatch();
  const [newData, setNewData] = useState<BodyPassword>({
    userId: userData.uuid,
    currentPassword: userData.password,
    newPassword: "",
  });

  const [userUpdate, setUserUpdate] = useState<UpdateUserDto>({
    uuid: userData.uuid,
    name: userData.name,
    lastname: userData.lastname,
    email: userData.email,
    phone: 0,
  });
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "newPassword") {
      setNewData((prev: any) => ({
        ...prev,
        newPassword: value,
      }));
    } else if (name === "confirmNewPassword") {
      setConfirmNewPassword(value);
    }
  };

  const handleChangeUser = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUserUpdate((prev: any) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const HandlerPassword = () => {
    if (newData.newPassword !== confirmNewPassword) {
      swal({
        text: "La contraseña y la confirmación no coinciden",
        icon: "warning",
        buttons: ["Cancelar", "Aceptar"],
        dangerMode: true,
      });
    } else {
      swal({
        text: "¿Estás seguro de que deseas cambiar la contraseña?",
        icon: "warning",
        buttons: ["Cancelar", "Cambiar"],
        dangerMode: true,
      }).then((confirmChange) => {
        if (confirmChange) {
          dispatch(updatePasswordThunks(newData) as any)
            .then(() => {
              swal("Contraseña cambiada correctamente.", {
                icon: "success",
              });
            })
            .catch(() => {
              swal("Hubo un error al cambiar la contraseña.", {
                icon: "error",
              });
            });
        }
      });
    }
  };
  const navigate = useNavigate();
  const HandlerUpdate = () => {
    swal({
      text: "¿Estás seguro de que deseas actualizar el usuario?",
      icon: "warning",
      buttons: ["Cancelar", "Actualizar"],
      dangerMode: true,
    }).then((confirmUpdate) => {
      if (confirmUpdate) {
        dispatch(UpdateUser(userUpdate) as any)
          .then(() => {
            swal("Usuario actualizado correctamente.", {
              icon: "success",
            }).then(() => {
              navigate("/");
            });
          })
          .catch(() => {
            swal("Hubo un error al actualizar el usuario.", {
              icon: "error",
            });
          });
      }
    });
  };
  return (
    <div className={styles.container_Setting}>
      <div className={styles.container_settings}>
        <div className={styles.info_basic}>
          <div className={styles.header_screen}>
            <h1>MI PERFIL</h1>
            <Button onClick={HandlerUpdate}>Guardar</Button>
          </div>

          <Field label="Nombre">
            <Input
              name="name"
              value={userUpdate.name}
              onChange={handleChangeUser}
            />
          </Field>

          <Field label="Apellido">
            <Input
              name="lastname"
              value={userUpdate.lastname}
              onChange={handleChangeUser}
            />
          </Field>

          <Field label="Correo">
            <Input
              name="email"
              value={userUpdate.email}
              onChange={handleChangeUser}
            />
          </Field>

          <Field label="Telefono">
            <Input
              name="phone"
              value={userUpdate.phone}
              onChange={handleChangeUser}
            />
          </Field>
        </div>
        <div className={styles.sec_info}>
          <div className={styles.info_basic}>
            <div className={styles.container_image}>
              {!userData.photo ||
              userData.photo === "https://example.com/johndoe.jpg" ? (
                <img src="/defaultUser.svg" />
              ) : (
                <img src={userData.photo} />
              )}
            </div>
            <Button>Cambiar imagen</Button>
          </div>
          <div className={styles.info_basic}>
            <Field label="Nueva Contraseña">
              <Input
                type="password"
                name="newPassword"
                value={newData.newPassword}
                onChange={handleChange}
              />
            </Field>
            <Field label="Confirma Nueva Contraseña">
              <Input
                type="password"
                name="confirmNewPassword"
                value={confirmNewPassword}
                onChange={handleChange}
              />
            </Field>
            <Button onClick={HandlerPassword}>Guardar Contraseña</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsUser;
