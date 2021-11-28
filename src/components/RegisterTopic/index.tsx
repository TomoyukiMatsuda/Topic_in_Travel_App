import React, { memo, FormEvent, useState, useCallback } from "react";
import { firebaseDB } from "../../firebase";
import firebase from "firebase/app";
import { authUserSelector } from "../../states/authUser/authUserState";
import { useRecoilValue } from "recoil";
import { topicsActions } from "../../states/topics/topicsActions";

// トピック登録フォームのコンポーネント todo RegisterSpeakerと共通化したい
export const RegisterTopicForm: React.VFC = memo(() => {
  // todo: フォームバリデーション設定 / React Hook Form の利用検討
  const authUser = useRecoilValue(authUserSelector);
  const addTopicAction = topicsActions.useAddTopic();
  const [formText, setFormText] = useState<string>("");

  // todo hooks化
  const registerTopic = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!authUser.isAdmin) {
        // Adminユーザーでなければトピック登録できない todo エラーメッセージ
        console.log("管理者しか登録できない");
        return;
      }

      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      firebaseDB
        .collection("topics")
        .add({
          topic: formText,
          timestamp: timestamp,
        })
        .then((data) => {
          addTopicAction({
            id: data.id,
            // todo レスポンスのdataから内容にアクセスできないのか？
            content: formText,
            timestamp: timestamp,
          });
        })
        .catch((e) => {
          // todo エラーハンドリング
          console.log(e);
        });

      setFormText("");
    },
    [formText, authUser]
  );

  return (
    <div>
      {/*todo: ラベルクリックでフォーム入力にフォーカスされるように修正する*/}
      <form className="px-8 pt-6" onSubmit={registerTopic}>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          NEW トピック
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="例：職業を好きに選べるとしたら何を選ぶ？"
          value={formText}
          onChange={(e) => setFormText(e.target.value)}
        />
        <button
          className={`${
            formText
              ? "bg-blue-500 hover:bg-blue-400"
              : "bg-gray-200 cursor-default"
          } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          type="submit"
          disabled={!formText}
        >
          登録
        </button>
      </form>
    </div>
  );
});
