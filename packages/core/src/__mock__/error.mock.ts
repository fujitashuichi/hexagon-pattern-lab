import { z } from "zod";

export const zodErrorMock = new z.ZodError([
  {
    code: "invalid_type",
    expected: "object",
    path: ["dummy_path"],
    message: 'This is dummy Error'
  },
]);
