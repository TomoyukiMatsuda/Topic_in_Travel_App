import { createContext } from "react";
import { AuthUser } from "../types/AuthUser";

export const AuthUserContext = createContext({
  id: "",
  isAdmin: false,
  name: "",
  email: "",
} as AuthUser);
