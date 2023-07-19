import { ModalType } from "@/constant-definitions/flags";
import {
  createCategory,
  updateCategory,
} from "@/redux/states/categories/slice";
import { AppStore } from "@/redux/store";
import { Category, CreateCategoryDto, StatusType } from "@/types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./UpdateCategory.module.css";
import { X } from "react-feather";
import Field from "@/components/Shared/Field";
import Input from "@/components/Shared/Input";
import Button from "@/components/Shared/Button";

interface Props {
  setOpen: Function;
  open: boolean;
  flag: ModalType;
  idCategory?: string;
}

const ModalCategories = ({ setOpen, open, flag, idCategory }: Props) => {
  const dispatch = useDispatch();
  const { success, categories } = useSelector(
    (state: AppStore) => state.categories
  );

  const [category, setCategory] = useState<any>({
    name: "",
    status: StatusType.ACTIVE,
  });

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCategory((prev: any) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const submit = () => {
    if (flag === ModalType.CREATE) {
      dispatch(createCategory(category) as any);
    } else if (flag === ModalType.UPDATE) {
      dispatch(updateCategory(category) as any);
    }
  };

  useEffect(() => {
    if (flag === ModalType.UPDATE && idCategory) {
      const SelectedCategory: Category = categories?.find(
        (category: Category) => category.uuid === idCategory
      );

      console.log("SELETEC", SelectedCategory);

      setCategory({
        uuid: SelectedCategory?.uuid,
        name: SelectedCategory?.name,
        status: SelectedCategory?.status || StatusType.ACTIVE,
      });
    }

    if (success) {
      setOpen(false);
    }
  }, [flag, idCategory, categories, success]);
  return (
    <>
      <div className={open ? styles.overlay : styles.disabled}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2>
              {flag === ModalType.CREATE
                ? "Nueva categoria"
                : "Editar categoria"}
            </h2>
            <button onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <div className={styles.main}>
            <div>
              <div className={styles.basic}>
                <h3>Informacion basica</h3>

                <Field label="Nombre de la categoria *">
                  <Input
                    name="name"
                    placeholder="Agrega un nombre a tu categoria"
                    value={category.name}
                    onChange={handleChange}
                  />
                </Field>
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

export default ModalCategories;
