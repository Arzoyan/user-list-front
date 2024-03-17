"use client";
import { useRouting } from "@/hooks/useRouting";

import "./notFoundStyles.css";

export default function NotFound() {
  const { redirectToPage } = useRouting();
  return (
    <div className="not-found">
      <main>
        <div class="container">
          <div class="row">
            <div class="col-md-6 align-self-center">
              <img src="/notFound.svg" alt="not Found" priority />
            </div>
            <div class="col-md-6 align-self-center">
              <h1>404</h1>
              <h2>UH OH! You're lost.</h2>
              <p>
                The page you are looking for does not exist. How you got here is
                a mystery. But you can click the button below to go back to the
                homepage.
              </p>
              <button
                class="btn green"
                onClick={() => {
                  redirectToPage("/");
                }}
              >
                HOME
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
