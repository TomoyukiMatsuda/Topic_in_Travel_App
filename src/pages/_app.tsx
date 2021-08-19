import "tailwindcss/tailwind.css";
import React, { useEffect, useReducer, createContext } from "react";
import { useListenAuthUserState } from "../lib/useListenAuthUserState";
import { AppProps } from "next/app";

// todo 実際に受け取る内容にカスタムしたい
export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface UserAction {
  type: string;
  payload: AuthUser;
}

const initialState = {
  id: "",
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

// todo firebase から currentuser 取得できてるので、Context 不要？？
export const AuthUserContext = createContext({});

function App({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Firebase のログインユーザー情報の変更を監視
    const unSubscription = useListenAuthUserState(dispatch);

    return () => unSubscription();
  }, [dispatch]);

  return (
    <AuthUserContext.Provider value={state}>
      <Component {...pageProps} />
    </AuthUserContext.Provider>
  );
}

export default App;
