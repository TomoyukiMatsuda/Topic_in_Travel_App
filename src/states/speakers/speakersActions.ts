import firebase from "firebase";
import { useRecoilCallback } from "recoil";
import { speakersAtom, speakersSelector } from "./speakersState";
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
          // todo snapshot 使わずともできるかも
          //   set(topicsAtom, (currValue) => [topic, ...currValue]);
          const filteredSpeakers = snapshot
            .getLoadable<Speaker[]>(speakersSelector)
            .getValue()
            .filter((speaker) => speaker.id !== speakerId);
          set(speakersAtom, filteredSpeakers);
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
