import { useEffect } from "react";
import { firebaseDB } from "../firebase";
import { authUserSelector } from "../states/authUser/authUserState";
import { useRecoilValue } from "recoil";
import { speakersSelector } from "../states/speakers/speakersState";
import { speakersActions } from "../states/speakers/speakersActions";

export const useFetchSpeakers = (): void => {
  const [speakers, authUser] = [
    useRecoilValue(speakersSelector),
    useRecoilValue(authUserSelector),
  ];
  const setSpeakers = speakersActions.useSetSpeakers();

  useEffect(() => {
    // todo: エラー、ローディングハンドリング
    if (!speakers.length) {
      firebaseDB
        .collection("speakers")
        .where("userId", "==", authUser.id) // ログインユーザーidと紐づいたspeakerを取得
        .get()
        .then((snapshot) => setSpeakers(snapshot.docs))
        .catch((e) => console.log(e));
    }

    // todo 依存配列をどうするか 再フェッチとか
  }, [authUser]);
};
