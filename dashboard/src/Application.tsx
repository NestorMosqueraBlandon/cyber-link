import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoadingBox } from "./components";
import NotFound from "./screens/NotFount";
import Signin from "./screens/Signin";
import { PublicRoutes } from "./constant-definitions";
import GuardRoute from "./guards/GuardRoute";
import Private from "./screens/Private";
import RoutesWithNotFound from "./utilities/routes-with-not-found";
import ForgotPassword from "./screens/ForgotPassword";
import Signup from "./screens/Signup";

const Application = () => {
  return (
    <Suspense fallback={<LoadingBox />}>
      <BrowserRouter>
        <RoutesWithNotFound>
          <Route path={PublicRoutes.SIGNIN} element={<Signin />} />
          <Route path={PublicRoutes.SIGNUP} element={<Signup />} />
          <Route path={PublicRoutes.FORGOT} element={<ForgotPassword />} />
          <Route element={<GuardRoute privateValidation={true} />}>
            <Route path="/*" element={<Private />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </RoutesWithNotFound>
      </BrowserRouter>
    </Suspense>
  );
};

export default Application;
