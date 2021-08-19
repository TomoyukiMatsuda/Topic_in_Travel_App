import React, { memo, useCallback, useContext } from "react";
import { firebaseDB } from "../../firebase";
import { DeleteOutline } from "@material-ui/icons";
import { AuthUser, AuthUserContext } from "../../pages/_app";

interface Props {
  id: string;
  content: string;
}

export const TopicItem: React.VFC<Props> = memo((props) => {
  // todo この Typeエラー なんとかしたい
  const authUser: AuthUser = useContext(AuthUserContext);

  // todo 削除前に確認ダイアログ表示させたい
  const deleteTopic = useCallback(() => {
    // todo ログインしてるかどうか認証機能を挟む
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

      {authUser.id !== "" && (
        // ログインしていない場合は削除ボタンを非表示
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
