import { useCallback, useState } from "react";
import { firebaseDB } from "../firebase";

export interface Topic {
  id: string;
  content: string;
  timestamp: any;
}

// Topics 取得 hooks
export const useTopics = () => {
  const [topics, setTopics] = useState<Array<Topic>>([
    {
      id: "",
      content: "",
      timestamp: null,
    } as Topic,
  ]);

  const getTopics = useCallback(() => {
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

  return { getTopics, topics };
};
