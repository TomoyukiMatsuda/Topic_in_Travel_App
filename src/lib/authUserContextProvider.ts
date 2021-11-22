import { createContext } from "react";
import { AuthUser } from "../states/authUserState";

// todo: コンテキストをrecoilに置き換え、命名修正
export const AuthUserContext = createContext({
  id: "",
  isAdmin: false,
  name: "",
  email: "",
} as AuthUser);
