import React, {
  useCallback,
  useState,
  useEffect,
  memo,
  useContext,
} from "react";
import Head from "next/head";
import { useDbFromFirestore } from "../../lib/useDbFromFirestore";
import { AuthUser } from "../../pages/_app";
import { AuthUserContext } from "../../lib/authUserContextProvider";
import { MainButton } from "./MainButton";
import { ShuffleLabel } from "./ShuffleLabel";

export const Main: React.VFC = memo(() => {
  const [topicLabel, setTopicLabel] = useState("なにをやねん");
  const [speaker, setSpeaker] = useState("だれがやねん");
  const [isShowSpeaker, setIsShowSpeaker] = useState(true);
  const authUser: AuthUser = useContext(AuthUserContext);
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

      {authUser.id && isShowSpeaker && (
        // ログインしていなければスピーカー非表示
        <ShuffleLabel>
          {speaker === "だれがやねん" ? speaker : `だれが？： ${speaker}`}
        </ShuffleLabel>
      )}
      {/*todo トピックの文字数が変わってもボタン位置が変わらないようにしたい*/}
      <ShuffleLabel>
        {topicLabel === "なにをやねん"
          ? topicLabel
          : `なにを？： ${topicLabel}`}
      </ShuffleLabel>

      <MainButton color="blue" onClickFunc={onClickShuffle}>
        ぷっしゅ
      </MainButton>
      {authUser.id && (
        // ログインしていなければ非表示
        <MainButton color="yellow" onClickFunc={switchShowSpeaker}>
          {isShowSpeaker ? "話す人いらない" : "話す人いる"}
        </MainButton>
      )}
    </div>
  );
});
