import React, { memo } from "react";
import { useRouter } from "next/router";
import { pickTitle } from "../../lib/pickTitle";

// ヘッダーコンポーネント
export const Header: React.VFC = memo(() => {
  const router = useRouter();

  return (
    // todo トピック一覧の時に高さが小さくなるのを修正
    <header className="flex items-center justify-center h-12 bg-blue-400 items-center text-xl text-white font-bold">
      <h1>{pickTitle(router.pathname)}</h1>
    </header>
  );
});
