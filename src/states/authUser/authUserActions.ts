import { useRecoilCallback } from "recoil";
import firebase from "firebase";
import { authUserAtom } from "./authUserState";

// Recoilのstateを更新するのはactionからだけにする
export interface AuthUserActions {
  useSetAuthUser: () => (user: firebase.User) => void;
  useResetAuthUser: () => () => void;
}

export const authUserActions: AuthUserActions = {
  useSetAuthUser: () =>
    useRecoilCallback(
      ({ set }) =>
        (user: firebase.User) => {
          set(authUserAtom, {
            id: user.uid,
            isAdmin: user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL, // email で Admin ユーザーかどうかを判別
            name: user.displayName || "",
            email: user.email || "",
          });
        },
      []
    ),
  useResetAuthUser: () =>
    useRecoilCallback(
      ({ reset }) =>
        () =>
          reset(authUserAtom),
      []
    ),
};
