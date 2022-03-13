import React, { memo, useCallback } from "react";
import { firebaseDB } from "../../firebase";
import { DeleteOutline } from "@material-ui/icons";
import { authUserSelector } from "../../states/authUser/authUserState";
import { useRecoilValue } from "recoil";
import { speakersActions } from "../../states/speakers/speakersActions";

interface Props {
  id: string;
  userId: string;
  name: string;
}

export const SpeakerItem: React.VFC<Props> = memo((props) => {
  const authUser = useRecoilValue(authUserSelector);
  // todo 命名修正必要？
  const deleteSpeakerAction = speakersActions.useDeleteSpeaker();

  // TODO: 削除前に確認ダイアログを表示させる
  const deleteSpeaker = useCallback(() => {
    // 該当ユーザーが登録したスピーカーでないと削除できない todo エラーハンドリング
    if (authUser.id !== props.userId) {
      alert("削除できませんでした");
      return;
    }

    firebaseDB
      .collection("speakers")
      .doc(props.id)
      .delete()
      .then((data) => {
        deleteSpeakerAction(props.id);
      })
      .catch((error) => {
        // todo 失敗時ハンドリング
        alert("削除に失敗しました");
      });
  }, [props, firebaseDB]);

  return (
    <>
      <p>{props.name}</p>

      {authUser.id && (
        <DeleteOutline
          className="cursor-pointer text-white bg-red-500 hover:bg-red-400 rounded-full"
          onClick={deleteSpeaker}
        >
          削除
        </DeleteOutline>
      )}
    </>
  );
});
