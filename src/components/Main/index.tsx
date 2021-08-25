import { useCallback, useState, useEffect, memo } from "react";
import Head from "next/head";
import { useDbFromFirestore } from "../../lib/useDbFromFirestore";

export const Main = memo(() => {
  const [topicLabel, setTopicLabel] = useState("なにをやねん");
  const [speaker, setSpeaker] = useState("だれがやねん");
  const { getTopicsFromFirestore, topics, getSpeakersFromFirestore, speakers } =
    useDbFromFirestore();

  // 話題切り替え時に表示を初期化
  useEffect(() => {
    setTopicLabel("なにをやねん");
    setSpeaker("だれがやねん");
  }, [setTopicLabel, setSpeaker]);

  // Firestore からトピックスを取得
  useEffect(() => {
    const getTopicsUnSubscribe = getTopicsFromFirestore();
    const getSpeakersUnSubscribe = getSpeakersFromFirestore();
    return () => {
      getTopicsUnSubscribe();
      getSpeakersUnSubscribe();
    };
  }, [getTopicsFromFirestore, getSpeakersFromFirestore]);

  // todo シャッフル確率最適化 一回表示対象となった場合配列をから要素を削除することを検討する
  //  https://qiita.com/pure-adachi/items/77fdf665ff6e5ea22128
  const onClickShuffle = useCallback(() => {
    // シャッフル番号を算出
    let topicNum = Math.floor(Math.random() * topics.length);
    let speakerNum = Math.floor(Math.random() * speakers.length);
    // トピック、スピーカーをセット
    setTopicLabel(topics[topicNum].content);
    setSpeaker(speakers[speakerNum].name);
  }, [topics, setTopicLabel, speakers, setSpeaker]);

  return (
    <div className="mt-5 flex flex-col">
      <Head>
        <title>トピックる</title>
      </Head>

      {/* todo スピーカーとトピックをコンポーネント化して再利用
            スピーカー利用、オンオフ切り替え
      */}
      <p className="text-center text-gray-600 text-xl font-bold  font-mono m-5 mx-auto">
        {speaker === "だれがやねん" ? speaker : `だれが？： ${speaker}`}
      </p>
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
