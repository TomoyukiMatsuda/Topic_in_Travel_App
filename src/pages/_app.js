import "tailwindcss/tailwind.css";
import React, { useEffect, useReducer } from "react";
import { firebaseAuth } from "../firebase";

const initialState = {};

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return action.payload.user;
    case "logout":
      return initialState;
    default:
      return state;
  }
};

const AuthContext = React.createContext({});

function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Firebase のログインユーザー情報の変更を監視
    const unSubscription = firebaseAuth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // todo ログインユーザーを保持する処理
        dispatch({
          type: "login",
          payload: {
            authUser,
          },
        });
      } else {
        // todo ログアウト　ユーザー情報をからにする処理
        dispatch({ type: "logout" });
      }
    });

    return () => unSubscription();
  }, []);

  return (
    <AuthContext.Provider value={state}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default MyApp;
