import React from "react";
import { RegisterTopic } from "../components/RegisterTopic";
import { Topics } from "../components/Topics";
import { PageTemplate } from "../components/PageTemplate";
import { authUserSelector } from "../states/authUser/authUserAtom";
import { useRecoilValue } from "recoil";

export default function TopicsPage() {
  const authUser = useRecoilValue(authUserSelector);

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
