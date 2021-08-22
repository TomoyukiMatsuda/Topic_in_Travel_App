import React, { memo } from "react";

interface Props {
  title: string;
}

// ヘッダーコンポーネント
export const Header: React.VFC<Props> = memo((props) => {
  return (
    <header className="flex items-center justify-center h-12 bg-blue-400 items-center text-white font-bold">
      <h1>{props.title}</h1>
    </header>
  );
});
