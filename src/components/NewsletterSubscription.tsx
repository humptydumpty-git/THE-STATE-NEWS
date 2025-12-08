"use client";
import { useState } from "react";

export default function NewsletterSubscription() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  return (
    <form
      className="flex w-full max-w-md flex-col gap-2"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          setStatus("error");
          return;
        }
        setStatus("loading");
        try {
          const res = await fetch("/api/subscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
          if (res.ok) setStatus("success");
          else setStatus("error");
        } catch {
          setStatus("error");
        }
      }}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="w-full rounded border px-3 py-2"
        required
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded bg-black px-3 py-2 text-white disabled:opacity-60 dark:bg-white dark:text-black"
      >
        {status === "loading" ? "Subscribing..." : "Subscribe"}
      </button>
      {status === "success" && <div className="text-green-600">Subscribed</div>}
      {status === "error" && <div className="text-red-600">Error</div>}
    </form>
  );
}

