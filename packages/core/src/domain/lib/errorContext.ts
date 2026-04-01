import type { UUID } from "node:crypto";
import type { ZodError } from "zod";
import { ProtocolError } from "../types/errors/protocol.types.js";

const errorContextManager = {
  logAndCreateId: {
    zod: (err: ZodError): UUID => {
      const errorId = crypto.randomUUID();
      console.error(`[ProtocolError:${errorId}]`, {
        issues: err.issues,
        stack: new Error().stack
      });
      return errorId;
    },
    monetary: (message: string): UUID => {
      const errorId = crypto.randomUUID();
      console.error(
        `[ProtocolError:${errorId}]`,
        new Error(message)
      );
      return errorId;
    },
    unknown: (err: unknown): UUID => {
      const errorId = crypto.randomUUID();
      console.error(
        `[ProtocolError]:${errorId}`,
        err
      );
      return errorId;
    }
  }
}


export const createProtocolError = {
  zod: (err: ZodError): ProtocolError => {
    const errorId = errorContextManager.logAndCreateId.zod(err);
    return new ProtocolError(errorId, "ERR_BAD_REQUEST");
  },

  monetary: (message: string): ProtocolError => {
    const errorId = errorContextManager.logAndCreateId.monetary(message);
    return new ProtocolError(errorId, "ERR_DOMAIN_VIOLATION");
  },

  unknown: (err: unknown): ProtocolError => {
    const errorId = errorContextManager.logAndCreateId.unknown(err);
    return new ProtocolError(errorId, "ERR_UNKNOWN");
  }
}
