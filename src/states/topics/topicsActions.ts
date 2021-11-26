import { useRecoilCallback } from "recoil";
import { topicsAtom, topicsSelector } from "./topicsState";
import firebase from "firebase";
import { Topic } from "../../types/Topic";

export interface TopicsActions {
  useSetTopics: () => (
    topicDocs: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]
  ) => void;
  useAddTopic: () => (topic: Topic) => void;
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
  useAddTopic: () =>
    useRecoilCallback(
      ({ set }) =>
        (topic) =>
          set(topicsAtom, (currVal) => [topic, ...currVal]),
      []
    ),
  useDeleteTopic: () =>
    useRecoilCallback(
      ({ set, snapshot }) =>
        (topicId) => {
          set(topicsAtom, (currVal) =>
            currVal.filter((topic) => topic.id !== topicId)
          );
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
