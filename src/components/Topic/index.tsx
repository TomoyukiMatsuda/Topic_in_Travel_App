import React, { memo, useCallback } from "react";

interface Props {
  id: string;
  content: string;
}

export const Topic: React.VFC<Props> = memo((props) => {
  const deleteTopic = useCallback(() => {}, []);

  return (
    <div>
      <p>{props.content}</p>
      <button onClick={() => deleteTopic()}>削除</button>
    </div>
  );
});
