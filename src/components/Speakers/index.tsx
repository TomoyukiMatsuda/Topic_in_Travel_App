import React, { memo, useContext, useEffect } from "react";
import { useDbFromFirestore } from "../../lib/useDbFromFirestore";
import { SpeakerItem } from "../SpeakerItem";
import { AuthUser } from "../../pages/_app";
import { AuthUserContext } from "../../lib/authUserContextProvider";

// 話す人一覧画面コンポーネント
export const Speakers: React.VFC = memo(() => {
  // firestore から topics データ取得
  const authUser: AuthUser = useContext(AuthUserContext);
  const { speakers, getSpeakersFromFirestore } = useDbFromFirestore();

  useEffect(() => {
    // Firestoreからspeakerデータをゲット
    const unSubscribe = getSpeakersFromFirestore();
    // Firestore の DB情報更新の検知を解除
    return () => unSubscribe();
  }, [getSpeakersFromFirestore, authUser]);

  // todo ログインユーザーと紐づいた話す人だけを表示させたい
  return (
    <div>
      {speakers[0]?.id && (
        <div className="px-5">
          {speakers.map((speaker) => {
            console.log(speaker);
            return (
              <div
                className="flex justify-between my-5 border-b-2"
                key={speaker.id}
              >
                <SpeakerItem id={speaker.id} name={speaker.name} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});
