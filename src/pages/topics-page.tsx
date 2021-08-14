import React from "react";
import { RegisterTopic } from "../components/RegisterTopic";
import { Topics } from "../components/Topics";

export default function TopicsPage() {
  return (
    <div>
      <RegisterTopic />
      <Topics />
    </div>
  );
}
