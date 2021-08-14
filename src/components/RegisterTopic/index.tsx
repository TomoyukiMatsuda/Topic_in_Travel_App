import React, { FormEvent, useState, useCallback } from "react";
import { firebaseDB } from "../../firebase";
import firebase from "firebase/app";

// トピック登録フォームのコンポーネント
export const RegisterTopic: React.VFC = () => {
  // todo: バリデーション設定 / React Hook Form の利用検討
  const [topic, setTopic] = useState<string>();

  const createTopic = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
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
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={!topic}
        >
          登録
        </button>
      </form>
    </div>
  );
};
