import "tailwindcss/tailwind.css";
import React, { useEffect, useReducer, createContext } from "react";
import { useListenAuthUserState } from "../lib/useListenAuthUserState";

const initialState = {};

// todo 型定義
const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return action.payload.authUser;
    case "logout":
      return initialState;
    default:
      return state;
  }
};

// todo firebase から currentuser 取得できてるので、Context 不要？？
export const AuthUserContext = createContext({});

function MyApp({ Component, pageProps }) {
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

export default MyApp;
