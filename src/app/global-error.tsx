"use client";

import React from "react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: "2rem", backgroundColor: "#F7F1E5", fontFamily: "sans-serif" }}>
        <div
          style={{
            maxWidth: "600px",
            margin: "4rem auto",
            padding: "2rem",
            backgroundColor: "#FFFFFF",
            border: "3px solid #171717",
            boxShadow: "6px 6px 0px #171717",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "1.75rem", textTransform: "uppercase" }}>
            Critical System Error
          </h1>
          <p style={{ marginTop: "1rem", color: "#4B5563" }}>
            A critical error interrupted the application shell.
          </p>
          <button
            onClick={() => reset()}
            style={{
              marginTop: "1.5rem",
              padding: "0.75rem 1.5rem",
              backgroundColor: "#FF5C8A",
              color: "#171717",
              fontWeight: "bold",
              border: "2px solid #171717",
              boxShadow: "3px 3px 0px #171717",
              cursor: "pointer",
            }}
          >
            RELOAD APPLICATION
          </button>
        </div>
      </body>
    </html>
  );
}
