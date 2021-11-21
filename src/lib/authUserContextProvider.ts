import { createContext } from "react";
import { atom, selector } from "recoil";

export interface AuthUser {
  id: string;
  isAdmin: false;
  name: string;
  email: string;
}

// todo: コンテキストをrecoilに置き換え
export const AuthUserContext = createContext({
  id: "",
  isAdmin: false,
  name: "",
  email: "",
} as AuthUser);

// todo: keyを別ファイルで管理
export const userState = atom<AuthUser>({
  key: "userStateKey",
  default: { id: "", isAdmin: false, name: "", email: "" },
});

export const userSelector = selector<AuthUser>({
  key: "userSelectorKey",
  get: ({ get }) => get(userState),
});
