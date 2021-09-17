import React, { memo, useContext } from "react";
import Link from "next/link";
import { useGoogleAuth } from "../../lib/useGoogleAuth";
import { AuthUser } from "../../pages/_app";
import { AuthUserContext } from "../../lib/authUserContextProvider";

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
    href: "/register-speaker-page",
    label: "話す人",
  },
];

// フッターアイテムの色を判断 todo useStateとかを利用した方が良い？
const decideItemColor = (href: string, pathname: string): string => {
  // パスと一致 ? 青 : 黄
  return href == pathname ? "500" : "400";
};

export const Footer: React.VFC<Props> = memo((props) => {
  const authUser: AuthUser = useContext(AuthUserContext);
  const { signInGoogle, signOutGoogle } = useGoogleAuth();

  return (
    <footer className="h-12 grid grid-cols-4 text-center">
      {footerItems.map((item) => (
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
