import React from "react";
import { PageTemplate } from "../components/PageTemplate";
import { RegisterSpeakerForm } from "../components/RegisterSpeaker";
import { Speakers } from "../components/Speakers";
import { useRecoilValue } from "recoil";
import { authUserSelector } from "../states/authUser/authUserState";

export default function RegisterSpeakerPage() {
  const authUser = useRecoilValue(authUserSelector);

  return (
    <PageTemplate>
      {authUser.id ? (
        // ログインしてなければ非表示（話す人を登録できない)
        <div className="pb-4">
          <RegisterSpeakerForm />
        </div>
      ) : (
        // todo ログインしていないときの表示を修正
        "ログインすると話す人を登録できるよ"
      )}
      <Speakers />
    </PageTemplate>
  );
}
