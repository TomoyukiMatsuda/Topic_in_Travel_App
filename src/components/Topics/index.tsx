import React, { memo, useEffect } from "react";
import { TopicItem } from "../TopicItem";
import { useDbFromFirestore } from "../../lib/useDbFromFirestore";

// 話題一覧画面コンポーネント;
export const Topics: React.VFC = memo(() => {
  // firestore から topics データ取得
  const { topics, getTopicsFromFirestore } = useDbFromFirestore();

  useEffect(() => {
    // Firestoreからトピックデータをゲット
    const unSubscription = getTopicsFromFirestore();
    // Firestore の DB情報更新の検知を解除
    return () => unSubscription();
  }, [getTopicsFromFirestore]);

  return (
    <div>
      {topics[0]?.id && (
        <div className="px-5">
          {topics.map((topic) => {
            return (
              <div
                className="flex justify-between my-5 border-b-2"
                key={topic.id}
              >
                <TopicItem id={topic.id} content={topic.content} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});
