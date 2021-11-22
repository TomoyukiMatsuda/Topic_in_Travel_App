import React, { useContext } from "react";
import { RegisterTopic } from "../components/RegisterTopic";
import { Topics } from "../components/Topics";
import { AuthUserContext } from "src/lib/authUserContextProvider";
import { PageTemplate } from "../components/PageTemplate";

export default function TopicsPage() {
  const authUser = useContext(AuthUserContext);

  return (
    <PageTemplate>
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
