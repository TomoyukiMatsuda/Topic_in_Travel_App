import React, { memo, ReactNode, useState } from "react";
import Head from "next/head";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { useRouter } from "next/router";

interface Props {
  children: ReactNode;
}

// ヘッダータイトルをページにより指定 todo useStateとかを利用した方が良い？
const headerTitle = (path: string): string => {
  switch (path) {
    case "/":
      return "シャッフル";
    case "/topics-page":
      return "トピック一覧";
    case "/register-speaker-page":
      return "会話に参加してる人を登録";
    default:
      return "トピックる";
  }
};

// ページのベースとなるテンプレートコンポーネント
export const PageTemplate: React.VFC<Props> = memo((props) => {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{headerTitle(router.pathname)}</title>
      </Head>
      <Header title={headerTitle(router.pathname)} />
      <div className="flex-grow overflow-y-scroll">{props.children}</div>
      <Footer pathname={router.pathname} />
    </div>
  );
});
