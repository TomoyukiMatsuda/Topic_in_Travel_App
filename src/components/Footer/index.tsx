import React, { memo } from "react";
import Link from "next/link";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import { useRecoilValue } from "recoil";
import { authUserSelector } from "../../states/authUser/authUserState";

interface Props {
  // todo propsで渡す必要なさそう
  pathname: string;
}

// TODO: stringToEnum() 使いたい&理解したい
const FOOTER_ITEMS = [
  {
    href: "/",
    label: "シャッフル",
  },
  {
    href: "/topics-page",
    label: "一覧",
  },
  {
    href: "/speakers-page",
    label: "話す人",
  },
];

// フッターアイテムの色を判断 todo useStateとかを利用した方が良い？
const decideItemColor = (href: string, pathname: string): string => {
  // パスと一致 ? 青 : 黄
  return href == pathname ? "500" : "400";
};

export const Footer: React.VFC<Props> = memo((props) => {
  const authUser = useRecoilValue(authUserSelector);
  const { signInGoogle, signOutGoogle } = useGoogleAuth();

  return (
    <footer className="h-12 flex-shrink-0 grid grid-cols-4 text-center">
      {FOOTER_ITEMS.map((item) => (
        <Link key={item.href} href={item.href}>
          <button
            className={`bg-blue-${decideItemColor(
              item.href,
              props.pathname
            )} hover:bg-blue-300 text-white font-bold`}
          >
            <a>{item.label}</a>
          </button>
        </Link>
      ))}
      <button
        className="bg-blue-400 hover:bg-blue-300 text-white font-bold`"
        onClick={authUser.id ? signOutGoogle : signInGoogle}
      >
        {/* todo 文言修正*/}
        {authUser.id ? authUser.name : "ログイン"}
      </button>
    </footer>
  );
});
