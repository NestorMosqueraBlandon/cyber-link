import Table from "@/components/Containers/Table";
import { ScreenName } from "@/constant-definitions";
import Empty from "@/containers/Empty";
import ScreenContainer from "@/containers/ScreenContainer";
import ScreenHeader from "@/containers/ScreenHeader";
import { getAllCategories } from "@/redux/states/categories";
import { resetCategory } from "@/redux/states/categories/slice";
import { AppStore } from "@/redux/store";
import { Category } from "@/types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalCategories from "./form";
import { ModalType } from "@/constant-definitions/flags";

const CategoriesScreen = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { success, categories } = useSelector(
    (state: AppStore) => state.categories
  );
  const [dataFilter, setDataFilter] = useState<Category[]>();

  useEffect(() => {
    if (success) {
      dispatch(resetCategory());
    }
    dispatch(getAllCategories() as any);
  }, [dispatch, success]);
  return (
    <>
      <ScreenHeader
        title="Categoria"
        defaultOptions
        setOpen={() => setOpen(true)}
      />
      <ScreenContainer data={categories} setObject={setDataFilter}>
        {dataFilter && dataFilter?.length > 0 ? (
          <Table
            data={dataFilter}
            headers={["Nombre"]}
            keys={["name"]}
            screenName={ScreenName.CATEGORY}
          />
        ) : (
          <Empty
            title="Categoria"
            copy="Desde aquí puedes crear y personalizar tus categorias en tiempo real gracias a los múltiples informes disponibles."
            image="/tables_products.png"
          />
        )}
      </ScreenContainer>
      {open && (
        <ModalCategories
          setOpen={setOpen}
          open={open}
          flag={ModalType.CREATE}
        />
      )}
    </>
  );
};

export default CategoriesScreen;
