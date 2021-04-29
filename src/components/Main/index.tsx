import { useState } from "react";

export const Main = () => {
  const [topic, setTopic] = useState("何を話すねん");
  const [member, setMember] = useState("誰がやねん");

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
    <div>
      <p className="text-4xl m-5">{member}</p>
      <p className="text-4xl m-5">{topic}</p>
      <button
        className="text-4xl border-2 rounded-lg border-blue-500 background p-1 m-5"
        onClick={onClickShuffle}
      >
        トピックシャッフル
      </button>
    </div>
  );
};
