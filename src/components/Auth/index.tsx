import React, { useCallback } from "react";
import { firebaseAuth, firebaseGoogleAuthProvider } from "../../firebase";

export const Auth: React.VFC = () => {
  const signInGoogle = useCallback(async () => {
    await firebaseAuth
      .signInWithPopup(firebaseGoogleAuthProvider)
      .then((user) => {
        // todo ログイン情報を保持 useContext() ?
        console.log(user);
      })
      .catch((error) => {
        // todo エラー処理（アラート？）
        console.log(error);
      });
  }, [firebaseAuth, firebaseGoogleAuthProvider]);

  return (
    <>
      <button
        className="bg-blue-400 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={signInGoogle}
      >
        Googleログイン
      </button>
    </>
  );
};
