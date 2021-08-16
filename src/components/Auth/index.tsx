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

  const signOutGoogle = useCallback(async () => {
    await firebaseAuth
      .signOut()
      .then(() => {
        // todo これいる？
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <button
        className="bg-blue-400 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={signInGoogle}
      >
        Googleログイン
      </button>
      <button
        className="bg-red-400 hover:bg-red-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={signOutGoogle}
      >
        ログアウト
      </button>
      {/* todo useContext 使ってログイン状態を取得したい気がする */}
      {firebaseAuth.currentUser && (
        <p>{firebaseAuth.currentUser?.displayName} でログインしてる</p>
      )}
    </>
  );
};
