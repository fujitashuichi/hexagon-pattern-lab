export type ValidateResult<T> =
  | { ok: false, error: Error }
  | { ok: true, data: T }
