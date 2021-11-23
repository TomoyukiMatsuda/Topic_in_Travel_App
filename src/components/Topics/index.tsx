import React, { memo } from "react";
import { TopicItem } from "../TopicItem";
import { useDbFromFirestore } from "../../hooks/useDbFromFirestore";
import { useRecoilValue } from "recoil";
import { topicsSelector } from "../../states/topics/topicsState";

// 話題一覧画面コンポーネント
export const Topics: React.VFC = memo(() => {
  const topics = useRecoilValue(topicsSelector);
  useDbFromFirestore();

  return (
    <div>
      {!!topics.length && (
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
