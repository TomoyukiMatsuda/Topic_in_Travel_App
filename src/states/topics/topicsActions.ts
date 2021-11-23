import { useRecoilCallback } from "recoil";
import { topicsAtom } from "./topicsState";
import firebase from "firebase";
import { Topic } from "../../types/Topic";

export interface TopicsActions {
  useSetTopics: () => (
    topicDocs: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]
  ) => void;
  useResetTopics: () => () => void;
}

export const topicsActions: TopicsActions = {
  useSetTopics: () =>
    useRecoilCallback(
      ({ set }) =>
        (topicDocs) =>
          set(
            topicsAtom,
            topicDocs.map<Topic>((doc) => ({
              id: doc.id,
              content: doc.data().topic,
              timestamp: doc.data().timestamp,
            }))
          ),
      []
    ),
  useResetTopics: () =>
    useRecoilCallback(
      ({ reset }) =>
        () =>
          reset(topicsAtom),
      []
    ),
};
