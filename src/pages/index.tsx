import Head from "next/head";
import { Main } from "src/components/Main";
import { Sub } from "src/components/Sub";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main />
      <Sub />
    </div>
  );
}
