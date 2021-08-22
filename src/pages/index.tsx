import Head from "next/head";
import { Main } from "src/components/Main";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex-grow overflow-y-scroll">
        <Main />
      </div>
      <Footer />
    </div>
  );
}
