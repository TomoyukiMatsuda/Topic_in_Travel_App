import { Dispatch, SetStateAction } from "react";
import { firebaseAuth } from "../firebase";

// todo 型定義
export const useListenAuthUserState = (
  dispatch: Dispatch<SetStateAction<any>>
) => {
  return firebaseAuth.onAuthStateChanged((user) => {
    if (user) {
      // todo ログインユーザーを保持する処理
      dispatch({
        type: "login",
        payload: {
          user,
        },
      });
    } else {
      // todo ログアウト　ユーザー情報をからにする処理
      dispatch({ type: "logout" });
    }
  });
};
