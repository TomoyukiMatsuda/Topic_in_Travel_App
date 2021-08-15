import "tailwindcss/tailwind.css";
import { useEffect } from "react";
import { firebaseAuth } from "../firebase";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Firebase のログインユーザー情報の変更を監視
    const unSubscription = firebaseAuth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // todo ログインユーザーを保持する処理
      } else {
        // todo ログアウト　ユーザー情報をからにする処理
      }
    });

    return () => unSubscription();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
