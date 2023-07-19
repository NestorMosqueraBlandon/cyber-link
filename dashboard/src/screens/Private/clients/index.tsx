import Table from "@/components/Containers/Table";
import { ScreenName } from "@/constant-definitions";
import Empty from "@/containers/Empty";
import ScreenContainer from "@/containers/ScreenContainer";
import ScreenHeader from "@/containers/ScreenHeader";
import { getAllClients } from "@/redux/states/clients";
import { resetClient } from "@/redux/states/clients/slice";
import { AppStore } from "@/redux/store";
import { Client } from "@/types/models/client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalType } from "@/constant-definitions/flags";
import ModalClients from "./form";

const ClientScreen = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { success, clients } = useSelector((state: AppStore) => state.clients);
  const [dataFilter, setDataFilter] = useState<Client[]>();
  useEffect(() => {
    if (success) {
      dispatch(resetClient());
    }
    dispatch(getAllClients() as any);
  }, [dispatch, success]);
  return (
    <>
      <ScreenHeader
        title="Cliente"
        defaultOptions
        setOpen={() => setOpen(true)}
      />
      <ScreenContainer data={clients} setObject={setDataFilter}>
        {dataFilter && dataFilter?.length > 0 ? (
          <Table
            data={dataFilter}
            headers={[
              "Nombre",
              "Apellido",
              "Identificacion",
              "Correo",
              "Direccion",
              "telefono",
            ]}
            keys={[
              "name",
              "lastname",
              "identification",
              "email",
              "address",
              "phone",
            ]}
            screenName={ScreenName.CLIENT}
          />
        ) : (
          <Empty
            title="Cliente"
            copy="Desde aquí puedes crear y personalizar tus clientes en tiempo real gracias a los múltiples informes disponibles."
            image="/tables_products.png"
          />
        )}
      </ScreenContainer>
      {open && (
        <ModalClients setOpen={setOpen} open={open} flag={ModalType.CREATE} />
      )}
    </>
  );
};

export default ClientScreen;
