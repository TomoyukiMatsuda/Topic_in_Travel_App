import { Dispatch, SetStateAction } from "react";
import { firebaseAuth } from "../firebase";
import { AuthUser } from "../pages/_app";

// todo 型定義
export const useListenAuthUserState = (
  dispatch: Dispatch<SetStateAction<any>>
) => {
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
    }
  });
};
