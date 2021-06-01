// TODO: データfetchできてない なぜフェッチしたい
import fetch from 'node-fetch';
const BASE_URL = "http://localhost:8080/common_topic/list";

export async function getAllTopics() {
    // apiを叩いて トピックデータを全件取得
    const res = await fetch(
        new URL(BASE_URL)
    );

    const posts = await res.json();
    return posts;
}