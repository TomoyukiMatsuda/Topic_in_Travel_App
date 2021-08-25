import { useCallback, useState, useEffect, memo, useContext } from "react";
import Head from "next/head";
import { useDbFromFirestore } from "../../lib/useDbFromFirestore";
import { AuthUser } from "../../pages/_app";
import { AuthUserContext } from "../../lib/authUserContextProvider";
import { MainButton } from "./MainButton";

export const Main = memo(() => {
  const authUser: AuthUser = useContext(AuthUserContext);

  const [topicLabel, setTopicLabel] = useState("なにをやねん");
  const [speaker, setSpeaker] = useState("だれがやねん");
  const [isShowSpeaker, setIsShowSpeaker] = useState(true);
  const { getTopicsFromFirestore, topics, getSpeakersFromFirestore, speakers } =
    useDbFromFirestore();

  // 話題切り替え時に表示を初期化
  useEffect(() => {
    setTopicLabel("なにをやねん");
  }, [setTopicLabel, setSpeaker, authUser]);

  useEffect(() => {
    setSpeaker("だれがやねん");
  }, [authUser, setSpeaker]);

  // Firestore からトピックスを取得
  useEffect(() => {
    const getTopicsUnSubscribe = getTopicsFromFirestore();
    const getSpeakersUnSubscribe = getSpeakersFromFirestore();
    return () => {
      getTopicsUnSubscribe();
      getSpeakersUnSubscribe();
    };
  }, [getTopicsFromFirestore, getSpeakersFromFirestore, authUser]);

  // todo シャッフル確率最適化 一回表示対象となった場合配列をから要素を削除することを検討する
  //  https://qiita.com/pure-adachi/items/77fdf665ff6e5ea22128
  const onClickShuffle = useCallback(() => {
    // トピックシャッフル
    let topicNum = Math.floor(Math.random() * topics.length);
    setTopicLabel(topics[topicNum].content);

    if (authUser.id && isShowSpeaker) {
      // ログイン時のみスピーカーシャッフル実行
      let speakerNum = Math.floor(Math.random() * speakers.length);
      setSpeaker(speakers[speakerNum].name);
    }
  }, [topics, setTopicLabel, speakers, setSpeaker, authUser.id, isShowSpeaker]);

  const switchShowSpeaker = useCallback(() => {
    setIsShowSpeaker(!isShowSpeaker);
  }, [isShowSpeaker, setIsShowSpeaker]);

  return (
    <div className="mt-5 flex flex-col">
      <Head>
        <title>トピックる</title>
      </Head>

      {/* todo スピーカーとトピックをコンポーネント化して再利用*/}
      {authUser.id && isShowSpeaker && (
        // ログインしていなければスピーカー非表示
        <p className="text-center text-gray-600 text-xl font-bold  font-mono m-5 mx-auto">
          {speaker === "だれがやねん" ? speaker : `だれが？： ${speaker}`}
        </p>
      )}
      {/*todo トピックの文字数が変わってもボタン位置が変わらないようにしたい*/}
      <p className="text-center text-gray-600 text-xl font-bold  font-mono m-5 mx-auto">
        {topicLabel === "なにをやねん"
          ? topicLabel
          : `なにを？： ${topicLabel}`}
      </p>

      <MainButton color="blue" onClickFunc={onClickShuffle}>
        ぷっしゅ
      </MainButton>
      {authUser.id && (
        <MainButton color="yellow" onClickFunc={switchShowSpeaker}>
          {isShowSpeaker ? "話す人いらない" : "話す人いる"}
        </MainButton>
      )}
    </div>
  );
});
