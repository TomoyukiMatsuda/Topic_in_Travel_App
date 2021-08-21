import Link from "next/link";
import React, { memo } from "react";

export const Header: React.VFC = memo(() => {
  return (
    <header className="text-center">
      <Link href="/">
        <button className="bg-yellow-400 hover:bg-yellow-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          <a>シャッフルページ</a>
        </button>
      </Link>
      <Link href="/topics-page">
        <button className="bg-blue-400 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          <a>トピック一覧ページ</a>
        </button>
      </Link>
    </header>
  );
});
