import Table from "@/components/Containers/Table";
import { ScreenName } from "@/constant-definitions";
import Empty from "@/containers/Empty";
import ScreenContainer from "@/containers/ScreenContainer";
import ScreenHeader from "@/containers/ScreenHeader";
import { getAllOrders } from "@/redux/states/orders";
import { resetOrders } from "@/redux/states/orders/slice";
import { AppStore } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const { success, orders } = useSelector((state: AppStore) => state.orders);

  const [open, setOpen] = useState(false);
  const [dataFilter, setDataFilter] = useState<any[]>();
  useEffect(() => {
    if (success) {
      dispatch(resetOrders());
    }
    dispatch(getAllOrders() as any);
  }, [dispatch, success]);
  return (
    <>
      <ScreenHeader
        title="Venta"
        defaultOptions
        setOpen={() => setOpen(true)}
      />
      <ScreenContainer data={orders} setObject={setDataFilter}>
        {dataFilter && dataFilter?.length > 0 ? (
          <Table
            data={dataFilter}
            headers={[
              "Nombre",
              "Apellido",
              "Cedula",
              "Productos",
              "Total",
              "Estado",
            ]}
            keys={[
              "client.name",
              "client.lastname",
              "client.identification",
              "products.name",
              "total_price",
              "order_status",
            ]}
            screenName={ScreenName.ORDER}
          />
        ) : (
          <Empty
            title="Order"
            copy="Desde aquí puedes crear y personalizar tus ventas en tiempo real gracias a los múltiples informes disponibles."
            image="/tables_products.png"
          />
        )}
      </ScreenContainer>
    </>
  );
};

export default OrderScreen;
