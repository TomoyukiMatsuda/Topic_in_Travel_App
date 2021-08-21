import React, { FormEvent, useState, useCallback, useContext } from "react";
import { firebaseDB } from "../../firebase";
import firebase from "firebase/app";
import { AuthUser } from "../../pages/_app";
import { AuthUserContext } from "../../lib/authUserContextProvider";

// トピック登録フォームのコンポーネント
export const RegisterTopic: React.VFC = () => {
  // todo: フォームバリデーション設定 / React Hook Form の利用検討
  const [topic, setTopic] = useState<string>();
  const authUser: AuthUser = useContext(AuthUserContext);

  const createTopic = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(authUser);
      if (!authUser.isAdmin) {
        // Adminユーザーでなければトピック登録できない todo エラーメッセージ
        console.log("Adminじゃないから登録できないで！！");
        return;
      }

      console.log("Adminだから登録できるで！！");
      firebaseDB
        .collection("topics")
        .add({
          topic: topic,
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

      setTopic("");
    },
    [topic]
  );

  return (
    <div>
      <form className="px-8 pt-6" onSubmit={createTopic}>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          NEW トピック
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="例：職業を好きに選べるとしたら何を選ぶ？"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        {/*フォーム入力有無でボタンの色変えたい*/}
        <button
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={!topic}
        >
          登録
        </button>
      </form>
    </div>
  );
};
