import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const rtkQueryErrorLogger: Middleware =
  (_api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const errorMessage =
        "data" in action.error
          ? (action.error.data as { message: string }).message
          : action.error.message;
      if (!errorMessage) {
        return;
      }
      toast.error(
        "Api call failed!\n" +
          errorMessage +
          JSON.stringify((action.meta.arg as any)?.endpointName)
      );
    }

    return next(action);
  };
