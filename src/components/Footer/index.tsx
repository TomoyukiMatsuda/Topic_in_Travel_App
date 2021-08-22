import React from "react";
import Link from "next/link";

export const Footer: React.VFC = () => {
  return (
    <footer className="bg-blue-300 ">
      <div className="grid grid-cols-4 text-center">
        <Link href="/">
          <button className="bg-yellow-400 hover:bg-yellow-300 text-white font-bold">
            <a>シャッフル</a>
          </button>
        </Link>
        <Link href="/topics-page">
          <button className="bg-blue-400 hover:bg-blue-300 text-white font-bold">
            <a>カテゴリ一覧</a>
          </button>
        </Link>
        <Link href="/speaker">
          <button className="bg-blue-400 hover:bg-blue-300 text-white font-bold">
            <a>話す人</a>
          </button>
        </Link>
        <Link href="/login">
          <button className="bg-blue-400 hover:bg-blue-300 text-white font-bold">
            <a>アカウント</a>
          </button>
        </Link>
      </div>
    </footer>
  );
};
