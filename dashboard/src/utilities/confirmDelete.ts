import swal from "sweetalert";
import { deleteStatusCategory } from "@/redux/states/categories/slice";
import { deleteStatusClient } from "@/redux/states/clients/slice";
import { deleteStatusProduct } from "@/redux/states/products/slice";
import { deleteStatusOrder } from "@/redux/states/orders/slice";

const confirmationMessages = {
  category: "¿Estás seguro de que deseas eliminar esta Categoría?",
  product: "¿Estás seguro de que deseas eliminar este Producto?",
  client: "¿Estás seguro de que deseas eliminar este Cliente?",
  order: "¿Estás seguro de que deseas eliminar esta venta?",
};

const successMessages = {
  category: "Categoría eliminada correctamente.",
  product: "Producto eliminado correctamente.",
  client: "Cliente eliminado correctamente.",
  order: "Venta eliminada correctamente.",
};

type ItemConfig = {
  [key: string]: {
    confirmationMessage: string;
    successMessage: string;
    deleteAction: (uuid: string) => void;
  };
};

const itemConfig: ItemConfig = {
  category: {
    confirmationMessage: confirmationMessages.category,
    successMessage: successMessages.category,
    deleteAction: deleteStatusCategory,
  },
  product: {
    confirmationMessage: confirmationMessages.product,
    successMessage: successMessages.product,
    deleteAction: deleteStatusProduct,
  },
  client: {
    confirmationMessage: confirmationMessages.client,
    successMessage: successMessages.client,
    deleteAction: deleteStatusClient,
  },
  order: {
    confirmationMessage: confirmationMessages.order,
    successMessage: successMessages.order,
    deleteAction: deleteStatusOrder,
  },
};

export const deleteItem = (dispatch: any, name: string, uuid: string) => {
  const config = itemConfig[name];

  if (config) {
    swal({
      text: config.confirmationMessage,
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    }).then((willDelete: any) => {
      if (willDelete) {
        dispatch(config.deleteAction(uuid));
        uuid = "";
        swal(config.successMessage, {
          icon: "success",
        });
      }
    });
  }
};
