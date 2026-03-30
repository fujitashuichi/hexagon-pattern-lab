export type ApiResult<T> =
  | { ok: false, error: Error }
  | { ok: true, data: T }
