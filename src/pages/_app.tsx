import "tailwindcss/tailwind.css";
import React, { useEffect, useReducer, createContext, Dispatch } from "react";
import { useListenAuthUserState } from "../lib/useListenAuthUserState";
import { AppProps } from "next/app";

// todo 実際に受け取る内容にカスタムしたい
interface AuthUser {
  user: any;
}

interface UserAction {
  type: string | null;
  payload: AuthUser;
}

const initialState = {};

// todo 型定義
const reducer = (state: AuthUser, action: UserAction) => {
  switch (action.type) {
    case "login":
      if (action?.payload?.user) {
        return action.payload.user;
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
    <AuthUserContext.Provider value={{ state, dispatch }}>
      <Component {...pageProps} />
    </AuthUserContext.Provider>
  );
}

export default App;
