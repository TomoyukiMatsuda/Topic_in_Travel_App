import Head from "next/head";
import { Main } from "src/components/Main";
import { RegisterTopic } from "../components/RegisterTopic";

export default function Home() {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main />
      <RegisterTopic />
    </div>
  );
}
