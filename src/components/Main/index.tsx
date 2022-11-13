import React, { useCallback, useState, useEffect, memo, FC } from "react";
import Head from "next/head";
import { useFetchSpeakers } from "../../hooks/useFetchSpeakers";
import { ShuffleLabel } from "./ShuffleLabel";
import { useRecoilValue } from "recoil";
import { authUserSelector } from "../../states/authUser/authUserState";
import { topicsSelector } from "../../states/topics/topicsState";
import { useFetchTopics } from "../../hooks/useFetchTopics";
import { speakersSelector } from "../../states/speakers/speakersState";
import { Button } from "@another_works/react-landscape";
import { Spacer } from "../../styles/spacer";
import styled from "styled-components";

export const Main: FC = memo(() => {
  useFetchTopics();
  useFetchSpeakers();
  const [topics, speakers, authUser] = [
    useRecoilValue(topicsSelector),
    useRecoilValue(speakersSelector),
    useRecoilValue(authUserSelector),
  ];
  const [topicLabel, setTopicLabel] = useState("なにをやねん");
  const [speaker, setSpeaker] = useState("だれがやねん");
  const [isShowSpeaker, setIsShowSpeaker] = useState(true);

  // 話題切り替え時に表示を初期化
  useEffect(
    () => setTopicLabel("なにを？"),
    [setTopicLabel, setSpeaker, authUser]
  );

  useEffect(() => setSpeaker("だれが？"), [authUser, setSpeaker]);

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
    <Container>
      <Head>
        <title>トピックる</title>
      </Head>
      <Spacer y={24} />

      {/*TODO: シャッフルボタン押したらスピナー表示してから表示させる*/}
      {authUser.id && isShowSpeaker && (
        // ログインしていなければスピーカー非表示
        <ShuffleLabel>
          {speaker === "だれが？" ? speaker : `だれが？： ${speaker}`}
        </ShuffleLabel>
      )}
      {/*todo トピックの文字数が変わってもボタン位置が変わらないようにしたい*/}
      <ShuffleLabel>
        {topicLabel === "なにを？" ? topicLabel : `なにを？： ${topicLabel}`}
      </ShuffleLabel>

      {/*todo ローディング中はdisableにしたい*/}
      <Button
        priority="primary"
        type="icon_text"
        iconType="change"
        size="Middle"
        text="トピック"
        width="240px"
        onPress={onClickShuffle}
      />

      {authUser.id && (
        // ログインしていなければ非表示
        <>
          <Spacer y={12} />
          <Button
            priority="line"
            type="icon_text"
            iconType="user"
            size="Middle"
            text={isShowSpeaker ? "OFF" : "ON"}
            width="240px"
            onPress={switchShowSpeaker}
          />
        </>
      )}
    </Container>
  );
});
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
