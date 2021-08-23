import React, { memo, useCallback, useContext } from "react";
import { firebaseDB } from "../../firebase";
import { DeleteOutline } from "@material-ui/icons";
import { AuthUser } from "../../pages/_app";
import { AuthUserContext } from "../../lib/authUserContextProvider";

interface Props {
  id: string;
  name: string;
}

export const SpeakerItem: React.VFC<Props> = memo((props) => {
  const authUser: AuthUser = useContext(AuthUserContext);

  // todo 削除機能:スピーカー作成時にログインユーザーと紐付けて登録する
  // const deleteTopic = useCallback(() => {
  //   // todo 該当ユーザーが登録した人でないと削除できないようにする
  //   if (!authUser.id) {
  //     return;
  //   }
  //
  //   firebaseDB
  //     .collection("speakers")
  //     .doc(props.id)
  //     .delete()
  //     .then((data) => {
  //       // todo 成功時ハンドリング
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       // todo 失敗時ハンドリング
  //       console.log(error);
  //     });
  // }, [props, firebaseDB]);

  return (
    <>
      <p>{props.name}</p>

      {/*todo スピーカー削除機能*/}
      {/*{authUser.id && (*/}
      {/*  <DeleteOutline*/}
      {/*    className="cursor-pointer text-white bg-red-500 hover:bg-red-400"*/}
      {/*    onClick={deleteTopic}*/}
      {/*  >*/}
      {/*    削除*/}
      {/*  </DeleteOutline>*/}
      {/*)}*/}
    </>
  );
});
