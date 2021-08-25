import React, { memo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  color: string;
  onClickFunc: () => void;
}

export const MainButton: React.VFC<Props> = memo((props) => {
  return (
    <button
      className={`w-1/2 font-bold text-2xl bg-${props.color}-400 hover:bg-${props.color}-300 py-2 px-4 rounded-xl text-white mx-auto mt-1`}
      onClick={props.onClickFunc}
    >
      {props.children}
    </button>
  );
});
