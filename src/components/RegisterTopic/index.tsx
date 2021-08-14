import React, { FormEvent, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { firebaseDB } from "../../firebase";
import firebase from "firebase/app";

// useForm の型指定
interface ValueType {
  topic: string;
}

export const RegisterTopic: React.VFC = () => {
  // todo: バリデーション設定 / React Hook Form について理解
  // tailwind:https://v1.tailwindcss.com/components/forms
  // https://zenn.dev/erukiti/articles/webform-2021
  // https://react-hook-form.com/jp/get-started
  const { register, watch, handleSubmit, formState } = useForm<ValueType>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      topic: "",
    },
  });

  // todo: React Hook Form を利用しないパターン 登録されない
  // Firebaseのメソッドとかに問題ありそう
  //https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=0#web-v8_1
  const [topic, setTopic] = useState<string>();
  const sendTopic = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    firebaseDB
      .collection("topics")
      .doc("topic")
      .set({
        topic: topic,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log("成功");
      })
      .catch((e) => {
        console.log(e);
      });

    console.log(topic);
    setTopic("");
  };

  // Submitボタン押した時の成功時？
  const handleOnSubmit: SubmitHandler<ValueType> = (values) => {
    // todo: なぜかfirestoreに登録されない
    firebaseDB.collection("topics").add({
      topic: values.topic,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // .then((r) => {
    //   // 成功
    //   console.log(r);
    // })
    // .catch((e) => {
    //   // 失敗
    //   console.log(e);
    // });
    console.log(values);
    // 文字を初期化したい
  };

  // Submitボタン押した時の失敗時？
  const handleOnError: SubmitErrorHandler<ValueType> = (errors) => {
    console.log(errors);
  };

  return (
    <div>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8"
        onSubmit={sendTopic}
      >
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="topic"
        >
          React Hook Formじゃない方
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="topic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={!topic}
        >
          登録
        </button>
      </form>

      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8"
        // handleSubmit(成功時処理, 失敗時処理) っぽい
        onSubmit={handleSubmit(handleOnSubmit, handleOnError)}
      >
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="topic"
        >
          NEWトピック
        </label>
        {/*この topic はdefaultValues で指定した名前に基づいてる
           !! は二重否定 無理矢理 Boolean に変えているよう
        */}
        {!!formState.errors.topic && <p>{formState.errors.topic.message}</p>}
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="topic"
          type="text"
          {...register("topic", {
            required: "required でエラー / 必須だよ",
          })}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={!formState.isDirty || formState.isSubmitting}
        >
          登録
        </button>
      </form>
    </div>
  );
};
