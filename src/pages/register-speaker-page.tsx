import React from "react";
import { PageTemplate } from "../components/PageTemplate";
import { RegisterSpeaker } from "../components/RegisterSpeaker";
import { Speakers } from "../components/Speakers";
import { useRecoilValue } from "recoil";
import { authUserSelector } from "../states/authUser/authUserAtom";

export default function RegisterSpeakerPage() {
  const authUser = useRecoilValue(authUserSelector);

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
