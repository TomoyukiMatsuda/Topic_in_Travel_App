import React from "react";
import { RegisterTopic } from "../components/RegisterTopic";
import { Topics } from "../components/Topics";
import { Auth } from "../components/Auth";

export default function TopicsPage() {
  return (
    <div>
      <h1 className="text-xl text-center mt-5 font-bold text-blue-500">
        トピック一覧
      </h1>
      {/* todo ログイン時に、トピックの登録 と トピックの削除（Topicコンポーネント） 可能にする
      <Auth />*/}
      {/*<div className="pb-4">*/}
      {/*  <RegisterTopic />*/}
      {/*</div>*/}
      <Topics />
    </div>
  );
}
