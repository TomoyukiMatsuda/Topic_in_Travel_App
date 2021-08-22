import React from "react";
import Link from "next/link";

const footerItems = [
  {
    href: "/",
    label: "シャッフル",
  },
  {
    href: "/topic-page",
    label: "カテゴリー",
  },
  {
    href: "/speaker",
    label: "話す人",
  },
  {
    href: "/login",
    label: "ログイン",
  },
];

export const Footer: React.VFC = () => {
  return (
    <footer className="h-12 bg-blue-300 grid grid-cols-4 text-center">
      {footerItems.map((item) => (
        <Link href={item.href}>
          <button className="bg-yellow-400 hover:bg-yellow-300 text-white font-bold">
            <a>{item.label}</a>
          </button>
        </Link>
      ))}
    </footer>
  );
};
