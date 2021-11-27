import React, { memo, ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { useRouter } from "next/router";
import { firebaseAuth } from "../../firebase";
import { authUserActions } from "../../states/authUser/authUserActions";
import { speakersActions } from "../../states/speakers/speakersActions";
import { pickTitle } from "../../lib/pickTitle";

interface Props {
  children: ReactNode;
}

// ページのベースとなるテンプレートコンポーネント
export const PageTemplate: React.VFC<Props> = memo((props) => {
  const router = useRouter();
  const [setAuthUser, resetAuthUser, resetSpeakers] = [
    authUserActions.useSetAuthUser(),
    authUserActions.useResetAuthUser(),
    speakersActions.useResetSpeakers(),
  ];

  useEffect(() => {
    // TODO: ユーザー監視処理はここで良い？ useGoogleAuthの中でも同様にできそう
    const unSubscription = firebaseAuth.onAuthStateChanged((user) => {
      if (user !== null) {
        setAuthUser(user);
      } else {
        resetAuthUser();
        resetSpeakers();
      }
    });

    return () => unSubscription();
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{pickTitle(router.pathname)}</title>
      </Head>
      <Header />
      <div className="flex-grow overflow-y-scroll">{props.children}</div>
      <Footer pathname={router.pathname} />
    </div>
  );
});
