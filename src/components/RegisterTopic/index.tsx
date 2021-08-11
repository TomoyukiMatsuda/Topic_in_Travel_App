import React from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

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

  // Submitボタン押した時の成功時？
  const handleOnSubmit: SubmitHandler<ValueType> = (values) => {
    console.log(values);
  };

  // Submitボタン押した時の失敗時？
  const handleOnError: SubmitErrorHandler<ValueType> = (errors) => {
    console.log(errors);
  };

  return (
    <div>
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
