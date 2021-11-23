import { atom, selector } from "recoil";
import { AuthUser } from "../../types/AuthUser";

// todo: keyを別ファイルで管理
export const authUserAtom = atom<AuthUser>({
  key: "userAtomKey",
  // todo: nullにするかどうか検討, nullでも良さそう
  default: { id: "", isAdmin: false, name: "", email: "" },
});

// todo 必要に応じて別ファイルに切り出し
export const authUserSelector = selector<AuthUser>({
  key: "userSelectorKey",
  get: ({ get }) => get(authUserAtom),
});
