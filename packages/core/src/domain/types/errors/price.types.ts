import type { UUID } from "crypto";

export type MonetaryErrorCode =
  | "ERR_INVALID_MONETARY_AMOUNT"
  | "ERR_INVALID_MONETARY_STATe"


export class ProtocolError extends Error {
  constructor(
    public readonly errorId: UUID,
    public readonly code: MonetaryErrorCode
  ) {
    super(code);
    this.name = "MonetaryError";
  }
}
