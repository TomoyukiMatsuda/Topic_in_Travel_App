import React, {
  FormEvent,
  memo,
  useCallback,
  useContext,
  useState,
} from "react";
import { AuthUser } from "../../pages/_app";
import { AuthUserContext } from "../../lib/authUserContextProvider";
import { firebaseDB } from "../../firebase";
import firebase from "firebase";

// 話す人を登録するフォームのコンポーネント
export const RegisterSpeaker: React.VFC = memo(() => {
  // todo: フォームバリデーション設定 / React Hook Form の利用検討
  const [speaker, setSpeaker] = useState<string>();
  const authUser: AuthUser = useContext(AuthUserContext);

  // todo hooks化
  const createTopic = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(authUser);
      if (!authUser.id) {
        // Adminユーザーでなければトピック登録できない todo エラーメッセージ
        return;
      }

      firebaseDB
        .collection("speakers")
        .add({
          //userId: userId, todo ログインユーザー情報と紐付ける
          speaker: speaker,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((data) => {
          // todo 成功時ハンドリング
          console.log(data);
        })
        .catch((e) => {
          // todo エラーハンドリング
          console.log(e);
        });

      setSpeaker("");
    },
    [speaker, authUser]
  );

  return (
    <div>
      <form className="px-8 pt-6" onSubmit={createTopic}>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          人の名前を登録
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="会話に参加してる人の名前を入力しよう！"
          value={speaker}
          onChange={(e) => setSpeaker(e.target.value)}
        />
        {/* todo フォーム入力有無でボタンの色変えたい*/}
        <button
          className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={!speaker}
        >
          登録
        </button>
      </form>
    </div>
  );
});
