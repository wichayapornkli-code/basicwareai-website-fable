import type { CSSProperties } from "react";

// Renders the last `count` words of a title in the serif italic accent.
// Titles without spaces (e.g. Chinese) render unchanged.
export default function AccentWords({
  text,
  count = 1,
  emStyle,
}: {
  text: string;
  count?: number;
  emStyle?: CSSProperties;
}) {
  const words = text.trim().split(" ");
  if (words.length < 2) return <>{text}</>;
  return (
    <>
      {words.slice(0, -count).join(" ")} <em style={emStyle}>{words.slice(-count).join(" ")}</em>
    </>
  );
}
