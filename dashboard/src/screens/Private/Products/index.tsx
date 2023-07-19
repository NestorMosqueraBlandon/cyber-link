import Table from "@/components/Containers/Table";
import { ScreenName } from "@/constant-definitions";
import Empty from "@/containers/Empty";
import ScreenContainer from "@/containers/ScreenContainer";
import ScreenHeader from "@/containers/ScreenHeader";
import { getAllProducts } from "@/redux/states/products";
import { resetProducts } from "@/redux/states/products/slice";
import { AppStore } from "@/redux/store";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalProducts from "./form";
import { ModalType } from "@/constant-definitions/flags";

const Products = () => {
  const { success, products } = useSelector(
    (state: AppStore) => state.products
  );

  const [dataFilter, setDataFilter] = useState<Product[]>();

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      dispatch(resetProducts());
    }
    dispatch(getAllProducts() as any);
  }, [dispatch, success]);

  return (
    <>
      <ScreenHeader
        title="Producto"
        defaultOptions
        setOpen={() => setOpen(true)}
      />
      <ScreenContainer data={products} setObject={setDataFilter}>
        {dataFilter && dataFilter?.length > 0 ? (
          <Table
            data={dataFilter}
            headers={[
              "Nombre",
              "Categoria",
              "Costo de compra",
              "Precio de venta",
              "Unidades",
            ]}
            keys={[
              "name",
              "category.name",
              "buy_price",
              "sale_price",
              "amount",
            ]}
            screenName={ScreenName.PRODUCT}
          />
        ) : (
          <Empty
            title="Producto"
            copy="Desde aquí puedes crear y personalizar tu catálogo de productos, gestionar tus compras, ventas, y controlar el inventario actualizado en tiempo real gracias a los múltiples informes disponibles."
            image="/tables_products.png"
          />
        )}
      </ScreenContainer>

      {open && (
        <ModalProducts setOpen={setOpen} open={open} flag={ModalType.CREATE} />
      )}
    </>
  );
};

export default Products;
