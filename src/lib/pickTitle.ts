// ヘッダータイトルをページにより指定
export const pickTitle = (path: string): string => {
  switch (path) {
    case "/":
      return "シャッフル";
    case "/topics-page":
      return "トピック一覧";
    case "/speakers-page":
      return "会話に参加してる人を登録";
    default:
      return "トピックる";
  }
};
