import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const CancelPage = () => {
  const location = useLocation();
  const [errorCode, setErrorCode] = useState();
  const [errorMessage, setErrorMessage] = useState();
  useEffect(() => {
    if (location.pathname === "/order-cancelled") {
      setErrorCode("402");
      setErrorMessage("Payment Failed!");
    } else {
      setErrorCode("404");
      setErrorMessage("Something's missing.");
    }
  }, [location]);
  return (
    <>
      <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-sm text-center">
            <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
              {errorCode}
            </h1>
            <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
              {errorMessage}
            </p>
            {errorCode === "404" ? (
              <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                "Sorry, we can't find that page. You'll find lots to explore on
                the home page. "
              </p>
            ) : null}

            <a
              href="/"
              class="inline-flex text-white bg-purple-500 hover:bg-purple-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
            >
              Back to Homepage
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
