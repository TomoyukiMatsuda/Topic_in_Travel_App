import { useCallback, useEffect, useState } from "react";
import { firebaseDB } from "../firebase";
import { authUserSelector } from "../states/authUser/authUserState";
import { useRecoilValue } from "recoil";
import { topicsAtom } from "../states/topics/topicsState";
import { topicsActions } from "../states/topics/topicsActions";

// todo: timestamp: any型を避けたい
export interface Topic {
  id: string;
  content: string;
  timestamp: any;
}

interface Speaker {
  id: string;
  userId: string;
  name: string;
  timestamp: any;
}

// Topics と Speakers 取得 hooks todo topics と speakers 分けたい
export const useDbFromFirestore = () => {
  const authUser = useRecoilValue(authUserSelector);
  const topics = useRecoilValue(topicsAtom);
  const setTopics = topicsActions.useSetTopics();

  const [speakers, setSpeakers] = useState<Array<Speaker>>([
    {
      id: "",
      userId: "",
      name: "",
      timestamp: null,
    } as Speaker,
  ]);

  const getSpeakersFromFirestore = useCallback(() => {
    // todo: できれば降順で取得したい
    return firebaseDB
      .collection("speakers")
      .where("userId", "==", authUser.id) // ログインユーザーidと紐づいたspeakerを取得
      .onSnapshot((snapshot) => {
        setSpeakers(
          snapshot.docs.map<Speaker>((doc) => ({
            id: doc.id,
            userId: doc.data().userId,
            name: doc.data().name,
            timestamp: doc.data().timestamp,
          }))
        );
      });
  }, [firebaseDB, authUser, setSpeakers]);

  useEffect(() => {
    // todo ユーザーに紐づいたtopicsだけをゲットできるようにしたい

    if (!topics.length) {
      // todo キャッシュある時 && DBに変更ない時 はゲット処理不要としたい
      firebaseDB
        .collection("topics")
        .orderBy("timestamp", "desc")
        .get()
        .then((snapshot) => {
          setTopics(snapshot.docs);
        })
        .catch((e) => console.log(e)); // todo エラーハンドリング
      console.log("false", topics.length);
    }

    // todo 依存配列をどうするか 再フェッチとか
  }, []);

  return { topics, getSpeakersFromFirestore, speakers };
};
