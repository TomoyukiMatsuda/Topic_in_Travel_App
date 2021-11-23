import { useRecoilCallback } from "recoil";
import { topicsAtom } from "./topicsState";
import { Topic } from "../../hooks/useDbFromFirestore";

export interface TopicsActions {
  useSetTopics: () => (topics: Topic[]) => void;
  useResetTopics: () => () => void;
}

export const topicsActions: TopicsActions = {
  useSetTopics: () =>
    useRecoilCallback(
      ({ set }) =>
        (topics) =>
          set(topicsAtom, topics)
    ),
  useResetTopics: () =>
    useRecoilCallback(
      ({ reset }) =>
        () =>
          reset(topicsAtom)
    ),
};
