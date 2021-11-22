import "tailwindcss/tailwind.css";
import React, { useEffect, useReducer } from "react";
import { AppProps } from "next/app";
import { AuthUserContext } from "src/lib/authUserContextProvider";
import { RecoilRoot, useResetRecoilState, useSetRecoilState } from "recoil";
import { firebaseAuth } from "../firebase";

// todo 削除する
export interface AuthUser {
  id: string;
  isAdmin: boolean;
  name: string;
  email: string;
}

// todo 削除、atomファイルに定義してある
interface UserAction {
  type: string;
  payload: AuthUser;
}

const initialState = {
  id: "",
  isAdmin: false,
  name: "",
  email: "",
} as AuthUser;

// todo 型定義
const reducer = (state: AuthUser, action: UserAction) => {
  switch (action.type) {
    case "login":
      if (action?.payload) {
        return action.payload;
      } else {
        return initialState;
      }
    case "logout":
      return initialState;
    default:
      return state;
  }
};

function App({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const sub = firebaseAuth.onAuthStateChanged((user) => {
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
    return () => sub();
  }, [dispatch]);

  // todo: context廃止する
  return (
    <AuthUserContext.Provider value={state}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </AuthUserContext.Provider>
  );
}

export default App;
