import { Dispatch, SetStateAction } from "react";
import { firebaseAuth } from "../firebase";

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
          name: user.displayName,
          email: user.email,
        },
      });
    } else {
      // ログインユーザー情報を空にする
      dispatch({
        type: "logout",
        payload: {
          id: "",
          name: "",
          email: "",
        },
      });
    }
  });
};
