import React, { useContext } from "react";
import { RegisterTopic } from "../components/RegisterTopic";
import { Topics } from "../components/Topics";
import { Auth } from "../components/Auth";
import { AuthUser, AuthUserContext } from "./_app";

export default function TopicsPage() {
  // todo このエラーなんとかしたい
  const authUser: AuthUser = useContext(AuthUserContext);

  return (
    <div>
      <h1 className="text-xl text-center mt-5 font-bold text-blue-500">
        トピック一覧
      </h1>
      <Auth />
      {/*ログインしていなければ表示*/}
      {authUser.id !== "" && (
        <div className="pb-4">
          <RegisterTopic />
        </div>
      )}
      {/* todo ログイン時に、トピックの登録 と トピックの削除（Topicコンポーネント） 可能にする*/}

      <Topics />
    </div>
  );
}
