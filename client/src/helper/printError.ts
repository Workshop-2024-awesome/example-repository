import toast from "react-hot-toast";

export function printError(e: unknown) {
  if (e instanceof Error) {
    toast(e.message);
  } else {
    console.error(e);
  }
}