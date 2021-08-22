import React, { useCallback, memo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  pathname: string;
}

const footerItems = [
  {
    href: "/",
    label: "シャッフル",
  },
  {
    href: "/topics-page",
    label: "一覧",
  },
  {
    href: "/speaker", // todo ページを用意
    label: "話す人",
  },
  {
    href: "/login", // todo ページを用意
    label: "ログイン",
  },
];

// フッターアイテムの色を判断 todo useStateとかを利用した方が良い？
const decideItemColor = (href: string, pathname: string): string => {
  // パスと一致 ? 青 : 黄
  return href == pathname ? "blue" : "yellow";
};

export const Footer: React.VFC<Props> = memo((props) => {
  return (
    <footer className="h-12 bg-blue-300 grid grid-cols-4 text-center">
      {footerItems.map((item) => (
        <Link href={item.href}>
          <button
            className={`bg-${decideItemColor(
              item.href,
              props.pathname
            )}-400 hover:bg-${decideItemColor(
              item.href,
              props.pathname
            )}-300 text-white font-bold`}
          >
            <a>{item.label}</a>
          </button>
        </Link>
      ))}
    </footer>
  );
});
