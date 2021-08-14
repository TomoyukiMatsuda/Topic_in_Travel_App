import React, { useEffect, useState } from "react";
import { firebaseDB } from "../../firebase";

interface Topic {
  id: string;
  topic: string;
  timestamp: any;
}

// 話題一覧画面コンポーネント;
export const Topics: React.VFC = () => {
  const [topics, setTopics] = useState<Array<Topic>>([
    {
      id: "",
      topic: "",
      timestamp: null,
    },
  ]);

  // firestore から topics データ取得
  useEffect(() => {
    const unSubscription = firebaseDB
      .collection("topics")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTopics(
          snapshot.docs.map<Topic>((doc) => ({
            id: doc.id,
            topic: doc.data().topic,
            timestamp: doc.data().timestamp,
          }))
        );
      });

    // Firestore の DB情報更新の検知を解除
    return () => unSubscription();
  }, []);

  return (
    <div>
      <ul className="px-10">
        {topics.map((topic) => {
          console.log(topic);
          return (
            <li className="my-5 border-b-2" key={topic.id}>
              {topic.topic}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
