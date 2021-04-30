import { useState } from "react";
import Head from "next/head";

export const Main = () => {
  const [topic, setTopic] = useState("なにをやねん");
  const [member, setMember] = useState("だれがやねん");

  // TODO: 話題を充実させる
  const topics: Array<string> = [
    "最近あった面白いこと",
    "最近ハッピーだったこと",
    "最近失敗したこと",
    "１ヶ月の休みが会ったらなにする？",
    "１億円あったらどうする？",
    "休日はどう過ごしている？",
    "こういう人は許せない",
    "朝起きて最初にすること",
    "人生で最も乗っていたときの話",
    "無人島に持っていくもの３つ",
    "もう一度人生をやるとしたらなにになる？",
    "50歳のときにどうなって",
    "人生最大の失敗",
    "最後に泣いたのは？",
    "１年前の今頃なにしてた？",
    "５年前の今頃なにしてた？",
    "３年前の今頃なにしてた？",
    "なぞに覚えている一番小さい頃の思い出",
    "小さい頃の夢",
    "最近買った高価なもの",
    "子供に付けたい名前",
    "すべらない話",
    "今ハマっていること",
    "永遠の何歳でいたい？",
    "今の生活の中での一番の楽しみ",
    "昔学校で流行った遊び",
    "大学時代に戻ったらやりたいこと",
    "",
  ];

  // TODO: 名前をもっとおもろくする
  const members: Array<string> = ["池氏", "松本くん", "小池(♀)", "山田", "MT"];

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
