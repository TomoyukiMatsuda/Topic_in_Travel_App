import { useRecoilCallback } from "recoil";
import { topicsAtom, topicsSelector } from "./topicsState";
import firebase from "firebase";
import { Topic } from "../../types/Topic";

export interface TopicsActions {
  useSetTopics: () => (
    topicDocs: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]
  ) => void;
  useDeleteTopic: () => (topicId: string) => void;
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
  useDeleteTopic: () =>
    useRecoilCallback(
      ({ set, snapshot }) =>
        (topicId) => {
          const filteredTopics = snapshot
            .getLoadable<Topic[]>(topicsSelector)
            .getValue()
            .filter((topic) => topic.id !== topicId);
          set(topicsAtom, filteredTopics);
        },
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
