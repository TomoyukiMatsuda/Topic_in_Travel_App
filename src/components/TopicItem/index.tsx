import React, { memo, useCallback } from "react";
import { firebaseDB } from "../../firebase";

interface Props {
  id: string;
  content: string;
}

export const TopicItem: React.VFC<Props> = memo((props) => {
  // todo 削除前に確認ダイアログ表示させたい
  const deleteTopic = useCallback(() => {
    firebaseDB
      .collection("topics")
      .doc(props.id)
      .delete()
      .then((data) => {
        // todo 成功時ハンドリング
        console.log(data);
      })
      .catch((error) => {
        // todo 失敗時ハンドリング
        console.log(error);
      });
  }, []);

  return (
    <>
      <p>{props.content}</p>
      <button
        className="bg-red-500 hover:bg-red-300 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
        onClick={deleteTopic}
      >
        削除
      </button>
    </>
  );
});
