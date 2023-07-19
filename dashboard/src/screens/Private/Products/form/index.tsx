import { ModalType } from "@/constant-definitions/flags";
import { createProduct } from "@/redux/states/products";
import { resetProducts, updateProduct } from "@/redux/states/products/slice";
import { AppStore } from "@/redux/store";
import { Category, CreateProductDto, Product, StatusType } from "@/types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ModalProducts.module.css";
import { Upload, X } from "react-feather";
import Field from "@/components/Shared/Field";
import Input from "@/components/Shared/Input";
import Button from "@/components/Shared/Button";
import { useUploadImage } from "@/hooks";
import Loader from "@/components/Shared/Loader";
import { getAllCategories } from "@/redux/states/categories";

interface Props {
  setOpen: Function;
  open: boolean;
  flag: ModalType;
  idProduct?: string;
}

const ModalProducts = ({ setOpen, open, flag, idProduct }: Props) => {
  const dispatch = useDispatch();
  const { success, products } = useSelector(
    (state: AppStore) => state.products
  );
  const { uuid: uuidUser } = JSON.parse(localStorage.getItem("user") as string);
  const { uploadImage, urls, setUrls } = useUploadImage();

  const { categories: data } = useSelector(
    (state: AppStore) => state.categories
  );

  const uploadHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    await uploadImage(event.target.files![0]);
  };

  const [product, setProduct] = useState<CreateProductDto>({
    name: "",
    category: "",
    amount: 0,
    buy_price: 0,
    sale_price: 0,
    product_state: "",
    images: [],
    user: uuidUser,
  });

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setProduct((prev: any) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const submit = () => {
    if (flag === ModalType.CREATE) {
      dispatch(createProduct({ ...product, images: urls }) as any);
    } else if (flag === ModalType.UPDATE) {
      dispatch(updateProduct({ ...product, images: urls }) as any);
    }
  };

  useEffect(() => {
    if (flag === ModalType.UPDATE && idProduct) {
      const SelectedProduct: Product = products?.find(
        (product: Product) => product.uuid === idProduct
      );

      setProduct({
        uuid: SelectedProduct && SelectedProduct?.uuid,
        name: SelectedProduct && SelectedProduct.name,
        category: SelectedProduct && SelectedProduct.category,
        amount: SelectedProduct && SelectedProduct.amount,
        buy_price: SelectedProduct && SelectedProduct.buy_price,
        sale_price: SelectedProduct && SelectedProduct.sale_price,
        product_state: SelectedProduct && SelectedProduct.product_state,
        images: SelectedProduct && SelectedProduct.images,
        user: SelectedProduct && SelectedProduct.user,
      });
    }
  }, [flag, idProduct, products]);

  useEffect(() => {
    if (success) {
      dispatch(resetProducts());
      setOpen();
      setUrls([""]);
    }

    dispatch(getAllCategories() as any);
  }, [success, dispatch]);

  console.log(urls);

  return (
    <>
      <div className={open ? styles.overlay : styles.disabled}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2>
              {flag === ModalType.CREATE ? "Nuevo producto" : "Editar producto"}
            </h2>
            <button onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <div className={styles.main}>
            <div>
              <div className={styles.basic}>
                <h3>Informacion basica</h3>
                <p>
                  Describe tu producto. Puedes utilizar esta informacion en los
                  domucmentos que generes.
                </p>

                <Field label="Nombre del producto *">
                  <Input
                    name="name"
                    placeholder="Agrega un nombre a tu producto"
                    value={product.name}
                    onChange={handleChange}
                  />
                </Field>
              </div>

              <div className={styles.sells}>
                <h3>Ventas</h3>
                <p>
                  Indica el subtotal y el impuesto aplicable. El importe total
                  se calculara de forma automatica.
                </p>

                <div className={styles.col}>
                  <Field label="Costo de compra">
                    <Input
                      type="number"
                      name="buy_price"
                      value={product.buy_price}
                      onChange={handleChange}
                    />
                  </Field>
                  <Field label="Precio de venta">
                    <Input
                      type="number"
                      name="sale_price"
                      value={product.sale_price}
                      onChange={handleChange}
                    />
                  </Field>
                </div>
              </div>

              <div>
                <h3>Gestión de stock</h3>
                <p>
                  Elige si deseas hacer el seguimeinto del stock y define tu
                  almacen predeterminado.
                </p>
                <div className={styles.col}>
                  <Field label="Cantidad">
                    <Input
                      type="number"
                      name="amount"
                      value={product.amount}
                      onChange={handleChange}
                    />
                  </Field>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.category}>
                <h3>Categorizacion</h3>
                <p>
                  Incluye infromacion adicional para completar tu ficha de
                  producto.
                </p>
                <Field label="Categoria*">
                  <select
                    name="category"
                    className={styles.select}
                    onChange={handleChange}
                  >
                    <option className={styles.select_placeholder}>
                      Selecciona una categoria
                    </option>
                    {data
                      .filter(
                        (category: Category) =>
                          category.status === StatusType.ACTIVE
                      )
                      .map((category: Category) => (
                        <option key={category.uuid} value={category.uuid}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                </Field>
                <Field label="Estado del producto">
                  <select
                    name="product_state"
                    onChange={handleChange}
                    id="product_state"
                    className={styles.select}
                  >
                    <option
                      value={product.product_state}
                      className={styles.select_placeholder}
                    >
                      Selecciona el estado del producto
                    </option>
                    <option value="openbox">Open Box</option>
                    <option value="nuevo">Nuevo</option>
                    <option value="usado">Usado</option>
                  </select>
                </Field>
              </div>

              <div>
                <h3>Imagen del producto</h3>
                <p>
                  Sube una imagen de tu producto. Podras utilizarla em
                  documentos y el catalogo de la tienda.
                </p>

                <div className={styles.file_input}>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept=".png,.jpg,.jpeg,.svg"
                    onChange={uploadHandler}
                  />
                  <label htmlFor="image">
                    <div className={styles.input_box}>
                      <Upload size={20} />
                      <span>Selecciona tus archivos</span>
                    </div>
                    <div className={styles.file_types}>
                      <span>Archivos permitidos: .png, .jpg, .jpeg</span>
                    </div>
                  </label>
                </div>
                <div className={styles.container_images}>
                  {urls
                    ? urls?.map((url: string) => (
                        <div className={styles.image_wrapper} key={url}>
                          <img
                            className={styles.main_image}
                            src={url}
                            alt=""
                            key={url}
                          />
                        </div>
                      ))
                    : ""}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <Button onClick={() => setOpen(false)} variant="third">
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

export default ModalProducts;
