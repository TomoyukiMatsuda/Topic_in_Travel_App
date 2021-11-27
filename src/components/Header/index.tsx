import React, { memo } from "react";
import { useRouter } from "next/router";
import { pickTitle } from "../../lib/pickTitle";

// ヘッダーコンポーネント
export const Header: React.VFC = memo(() => {
  const router = useRouter();

  return (
    // TODO: トピック一覧の時に高さが小さくなるのを修正
    <header className="flex flex-shrink-0 h-12 justify-center items-center bg-blue-400 text-xl text-white font-bold">
      <h1>{pickTitle(router.pathname)}</h1>
    </header>
  );
});
