import { createContext } from "react";
import { AuthUser } from "../pages/_app";
import { atom } from "recoil";

// todo: コンテキストをrecoilに置き換え
export const AuthUserContext = createContext({
  id: "",
  isAdmin: false,
  name: "",
  email: "",
} as AuthUser);

// todo: keyを作成
export const userState = atom({
  key: "userState",
  default: { id: "", isAdmin: false, name: "", email: "" } as AuthUser,
});
