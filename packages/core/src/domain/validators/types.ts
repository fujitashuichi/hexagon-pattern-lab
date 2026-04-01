import type { ProtocolError } from "../types/errors/protocol.types.js";

export type ValidateResult<T> =
  | { ok: false, error: ProtocolError }
  | { ok: true, data: T }
