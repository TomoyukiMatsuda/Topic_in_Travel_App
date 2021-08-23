import { useCallback, useState, useEffect, memo } from "react";
import Head from "next/head";
import { useDbFromFirestore } from "../../lib/useDbFromFirestore";

export const Main = memo(() => {
  const [topicLabel, setTopicLabel] = useState("なにをやねん");
  const { getTopicsFromFirestore, topics } = useDbFromFirestore();

  // 話題切り替え時に表示を初期化
  useEffect(() => {
    setTopicLabel("なにをやねん");
  }, [setTopicLabel]);

  // Firestore からトピックスを取得
  useEffect(() => {
    const unSubscription = getTopicsFromFirestore();
    return () => unSubscription();
  }, [getTopicsFromFirestore]);

  const onClickShuffle = useCallback(() => {
    // シャッフルされた話題を表示させる
    let topicNum = Math.floor(Math.random() * topics.length);
    setTopicLabel(topics[topicNum].content);
  }, [topics, setTopicLabel]);

  return (
    <div className="mt-5 flex flex-col">
      <Head>
        <title>トピックる</title>
      </Head>

      <h2 className="mx-auto text-blue-400 font-bold text-2xl font-mono m-5 mt-3 max-w-lg text-center">
        フツーの話題
      </h2>
      {/*todo トピックの文字数が変わってもボタン位置が変わらないようにしたい*/}
      <p className="text-center text-gray-600 text-xl font-bold  font-mono m-5 mx-auto">
        {topicLabel === "なにをやねん"
          ? topicLabel
          : `なにを？： ${topicLabel}`}
      </p>

      <button
        className="w-1/2 font-bold text-2xl bg-blue-400 py-2 px-4 rounded-xl text-white hover:bg-blue-300 mx-auto mt-1"
        onClick={onClickShuffle}
      >
        ぷっしゅ
      </button>
    </div>
  );
});
