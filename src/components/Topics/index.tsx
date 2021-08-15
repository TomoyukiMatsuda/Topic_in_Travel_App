import React, { useEffect, useState } from "react";
import { firebaseDB } from "../../firebase";

interface Topic {
  id: string;
  content: string;
  timestamp: any;
}

// 話題一覧画面コンポーネント;
export const Topics: React.VFC = () => {
  const [topics, setTopics] = useState<Array<Topic>>([
    {
      id: "",
      content: "",
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
            content: doc.data().topic,
            timestamp: doc.data().timestamp,
          }))
        );
      });

    // Firestore の DB情報更新の検知を解除
    return () => unSubscription();
  }, []);

  return (
    <div>
      {topics[0]?.id && (
        <div className="px-5">
          {topics.map((topic) => {
            return (
              <div className="my-5 border-b-2" key={topic.id}>
                {topic.content}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
