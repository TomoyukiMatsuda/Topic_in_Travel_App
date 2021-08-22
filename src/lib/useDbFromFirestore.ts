import { useCallback, useState } from "react";
import { firebaseDB } from "../firebase";

interface Topic {
  id: string;
  content: string;
  timestamp: any;
}

interface Speaker {
  id: string;
  name: string;
  timestamp: any;
}

// Topics と Speakers 取得 hooks todo 共通化
export const useDbFromFirestore = () => {
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
  }, [firebaseDB]);

  const getSpeakersFromFirestore = useCallback(() => {
    return firebaseDB
      .collection("speakers")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setSpeakers(
          snapshot.docs.map<Speaker>((doc) => ({
            id: doc.id,
            name: doc.data().speaker,
            timestamp: doc.data().timestamp,
          }))
        );
      });
  }, [firebaseDB]);

  return { getTopicsFromFirestore, topics, getSpeakersFromFirestore, speakers };
};
