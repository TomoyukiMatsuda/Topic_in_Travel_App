import {useCallback, useState} from "react";
import Head from "next/head";
import axios from "axios";

interface CommonTopic {
  id: number;
  content: string;
}

export const Main = () => {
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
    "50歳のときにどうなっていたい？",
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
    "職場にいるおもろい人",
    "最近感じた青春",
    "自分の中での流行語",
    "最近「自分天才か!」と感じたこと",
    "自分の好きなところ",
    "もう一度新卒就活するとしたらどこにいく？",
    "自由に職業選べるとしたらなにやる",
    "自分に子供ができたらなにになって欲しい？",
    "何か新しく始めたいことは？",
    "無人島に持っていくもの１つ",
  ];
  const [topic, setTopic] = useState("なにをやねん");
  const [member, setMember] = useState("だれがやねん");
  const [commonTopics, setCommonTopics] = useState(topics);

  // url http://localhost:8080/common_topic/list
  const getCommonTopics = useCallback(() => {
    axios
      .get<Array<CommonTopic>>("http://localhost:8080/common_topic/list")
      .then((res) => {
        const getTopics = res.data.map((getTopic) => (
          getTopic.content
        ))

        setCommonTopics(getTopics);
        console.log(getTopics);
      })
      .catch()
  }, []);

  // TODO: 話題を充実させる
  // const topics: Array<string> = [
  //   "最近あった面白いこと",
  //   "最近ハッピーだったこと",
  //   "最近失敗したこと",
  //   "１ヶ月の休みが会ったらなにする？",
  //   "１億円あったらどうする？",
  //   "休日はどう過ごしている？",
  //   "こういう人は許せない",
  //   "朝起きて最初にすること",
  //   "人生で最も乗っていたときの話",
  //   "無人島に持っていくもの３つ",
  //   "もう一度人生をやるとしたらなにになる？",
  //   "50歳のときにどうなっていたい？",
  //   "人生最大の失敗",
  //   "最後に泣いたのは？",
  //   "１年前の今頃なにしてた？",
  //   "５年前の今頃なにしてた？",
  //   "３年前の今頃なにしてた？",
  //   "なぞに覚えている一番小さい頃の思い出",
  //   "小さい頃の夢",
  //   "最近買った高価なもの",
  //   "子供に付けたい名前",
  //   "すべらない話",
  //   "今ハマっていること",
  //   "永遠の何歳でいたい？",
  //   "今の生活の中での一番の楽しみ",
  //   "昔学校で流行った遊び",
  //   "大学時代に戻ったらやりたいこと",
  //   "職場にいるおもろい人",
  //   "最近感じた青春",
  //   "自分の中での流行語",
  //   "最近「自分天才か!」と感じたこと",
  //   "自分の好きなところ",
  //   "もう一度新卒就活するとしたらどこにいく？",
  //   "自由に職業選べるとしたらなにやる",
  //   "自分に子供ができたらなにになって欲しい？",
  //   "何か新しく始めたいことは？",
  //   "無人島に持っていくもの１つ",
  // ];

  // 小池たちバージョン
  // const members: Array<string> = [
  //   "池氏",
  //   "松本くん",
  //   "小池（♀）",
  //   "ゆめち",
  //   "まつにい",
  // ];

  // キャンプメンツ
  // const members: Array<string> = ["よっしーパイセン", "アサイ君", "まつだ氏"];

  // もろ、じゅんご
  const members: Array<string> = ["じゅんごマン", "もろ", "まつにい"];

  const onClickShuffle = useCallback(() => {
    // シャッフルされた話題を表示させる
    let topicNum = Math.floor(Math.random() * commonTopics.length);
    let memberNum = Math.floor(Math.random() * members.length);

    setTopic(commonTopics[topicNum]);
    setMember(members[memberNum]);
  }, [commonTopics, members]);

  return (
    <div className="mt-5 justify-center flex flex-col">
      {/* TODO: レイアウトをきれいにする */}
      <Head>
        <title>とぴっかー</title>
      </Head>

      <p className="text-xl font-bold font-mono m-5 max-w-lg mt-12">
        {member === "だれがやねん" ? member : `だれ？：${member}`}
      </p>
      <p className="text-xl font-bold  font-mono m-5 max-w-lg mb-5">
        {topic === "なにをやねん" ? topic : `なに？：${topic}`}
      </p>

      <button
        className="text-white text-4xl font-semibold shadow-2xl rounded-full bg-blue-400 p-2 m-5 hover:bg-blue-300 active:shadow-none mt-11"
        onClick={onClickShuffle}
      >
        ぷっしゅ
      </button>

      <button
        className="text-white text-4xl font-semibold shadow-2xl rounded-full bg-blue-400 p-2 m-5 hover:bg-blue-300 active:shadow-none mt-11"
        onClick={getCommonTopics}>
        セット
      </button>

    </div>
  );
};
