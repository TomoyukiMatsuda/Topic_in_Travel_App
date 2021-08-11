import React from "react";
import { useForm } from "react-hook-form";

export const RegisterTopic: React.VFC = () => {
  // todo: バリデーション設定 / React Hook Form について理解
  // tailwind:https://v1.tailwindcss.com/components/forms
  // https://zenn.dev/erukiti/articles/webform-2021
  // https://react-hook-form.com/jp/get-started
  const { register, watch, handleSubmit, formState } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      topic: "",
    },
  });

  return (
    <div>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="topic"
        >
          NEWトピック
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="topic"
          type="text"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          登録
        </button>
      </form>
    </div>
  );
};
