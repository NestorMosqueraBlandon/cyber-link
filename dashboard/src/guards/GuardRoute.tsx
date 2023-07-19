import { PrivateRoutes, PublicRoutes } from "@/constant-definitions";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  privateValidation: boolean;
}

const PrivateValidationFragment = <Outlet />;
const PublicValidationFragment = (
  <Navigate to={PrivateRoutes.PRIVATE} replace />
);

const GuardRoute = ({ privateValidation }: Props) => {
  // const { user } = useSelector((store: AppStore) => store.auth);
  const user = true;
  return user ? (
    privateValidation ? (
      PrivateValidationFragment
    ) : (
      PublicValidationFragment
    )
  ) : (
    <Navigate replace to={PublicRoutes.SIGNIN} />
  );
};

export default GuardRoute;
