import React, { useEffect, useState } from "react";
import { firebaseDB } from "../../firebase";
import { TopicItem } from "../TopicItem";
import { useTopics } from "../../lib/useTopics";

// 話題一覧画面コンポーネント;
export const Topics: React.VFC = () => {
  // firestore から topics データ取得
  const { topics, getTopics } = useTopics();

  useEffect(() => {
    const unSubscription = getTopics();
    // Firestore の DB情報更新の検知を解除
    return () => unSubscription();
  }, [firebaseDB]);

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
};
