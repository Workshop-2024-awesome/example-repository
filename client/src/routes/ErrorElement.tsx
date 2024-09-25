import { useRouteError } from "react-router-dom";

export function ErrorElement() {
  const error = useRouteError();

  let errorMessage;

  if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {errorMessage && (
        <p>
          <i>{errorMessage}</i>
        </p>
      )}
    </div>
  );
}
