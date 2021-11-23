import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { topicsSelector } from "../states/topics/topicsState";
import { topicsActions } from "../states/topics/topicsActions";
import { firebaseDB } from "../firebase";

export const useFetchTopics = (): void => {
  const topics = useRecoilValue(topicsSelector);
  const setTopics = topicsActions.useSetTopics();

  useEffect(() => {
    // todo ユーザーに紐づいたtopicsだけをゲットできるようにしたい

    if (!topics.length) {
      // todo エラーハンドリング / ローディングハンドリング
      // todo キャッシュある時 && DBに変更ない時 はゲット処理不要としたい
      firebaseDB
        .collection("topics")
        .orderBy("timestamp", "desc")
        .get()
        .then((snapshot) => setTopics(snapshot.docs))
        .catch((e) => console.log(e));
    }

    // todo 依存配列をどうするか 再フェッチとか
  }, []);
};
