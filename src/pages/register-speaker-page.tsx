import React, { useContext } from "react";
import { AuthUserContext } from "src/lib/authUserContextProvider";
import { PageTemplate } from "../components/PageTemplate";
import { RegisterSpeaker } from "../components/RegisterSpeaker";
import { Speakers } from "../components/Speakers";
import { AuthUser } from "../types/AuthUser";

export default function RegisterSpeakerPage() {
  const authUser: AuthUser = useContext(AuthUserContext);

  return (
    <PageTemplate>
      {authUser.id ? (
        // ログインしてなければ非表示（話す人を登録できない)
        <div className="pb-4">
          <RegisterSpeaker />
        </div>
      ) : (
        // todo ログインしていないときの表示を修正
        "ログインしてね、ログインすると話す人を登録できるよ"
      )}
      {/*todo 登録した話す人一覧を表示*/}
      <Speakers />
    </PageTemplate>
  );
}
