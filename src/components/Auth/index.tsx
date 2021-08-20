import React, { useCallback, useContext } from "react";
import { firebaseAuth, firebaseGoogleAuthProvider } from "../../firebase";
import { AuthUserContext } from "../../lib/authUserContextProvider";
import { AuthUser } from "../../pages/_app";

export const Auth: React.VFC = () => {
  const authUser: AuthUser = useContext(AuthUserContext);

  const signInGoogle = useCallback(async () => {
    await firebaseAuth
      .signInWithPopup(firebaseGoogleAuthProvider)
      .then((user) => {
        // todo ログイン情報を保持 useContext() ?
        console.log(user);
      })
      .catch((error) => {
        // todo エラー処理（アラート？）
        alert(error.message);
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
        alert(error.message);
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
      {authUser.id && <p>{authUser.name} でログインしてる</p>}
    </>
  );
};
