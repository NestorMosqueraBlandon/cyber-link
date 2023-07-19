import { useDispatch, useSelector } from "react-redux";
import styles from "./Orders.module.css";
import { AppStore } from "@/redux/store";
import { useEffect } from "react";
import { resetOrders, updateStatusOrder } from "@/redux/states/orders/slice";
import { getAllOrders } from "@/redux/states/orders";
import { X } from "react-feather";
import { UpdateProductDto } from "@/types";
import Button from "@/components/Shared/Button";
import swal from "sweetalert";

interface Props {
  open: boolean;
  idOrder: string;
  setOpen: Function;
}

const OrderForm = ({ open, setOpen, idOrder }: Props) => {
  const dispatch = useDispatch();
  const { success, orders } = useSelector((state: AppStore) => state.orders);
  const { client, products, total_price }: any = orders?.find(
    (o: any) => o.uuid === idOrder || 1
  );

  const handlerUpdateStatus = () => {
    swal({
      text: "Estas seguro de actualizar el estado de la venta",
      icon: "warning",
      buttons: ["Cancelar", "Actualizar"],
      dangerMode: true,
    }).then((willDelete: any) => {
      if (willDelete) {
        dispatch(updateStatusOrder(idOrder) as any);

        swal("Estado actualizado", {
          icon: "success",
        });
      }
    });
  };

  useEffect(() => {
    if (success) {
      dispatch(resetOrders());
    }
    dispatch(getAllOrders() as any);
  }, [dispatch, success]);

  return (
    <>
      <div className={open ? styles.overlay : styles.disabled}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2>Detalle de la compra</h2>
            <button onClick={() => setOpen(!open)}>
              <X size={20} />
            </button>
          </div>
          <div className={styles.main}>
            <div className={styles.cnt_name_client}>
              <h5>Cliente</h5>
              <span>
                {client?.name} {client?.lastname}
              </span>
            </div>
            <div className={styles.personal_data}>
              <div className={styles.pd_item}>
                <span>Cedula</span>
                <p>{client?.identification}</p>
              </div>
              <div className={styles.pd_item}>
                <span>Telefono</span>
                <p>{client?.phone}</p>
              </div>
              <div className={styles.pd_item}>
                <span>Correo</span>
                <p>{client?.email}</p>
              </div>
            </div>
            <div className={styles.container_products}>
              <h3>Lista de productos</h3>

              {products?.map((product: UpdateProductDto) => (
                <div className={styles.data_products}>
                  <p>{product?.name}</p>
                  <span>${product?.sale_price}</span>
                </div>
              ))}
            </div>
            <div className={styles.total}>
              <p>Subtotal </p>
              <span>${total_price}</span>
            </div>
            <div className={styles.cnt_button}>
              <Button onClick={handlerUpdateStatus}>Confirmar Venta</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderForm;
