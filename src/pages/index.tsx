import Head from "next/head";
import { Main } from "src/components/Main";
import { RegisterTopic } from "../components/RegisterTopic";
import {Topics} from "../components/Topics";

export default function Home() {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/*<Main />*/}
      <Topics />
    </div>
  );
}
