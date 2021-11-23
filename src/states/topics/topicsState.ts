import { atom, selector } from "recoil";
import { Topic } from "../../lib/useDbFromFirestore";

// todo: keyを別ファイルで管理
export const topicsAtom = atom<Topic[]>({
  key: "topicsAtomKey",
  // todo: nullにするかどうか検討, nullでも良さそう
  default: [],
});

// todo 必要に応じて別ファイルに切り出し
export const topicsSelector = selector<Topic[]>({
  key: "topicsSelectorKey",
  get: ({ get }) => get(topicsAtom),
});
