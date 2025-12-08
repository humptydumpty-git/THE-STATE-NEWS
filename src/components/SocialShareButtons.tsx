"use client";
import { useState } from "react";

type Props = { url: string; title?: string };

export default function SocialShareButtons({ url, title }: Props) {
  const [copied, setCopied] = useState(false);
  const resolvedUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const shareText = encodeURIComponent(title || "");
  const shareUrl = encodeURIComponent(resolvedUrl);
  const items = [
    { label: "X", href: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}` },
    { label: "Reddit", href: `https://www.reddit.com/submit?url=${shareUrl}&title=${shareText}` },
  ];
  return (
    <div className="flex items-center gap-3">
      {items.map((i) => (
        <a key={i.label} href={i.href} target="_blank" rel="noopener noreferrer" className="text-sm underline">
          {i.label}
        </a>
      ))}
      <button
        className="rounded border px-2 py-1 text-sm"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(resolvedUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          } catch {}
        }}
      >
        {copied ? "Copied" : "Copy Link"}
      </button>
    </div>
  );
}
