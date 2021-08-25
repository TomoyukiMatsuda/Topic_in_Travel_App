import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ShuffleLabel: React.VFC<Props> = (props) => {
  return (
    <p className="text-center text-gray-600 text-xl font-bold  font-mono m-5 mx-auto">
      {props.children}
    </p>
  );
};
