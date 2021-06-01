import { useState } from "react";
import Head from "next/head";
import {getAllTopics} from "../../../lib/topics";

export const Sub = ({ allTopics }) => {
    const [topic, setTopic] = useState("なにをやねん");
    const [member, setMember] = useState("だれがやねん");

    // TODO: ここにfetchしてきたデータを入れたい
    //const topics: Array<string> = allTopics.map((t) => t.content)
    console.log(allTopics)

    // TODO: 名前をもっとおもろくする
    // 小池たちバージョン
    // const members: Array<string> = [
    //   "池氏",
    //   "松本くん",
    //   "小池（♀）",
    //   "ゆめち",
    //   "まつにい",
    // ];

    const members: Array<string> = ["よっしーパイセン", "アサイ君", "まつだ氏"];

    const onClickShuffle = () => {
        // シャッフルされた話題を表示させる
        let topicNum = Math.floor(Math.random() * topics.length);
        let memberNum = Math.floor(Math.random() * members.length);

        setTopic(topics[topicNum]);
        setMember(members[memberNum]);
    };

    return (
        <div className="mt-5 justify-center flex flex-col">
            {/* TODO: レイアウトをきれいにする */}
            <Head>
                <title>たのしくいきたい</title>
            </Head>

            <p className="text-xl font-bold font-mono m-5 max-w-lg mt-12">
                {member === "だれがやねん" ? member : `だれ？：${member}`}
            </p>
            <p className="text-xl font-bold  font-mono m-5 max-w-lg mb-5">
                {topic === "なにをやねん" ? topic : `なに？：${topic}`}
            </p>

            <button
                className="text-white text-4xl font-semibold shadow-2xl rounded-full bg-blue-400 p-2 m-5 hover:bg-blue-300 active:shadow-none mt-11"
                onClick={onClickShuffle}
            >
                ぷっしゅ
            </button>
        </div>
    );
};

export async function getStaticProps() {
    const allTopics: {id: number, content: string} = await getAllTopics();
    console.log(allTopics)
    // const topics: string = allTopics.map((topic) => {
    //     topic.content
    // })
    return {
        props: { allTopics }
    }
}
