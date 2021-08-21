import { createContext } from "react";
import { AuthUser } from "../pages/_app";

export const AuthUserContext = createContext({
  id: "",
  isAdmin: false,
  name: "",
  email: "",
} as AuthUser);
