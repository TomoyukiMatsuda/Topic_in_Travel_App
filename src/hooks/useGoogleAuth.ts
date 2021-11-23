import { firebaseAuth, firebaseGoogleAuthProvider } from "../firebase";

export const useGoogleAuth = () => {
  const signInGoogle = () => {
    firebaseAuth
      .signInWithPopup(firebaseGoogleAuthProvider)
      .then((user) => {
        // todo 成功時トースト？
        console.log(user);
      })
      .catch((error) => {
        // todo エラー処理（アラート？）
        alert(error.message);
      });
  };

  const signOutGoogle = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        // todo ログイン成功処理
      })
      .catch((error) => {
        // todo ログイン失敗処理
        alert(error.message);
      });
  };

  return { signInGoogle, signOutGoogle };
};
