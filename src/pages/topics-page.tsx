import React, { useContext } from "react";
import { RegisterTopic } from "../components/RegisterTopic";
import { Topics } from "../components/Topics";
import { Auth } from "../components/Auth";
import { AuthUserContext } from "src/lib/authUserContextProvider";
import { AuthUser } from "./_app";
import { PageTemplate } from "../components/PageTemplate";

export default function TopicsPage() {
  const authUser: AuthUser = useContext(AuthUserContext);

  return (
    <PageTemplate>
      <Auth />
      {authUser.isAdmin && (
        // 管理者ユーザーでなければ非表示（トピック登録できない)
        <div className="pb-4">
          <RegisterTopic />
        </div>
      )}
      <Topics />
    </PageTemplate>
  );
}
