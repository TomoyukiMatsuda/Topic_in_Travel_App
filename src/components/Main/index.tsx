import { useState } from "react";
import Head from "next/head";

export const Main = () => {
  const [topic, setTopic] = useState("なにをやねん");
  const [member, setMember] = useState("だれがやねん");

  // TODO: 話題を充実させる
  const topics: Array<string> = [
    "最近あった面白いこと",
    "松本の好きなところ",
    "マミコの変だと思うところ",
    "小池の生態でおかしいと思うところ",
    "松田の尊敬しているところ",
    "ゆめのの目の高さ予測",
    "この旅のフレーズ",
    "今年１楽しかったこと",
    "自分の中での流行語",
  ];

  // TODO: 名前をもっとおもろくする
  const members: Array<string> = [
    "小イットニーさん",
    "仙台ズラの動けるデブ",
    "式前日酒ヤクザ嫁",
    "うるさいコケシ",
    "O脚の人",
  ];

  const onClickShuffle = () => {
    // シャッフルされた話題を表示させる
    let topicNum = Math.floor(Math.random() * topics.length);
    let memberNum = Math.floor(Math.random() * members.length);

    setTopic(topics[topicNum]);
    setMember(members[memberNum]);
  };

  return (
    <div className="mt-5 justify-center flex flex-col">
      {/* TODO: レイアウトをきれいにする + レスポンシブデザインを適用する */}
      <Head>
        <title>たのしくいきたい</title>
      </Head>

      <p className="text-xl m-5 max-w-lg">
        {member === "だれがやねん" ? member : `だれ？：${member}`}
      </p>
      <p className="text-xl m-5 max-w-lg">
        {topic === "なにをやねん" ? topic : `なに？：${topic}`}
      </p>

      <button
        className="text-white text-4xl font-semibold shadow-2xl rounded-full bg-blue-400 p-2 m-5 hover:bg-blue-300 active:shadow-none max-w-lg"
        onClick={onClickShuffle}
      >
        ぷっしゅ〜
      </button>
    </div>
  );
};
