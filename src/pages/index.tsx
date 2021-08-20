import Head from "next/head";
import { Main } from "src/components/Main";
import { Header } from "../components/Header";

export default function Home() {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main />
    </div>
  );
}
