## api定義の際のエラーハンドリングについて

### 課題: APIエラーの「情報の出しすぎ」と「情報の少なすぎ」
**出しすぎ:**
  Zodなどのバリデーションエラーをそのまま返すと、DBの構造やビジネスルールが漏洩する（セキュリティリスク）

**少なすぎ:**
  Internal Server Error だけでは、ユーザーからの問い合わせに対して「どのログを見ればいいか」特定できない（運用コスト増）

### 解決策: UUIDによる「情報の非対称性」の確保
**クライアント側:**
* ERR_BAD_REQUEST などと errorId のみを受け取る

**サーバー側:**
* 同じ errorId で、詳細な ZodIssue やスタックトレースをログに出力する

**メリット:**
* ユーザーは「このIDでエラーが出ました」と伝えるだけで、開発者はピンポイントで原因を特定できる

**デメリット:**
* 開発初速の低下。エラー生成の場所が散り始めると、結果的に汚染の原因になる


### 実装例
```ts
export type ProtocolErrorCode =
  // 通信データ由来
  | "ERR_SIZE_MISMATCH"
  | "ERR_CHECKSUM_FAILURE" // 通信最中のデータ破損
  | "ERR_NOT_AUTHENTICATED"
  | "ERR_BAD_REQUEST"
  // ドメイン制約由来
  | "ERR_DOMAIN_VIOLATION"
  | "ERR_UNKNOWN"


export class ProtocolError extends Error {
  constructor(
    public readonly errorId: UUID,
    public readonly code: ProtocolErrorCode
  ) {
    super(code);
    this.name = "ProtocolError";
  }
}
```

### 実装理由:
**抽象のバランス**
* 抽象度の高い実装の中に場当たり的な実装を混ぜすぎると、「いつもなら紐ずいている情報が紐ずいていない」という認識にずれにつながりやすい
* ボイラーテンプレートが多い

**実装しない判断ライン**
* 締め切りに追われる場合。本学習では締め切りは存在しない
* エラー数が少ない・重要なエラーだけ抜き出している場合
  etc...
