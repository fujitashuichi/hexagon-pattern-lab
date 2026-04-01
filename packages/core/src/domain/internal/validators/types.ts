import type { ProtocolError } from "../../types/index.js";

export type ValidateResult<T> =
  | { ok: false, error: ProtocolError }
  | { ok: true, data: T }
