import { InventoryStateSchema, type InventoryState } from "../types/Inventory.types.js";
import type { ValidateResult } from "./types.js";


export const validateInventoryStatus = ({
  physical, allocated
}: InventoryState
): ValidateResult<InventoryState> => {
  const parsed = InventoryStateSchema.safeParse({
    physical, allocated
  });

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error
    }
  }

  return {
    ok: true,
    data: parsed.data
  }
}
