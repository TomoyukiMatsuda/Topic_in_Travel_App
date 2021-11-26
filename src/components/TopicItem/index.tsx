import React, { memo, useCallback, useState } from "react";
import { firebaseDB } from "../../firebase";
import { DeleteOutline } from "@material-ui/icons";
import { useRecoilValue } from "recoil";
import { authUserSelector } from "../../states/authUser/authUserState";
import { topicsActions } from "../../states/topics/topicsActions";

interface Props {
  id: string;
  content: string;
}

export const TopicItem: React.VFC<Props> = memo((props) => {
  const authUser = useRecoilValue(authUserSelector);
  // todo 命名
  const deleteTopicAction = topicsActions.useDeleteTopic();

  // todo 削除前に確認ダイアログ表示させた後に削除処理実行したい
  const deleteTopic = useCallback(() => {
    // 管理者ユーザーでなければ削除できない
    if (!authUser.isAdmin) {
      console.log("トピックを削除できません");
      return;
    }

    // todo 現状はapiの通信処理後にrecoilのステートを削除している。どうにかする？
    firebaseDB
      .collection("topics")
      .doc(props.id)
      .delete()
      .then((data) => {
        deleteTopicAction(props.id);
      })
      .catch((error) => {
        alert("トピックの削除に失敗しました");
        console.log(error);
      });
  }, [props, firebaseDB]);

  return (
    <>
      <p>{props.content}</p>

      {authUser.isAdmin && (
        // Adminユーザーでない場合は削除ボタンを非表示
        <DeleteOutline
          className="cursor-pointer text-white bg-red-500 hover:bg-red-400"
          onClick={deleteTopic}
        >
          削除
        </DeleteOutline>
      )}
    </>
  );
});
