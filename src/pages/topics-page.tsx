import React from "react";
import { RegisterTopic } from "../components/RegisterTopic";
import { Topics } from "../components/Topics";

export default function TopicsPage() {
  return (
    <div>
      <h1 className="text-xl text-center mt-5 font-bold text-blue-500">
        新規トピック登録ページ
      </h1>
      <div className="pb-4">
        <RegisterTopic />
      </div>
      <Topics />
    </div>
  );
}
