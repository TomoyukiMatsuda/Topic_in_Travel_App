import "tailwindcss/tailwind.css";
import React, { useEffect, useReducer } from "react";
import { useListenAuthUserState } from "../lib/useListenAuthUserState";
import { AppProps } from "next/app";
import { AuthUserContext } from "src/lib/authUserContextProvider";
import { RecoilRoot } from "recoil";

// todo 削除、atomファイルに定義してある
export interface AuthUser {
  id: string;
  isAdmin: false;
  name: string;
  email: string;
}

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
    // Firebase のログインユーザー情報の変更を監視、検知する
    const unSubscription = useListenAuthUserState(dispatch);
    // ログインユーザー監視をアンマウントのタイミングで解除
    return () => unSubscription();
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
