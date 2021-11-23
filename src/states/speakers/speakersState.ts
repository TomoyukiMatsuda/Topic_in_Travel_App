import { atom, selector } from "recoil";
import { Speaker } from "../../types/Speaker";

// todo: keyを別ファイルで管理
export const speakersAtom = atom<Speaker[]>({
  key: "speakersAtomKey",
  // todo: nullにするかどうか検討, nullでも良さそう
  default: [],
});

// todo 必要に応じて別ファイルに切り出し
export const speakersSelector = selector<Speaker[]>({
  key: "speakersSelectorKey",
  get: ({ get }) => get(speakersAtom),
});
