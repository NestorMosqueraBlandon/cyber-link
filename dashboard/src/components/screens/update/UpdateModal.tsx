import { ScreenName } from "@/constant-definitions";
import { ModalType } from "@/constant-definitions/flags";
import ModalCategories from "@/screens/Private/Categories/form";
import ModalClients from "@/screens/Private/clients/form";
import ModalProducts from "@/screens/Private/Products/form";
import OrderForm from "@/screens/Private/orders/form";

interface Props {
  screenName: string;
  idSelected: string;
  setOpen: Function;
  open: boolean;
}
const UpdateModal = ({ screenName, idSelected, setOpen, open }: Props) => {
  return (
    <>
      {screenName === ScreenName.CLIENT ? (
        <ModalClients
          setOpen={setOpen}
          open={open}
          idClient={idSelected}
          flag={ModalType.UPDATE}
        />
      ) : screenName === ScreenName.CATEGORY ? (
        <ModalCategories
          setOpen={setOpen}
          open={open}
          idCategory={idSelected}
          flag={ModalType.UPDATE}
        />
      ) : screenName === ScreenName.PRODUCT ? (
        <ModalProducts
          setOpen={setOpen}
          open={open}
          idProduct={idSelected}
          flag={ModalType.UPDATE}
        />
      ) : screenName === ScreenName.ORDER ? (
        <OrderForm open={open} setOpen={setOpen} idOrder={idSelected} />
      ) : (
        ""
      )}
    </>
  );
};

export default UpdateModal;
