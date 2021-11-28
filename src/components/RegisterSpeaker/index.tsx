import React, { FormEvent, memo, useCallback, useState } from "react";
import { firebaseDB } from "../../firebase";
import { authUserSelector } from "../../states/authUser/authUserState";
import { useRecoilValue } from "recoil";
import firebase from "firebase";
import { speakersActions } from "../../states/speakers/speakersActions";

// 話す人を登録するフォームのコンポーネント
export const RegisterSpeakerForm: React.VFC = memo(() => {
  // todo: フォームバリデーション設定 / React Hook Form の利用検討
  const authUser = useRecoilValue(authUserSelector);
  const addSpeakerAction = speakersActions.useAddSpeaker();
  const [formText, setFormText] = useState<string>("");

  // todo hooks化
  const registerSpeaker = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!authUser.id) {
        // ログインしていなければ話す人を登録できない todo エラーメッセージ
        console.log("管理者しか登録できない");
        return;
      }
      // try catch にしたいかも
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      firebaseDB
        .collection("speakers")
        .add({
          userId: authUser.id, // ログインユーザーidをdataに持たせる
          name: formText,
          timestamp: timestamp,
        })
        .then((data) => {
          addSpeakerAction({
            id: data.id,
            userId: authUser.id,
            name: formText,
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
      <form className="px-8 pt-6" onSubmit={registerSpeaker}>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          人の名前を登録
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="会話に参加してる人の名前を入力しよう！"
          value={formText}
          onChange={(e) => setFormText(e.target.value)}
        />
        <button
          className={`${
            formText
              ? "bg-yellow-500 hover:bg-yellow-400"
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
