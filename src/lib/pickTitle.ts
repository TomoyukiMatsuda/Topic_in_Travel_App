// ヘッダータイトルをページにより指定 todo useStateとかを利用した方が良い？
export const pickTitle = (path: string): string => {
  switch (path) {
    case "/":
      return "シャッフル";
    case "/topics-page":
      return "トピック一覧";
    case "/register-speaker-page":
      return "会話に参加してる人を登録";
    default:
      return "トピックる";
  }
};
