import { useCallback, useState } from "react";
import { firebaseDB } from "../firebase";
import { authUserSelector } from "../states/authUserState";
import { useRecoilValue } from "recoil";

// todo: timestamp: any型を避けたい
interface Topic {
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

// Topics と Speakers 取得 hooks todo 共通化
export const useDbFromFirestore = () => {
  const authUser = useRecoilValue(authUserSelector);

  // todo: 初期化方法これで良い？
  const [topics, setTopics] = useState<Array<Topic>>([
    {
      id: "",
      content: "",
      timestamp: null,
    } as Topic,
  ]);
  const [speakers, setSpeakers] = useState<Array<Speaker>>([
    {
      id: "",
      userId: "",
      name: "",
      timestamp: null,
    } as Speaker,
  ]);

  // todo: snapshot をやめて 取得→グローバルステートに更新で、更新処理を走らせたいタイミングで再度取得処理にする？
  const getTopicsFromFirestore = useCallback(() => {
    return firebaseDB
      .collection("topics")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTopics(
          snapshot.docs.map<Topic>((doc) => ({
            id: doc.id,
            content: doc.data().topic,
            timestamp: doc.data().timestamp,
          }))
        );
      });
  }, [firebaseDB, setTopics]);

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

  return { getTopicsFromFirestore, topics, getSpeakersFromFirestore, speakers };
};
