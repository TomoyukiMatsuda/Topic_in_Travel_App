import { Dispatch, SetStateAction } from "react";
import { firebaseAuth } from "../firebase";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { AuthUser, authUserSelector } from "../states/authUserState";

// ログインユーザーの状態監視関数
// todo まずはここを Recoil に置き換えたい
export const useListenAuthUserState = (
  dispatch: Dispatch<SetStateAction<any>>
) => {
  const setAuthUser = useSetRecoilState(authUserSelector);
  const resetAuthUser = useResetRecoilState(authUserSelector);

  return firebaseAuth.onAuthStateChanged((user) => {
    if (user) {
      // ログインユーザー情報をセット
      dispatch({
        type: "login",
        payload: {
          id: user.uid,
          isAdmin: user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL, // email でAdmin ユーザーかどうかを判別
          name: user.displayName,
          email: user.email,
        } as AuthUser,
      });

      // recoilのユーザーを更新
      setAuthUser({
        id: user.uid,
        isAdmin: user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL, // email でAdmin ユーザーかどうかを判別
        name: user.displayName || "",
        email: user.email || "",
      });
    } else {
      // ログインユーザー情報を空にする
      dispatch({
        type: "logout",
        payload: {
          id: "",
          isAdmin: false,
          name: "",
          email: "",
        } as AuthUser,
      });

      // recoilユーザーstateをリセット
      resetAuthUser();
    }
  });
};
