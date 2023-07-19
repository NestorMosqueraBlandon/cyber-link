import { RouteOptions } from "fastify";
import { loginRoute } from "./login";
import { registerUserRoute } from "./register";
import { updatePasswordRoute } from "./changePassword";
import { updateUserRoute } from "./update";

export const authRoutes: RouteOptions[] = [
  loginRoute,
  registerUserRoute,
  updatePasswordRoute,
  updateUserRoute
];
