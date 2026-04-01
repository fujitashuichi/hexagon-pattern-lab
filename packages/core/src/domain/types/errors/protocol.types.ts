import type { UUID } from "crypto";

export type ProtocolErrorCode =
  // 通信データ由来
  | "ERR_SIZE_MISMATCH"
  | "ERR_CHECKSUM_FAILURE" // 通信最中のデータ破損
  | "ERR_NOT_AUTHENTICATED"
  | "ERR_BAD_REQUEST"
  // ドメイン制約由来
  | "ERR_DOMAIN_VIOLATION"


export class ProtocolError extends Error {
  constructor(
    public readonly errorId: UUID,
    public readonly code: ProtocolErrorCode
  ) {
    super(code);
    this.name = "ProtocolError";
  }
}
