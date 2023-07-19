import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "@/redux/store";
import { CreateClientDto, Client } from "@/types/models/client";
import { StatusType } from "@/types";
import { createClient, updateClient } from "@/redux/states/clients/slice";
import Field from "@/components/Shared/Field";
import Input from "@/components/Shared/Input";
import Button from "@/components/Shared/Button";
import { X } from "react-feather";
import styles from "./ModalClients.module.css";
import { ModalType } from "@/constant-definitions/flags";

interface Props {
  setOpen: Function;
  open: boolean;
  flag: ModalType;
  idClient?: string;
}

const ModalClients = ({ setOpen, open, flag, idClient }: Props) => {
  const dispatch = useDispatch();
  const { success, clients: dataClients } = useSelector(
    (state: AppStore) => state.clients
  );

  const [client, setClient] = useState<CreateClientDto>({
   
    name: "",
    lastname: "",
    identification: 0,
    email: "",
    address: "",
    phone: 0,
    status: StatusType.ACTIVE,
  });

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setClient((prev: any) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const submit = () => {
    if (flag === ModalType.CREATE) {
      dispatch(createClient(client) as any);
    } else if (flag === ModalType.UPDATE) {
      dispatch(updateClient(client) as any);
    }
  };

  useEffect(() => {
    if (flag === ModalType.UPDATE && idClient) {
      const SelectedCustomer: Client = dataClients?.find(
        (client: Client) => client.uuid === idClient
      );

      setClient({
        uuid: SelectedCustomer?.uuid,
        name: SelectedCustomer?.name,
        lastname: SelectedCustomer?.lastname,
        identification: SelectedCustomer?.identification,
        email: SelectedCustomer?.email,
        address: SelectedCustomer?.address,
        phone: SelectedCustomer?.phone,
        status: SelectedCustomer?.status || StatusType.ACTIVE,
      });
    }
  }, [flag, idClient, dataClients]);

  useEffect(() => {
    if (success) {
      setOpen();
    }
  }, [success, dispatch]);

  return (
    <>
      <div className={open ? styles.overlay : styles.disabled}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2>
              {flag === ModalType.CREATE ? "Nuevo cliente" : "Editar cliente"}
            </h2>
            <button onClick={() => setOpen(!open)}>
              <X size={20} />
            </button>
          </div>
          <div className={styles.main}>
            <div>
              <div className={styles.basic}>
                <h3>Informacion basica</h3>
                <div className={styles.col}>
                  <Field label="Nombre*">
                    <Input
                      name="name"
                      value={client.name}
                      onChange={handleChange}
                    />
                  </Field>
                  <Field label="Apellido*">
                    <Input
                      name="lastname"
                      value={client.lastname}
                      onChange={handleChange}
                    />
                  </Field>
                </div>

                <div className={styles.col}>
                  <Field label="# Documento*">
                    <Input
                      name="identification"
                      type="number"
                      value={client.identification}
                      onChange={handleChange}
                    />
                  </Field>
                  <Field label="Telefono*">
                    <Input
                      name="phone"
                      type="number"
                      value={client.phone}
                      onChange={handleChange}
                    />
                  </Field>
                </div>
                <div className={styles.col}>
                  <Field label="Correo*">
                    <Input
                      name="email"
                      value={client.email}
                      onChange={handleChange}
                    />
                  </Field>
                  <Field label="Direccion*">
                    <Input
                      name="address"
                      value={client.address}
                      onChange={handleChange}
                    />
                  </Field>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <Button onClick={() => setOpen(!open)} variant="third">
              Descartar
            </Button>
            <Button loading={false} onClick={submit}>
              Guardar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalClients;
