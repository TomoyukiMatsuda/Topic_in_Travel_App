import React, { memo, useEffect } from "react";
import { TopicItem } from "../TopicItem";
import { useDbFromFirestore } from "../../lib/useDbFromFirestore";

// 話す人一覧画面コンポーネント
export const Speakers: React.VFC = memo(() => {
  // firestore から topics データ取得
  const { speakers, getSpeakersFromFirestore } = useDbFromFirestore();

  useEffect(() => {
    // Firestoreからspeakerデータをゲット
    const unSubscription = getSpeakersFromFirestore();
    // Firestore の DB情報更新の検知を解除
    return () => unSubscription();
  }, [getSpeakersFromFirestore]);

  return (
    <div>
      {speakers[0]?.id && (
        <div className="px-5">
          {speakers.map((speaker) => {
            return (
              <div
                className="flex justify-between my-5 border-b-2"
                key={speaker.id}
              >
                <TopicItem id={speaker.id} content={speaker.name} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});
