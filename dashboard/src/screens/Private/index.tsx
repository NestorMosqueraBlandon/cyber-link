import { Layout } from "@/components";
import { PrivateRoutes } from "@/constant-definitions";
import { Route } from "react-router-dom";
import RoutesWithNotFound from "@/utilities/routes-with-not-found";
import Products from "./Products";
import CategoriesScreen from "./Categories";
import SettingsUser from "./Settings";
import OrderScreen from "./orders";
import ClientScreen from "./clients";


const Private = () => {
  return (
    <Layout>
      <RoutesWithNotFound>
        <Route path={PrivateRoutes.PRODUCTS} element={<Products />} />
        <Route path={PrivateRoutes.CATEGORIES} element={<CategoriesScreen />} />
        <Route path={PrivateRoutes.CLIENTS} element={<ClientScreen />} />
        <Route path={PrivateRoutes.SETTINGS_USER} element={<SettingsUser />} />
        <Route path={PrivateRoutes.ORDERS} element={<OrderScreen />} />
      </RoutesWithNotFound>
    </Layout>
  );
};

export default Private;
