import React, {
  memo,
  FormEvent,
  useState,
  useCallback,
  useEffect,
} from "react";
import { firebaseDB } from "../../firebase";
import firebase from "firebase/app";
import { authUserSelector } from "../../states/authUser/authUserState";
import { useRecoilValue } from "recoil";
import { topicsActions } from "../../states/topics/topicsActions";

// トピック登録フォームのコンポーネント todo RegisterSpeakerと共通化したい
export const RegisterTopic: React.VFC = memo(() => {
  // todo: フォームバリデーション設定 / React Hook Form の利用検討
  const addTopicAction = topicsActions.useAddTopic();
  const [topic, setTopic] = useState<string>("");
  const authUser = useRecoilValue(authUserSelector);

  // todo hooks化
  const createTopic = useCallback(
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
          topic: topic,
          timestamp: timestamp,
        })
        .then((data) => {
          // todo 成功時ハンドリング
          addTopicAction({
            id: data.id,
            // todo レスポンスのdataから内容にアクセスできないのか？
            content: topic,
            timestamp: timestamp,
          });
        })
        .catch((e) => {
          // todo エラーハンドリング
          console.log(e);
        });

      setTopic("");
    },
    [topic, authUser]
  );

  return (
    <div>
      {/*todo: ラベルクリックでフォーム入力にフォーカスされるように修正する*/}
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
        {/* todo フォーム入力有無でボタンの色変えたい*/}
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
});
