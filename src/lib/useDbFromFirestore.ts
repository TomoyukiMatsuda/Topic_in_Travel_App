import { useCallback, useState, useContext } from "react";
import { firebaseDB } from "../firebase";
import { AuthUserContext } from "./authUserContextProvider";
import { AuthUser } from "../types/AuthUser";

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
  const authUser: AuthUser = useContext(AuthUserContext);
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
