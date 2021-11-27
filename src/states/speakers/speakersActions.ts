import firebase from "firebase";
import { useRecoilCallback } from "recoil";
import { speakersAtom } from "./speakersState";
import { Speaker } from "../../types/Speaker";

export interface SpeakersActions {
  useSetSpeakers: () => (
    speakerDocs: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]
  ) => void;
  useAddSpeaker: () => (speaker: Speaker) => void;
  useDeleteSpeaker: () => (speakerId: string) => void;
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
  useAddSpeaker: () =>
    useRecoilCallback(
      ({ set }) =>
        (speaker) =>
          set(speakersAtom, (currVal) => [speaker, ...currVal]),
      []
    ),
  useDeleteSpeaker: () =>
    useRecoilCallback(
      ({ set, snapshot }) =>
        (speakerId) => {
          set(speakersAtom, (currVal) =>
            currVal.filter((speaker) => speaker.id !== speakerId)
          );
        },
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
