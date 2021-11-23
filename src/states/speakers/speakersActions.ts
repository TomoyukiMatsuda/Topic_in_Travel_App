import firebase from "firebase";
import { useRecoilCallback } from "recoil";
import { speakersAtom } from "./speakersState";
import { Speaker } from "../../types/Speaker";

export interface SpeakersActions {
  useSetSpeakers: () => (
    speakerDocs: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]
  ) => void;
  useResetSpeakers: () => () => void;
}

export const speakersActions: SpeakersActions = {
  useSetSpeakers: () =>
    useRecoilCallback(
      ({ set }) =>
        (speakerDocs) =>
          set(
            speakersAtom,
            speakerDocs.map<Speaker>((doc) => ({
              id: doc.id,
              userId: doc.data().userId,
              name: doc.data().name,
              timestamp: doc.data().timestamp,
            }))
          ),
      []
    ),
  useResetSpeakers: () =>
    useRecoilCallback(
      ({ reset }) =>
        () =>
          reset(speakersAtom),
      []
    ),
};
