import React, { memo, useCallback, useContext } from "react";
import { firebaseDB } from "../../firebase";
import { DeleteOutline } from "@material-ui/icons";
import { AuthUserContext } from "../../lib/authUserContextProvider";
import { AuthUser } from "../../types/AuthUser";

interface Props {
  id: string;
  userId: string;
  name: string;
}

export const SpeakerItem: React.VFC<Props> = memo((props) => {
  const authUser: AuthUser = useContext(AuthUserContext);

  const deleteSpeaker = useCallback(() => {
    // 該当ユーザーが登録したスピーカーでないと削除できない todo エラーハンドリング
    if (authUser.id !== props.userId) {
      return;
    }

    firebaseDB
      .collection("speakers")
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
      <p>{props.name}</p>

      {authUser.id && (
        <DeleteOutline
          className="cursor-pointer text-white bg-red-500 hover:bg-red-400"
          onClick={deleteSpeaker}
        >
          削除
        </DeleteOutline>
      )}
    </>
  );
});
