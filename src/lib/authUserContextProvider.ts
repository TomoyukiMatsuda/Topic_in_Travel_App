import { createContext } from "react";
import { AuthUser } from "../pages/_app";

export const AuthUserContext = createContext({
  id: "",
  name: "",
  email: "",
} as AuthUser);
