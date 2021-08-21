import React, { useContext } from "react";
import { RegisterTopic } from "../components/RegisterTopic";
import { Topics } from "../components/Topics";
import { Auth } from "../components/Auth";
import { AuthUser } from "./_app";
import { AuthUserContext } from "src/lib/authUserContextProvider";
import { Header } from "../components/Header";

export default function TopicsPage() {
  const authUser: AuthUser = useContext(AuthUserContext);

  return (
    <div>
      <Header />
      <h1 className="text-xl text-center mt-5 font-bold text-blue-500">
        トピック一覧
      </h1>
      <Auth />

      {authUser.isAdmin && (
        // 管理者ユーザーでなければ非表示（トピック登録できない)
        <div className="pb-4">
          <RegisterTopic />
        </div>
      )}
      <Topics />
    </div>
  );
}
