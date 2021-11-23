import React, { memo, useEffect, useState } from "react";
import { TopicItem } from "../TopicItem";
import { Topic, useDbFromFirestore } from "../../hooks/useDbFromFirestore";
import { firebaseDB } from "../../firebase";
import { topicsAtom } from "../../states/topics/topicsState";
import { useRecoilValue } from "recoil";
import { topicsActions } from "../../states/topics/topicsActions";

// 話題一覧画面コンポーネント
export const Topics: React.VFC = memo(() => {
  // firestore から topics データ取得
  const { topics, getTopicsFromFirestore } = useDbFromFirestore();

  const [db, setDb] = useState<Topic[] | null>(null);

  const recoilTopics = useRecoilValue(topicsAtom);
  const topicsAction = topicsActions.useSetTopics();

  console.log(recoilTopics);

  useEffect(() => {
    // todo ユーザーに紐づいたtopicsだけをゲットできるようにしたい
    firebaseDB
      .collection("topics")
      .orderBy("timestamp", "desc")
      .get()
      .then((snapshot) => {
        topicsAction(snapshot.docs);

        setDb(
          snapshot.docs.map<Topic>((doc) => ({
            id: doc.id,
            content: doc.data().topic,
            timestamp: doc.data().timestamp,
          }))
        );
      })
      .catch((e) => console.log(e));

    // Firestoreからトピックデータをゲット
    const unSubscribe = getTopicsFromFirestore();
    // Firestore の DB情報更新の検知を解除
    return () => unSubscribe();
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
