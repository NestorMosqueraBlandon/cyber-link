import React, { FormEvent, useEffect, useState } from "react";
import styles from "./Signin.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Field from "@/components/Shared/Field";
import Input from "@/components/Shared/Input";
import { PrivateRoutes, PublicRoutes } from "@/constant-definitions";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "@/redux/store";
import { login } from "@/redux/states/auth";
import Button from "@/components/Shared/Button";
import { setError } from "@/utilities/setError";
import { getAccountsByUser } from "@/redux/states/accounts";

const Signin = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const {
    loading,
    success,
    user: auth,
    error,
  } = useSelector((state: AppStore) => state.auth);

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const dispatch = useDispatch();

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(login({ email: user.email, password: user.password }) as any);
  };

  useEffect(() => {
    if (success) {
      dispatch(getAccountsByUser(auth?.token) as any);
      navigate(PrivateRoutes.HOME, { replace: true });
    }
  }, [success, navigate]);

  return (
    <>
      <div className={styles.header}>
        <img src="/cl_logo.png" alt="Logo" title="Logo" />

        <div>
          <Link to={"/signup"}>No tienes cuenta? registrate aqui</Link>
        </div>
      </div>

      <form className={styles.form} onSubmit={onSubmit}>
        <h2 className={styles.title}>Inicia sesión</h2>
        <Field label="Email">
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Introduce tu correo electronico"
            onChange={handleChange}
          />
        </Field>
        <Field label="Contraseña" error={setError(error)}>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Introduce tu Contraseña"
            onChange={handleChange}
          />

        </Field>
        <label htmlFor="remember" className={styles.remember}>
          <input type="checkbox" name="remember" id="remember" />
          Recuérdame
        </label>
        <Button loading={loading} type="submit" className={styles.submit}>
          Iniciar sesion
        </Button>
        <Link to={PublicRoutes.FORGOT}>¿Has olvidado tu contraseña?</Link>
      </form>
    </>
  );
};

export default Signin;
