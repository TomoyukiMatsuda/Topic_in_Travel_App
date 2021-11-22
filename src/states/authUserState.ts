import { atom, selector } from "recoil";

export interface AuthUser {
  id: string;
  isAdmin: boolean;
  name: string;
  email: string;
}

// todo: keyを別ファイルで管理
export const authUserState = atom<AuthUser>({
  key: "userStateKey",
  default: { id: "", isAdmin: false, name: "", email: "" },
});

// todo 必要に応じて別ファイルに切り出し
export const authUserSelector = selector<AuthUser>({
  key: "userSelectorKey",
  get: ({ get }) => get(authUserState),
});
