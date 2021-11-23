import { useCallback, useState } from "react";
import { firebaseDB } from "../firebase";
import { authUserSelector } from "../states/authUser/authUserState";
import { useRecoilValue } from "recoil";
import { Speaker } from "../types/Speaker";

export const useFetchSpeakers = () => {
  const authUser = useRecoilValue(authUserSelector);

  const [speakers, setSpeakers] = useState<Array<Speaker>>([
    {
      id: "",
      userId: "",
      name: "",
      timestamp: null,
    } as Speaker,
  ]);

  const getSpeakersFromFirestore = useCallback(() => {
    // todo: できれば降順で取得したい
    return firebaseDB
      .collection("speakers")
      .where("userId", "==", authUser.id) // ログインユーザーidと紐づいたspeakerを取得
      .get();

    //   .then((snapshot) => );
    // .onSnapshot((snapshot) => {
    //   setSpeakers(
    //     snapshot.docs.map<Speaker>((doc) => ({
    //       id: doc.id,
    //       userId: doc.data().userId,
    //       name: doc.data().name,
    //       timestamp: doc.data().timestamp,
    //     }))
    //   );
    // });
  }, [firebaseDB, authUser, setSpeakers]);

  return { getSpeakersFromFirestore, speakers };
};
