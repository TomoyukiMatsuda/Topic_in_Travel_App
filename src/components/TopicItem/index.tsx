import React, { memo, useCallback, useContext } from "react";
import { firebaseDB } from "../../firebase";
import { DeleteOutline } from "@material-ui/icons";
import { AuthUserContext } from "../../lib/authUserContextProvider";
import { AuthUser } from "../../types/AuthUser";

interface Props {
  id: string;
  content: string;
}

export const TopicItem: React.VFC<Props> = memo((props) => {
  const authUser: AuthUser = useContext(AuthUserContext);

  // todo 削除前に確認ダイアログ表示させたい
  const deleteTopic = useCallback(() => {
    // 管理者ユーザーでなければ削除できない
    if (!authUser.isAdmin) {
      return;
    }

    firebaseDB
      .collection("topics")
      .doc(props.id)
      .delete()
      .then((data) => {
        // todo 成功時ハンドリング
        console.log(data);
      })
      .catch((error) => {
        // todo 失敗時ハンドリング
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
