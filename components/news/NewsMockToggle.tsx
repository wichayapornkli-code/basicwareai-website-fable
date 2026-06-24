"use client";

import { IS_NEWS_MOCK_DEV, NEWS_MOCK_COUNT } from "@/lib/news-mock";
import { PAGE_SIZE } from "@/lib/news";

const FONT = '"Plus Jakarta Sans", sans-serif';

type Props = {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
};

/** DEV ONLY — remove before deploy. */
export default function NewsMockToggle({ enabled, onChange }: Props) {
  if (!IS_NEWS_MOCK_DEV) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 14px",
        borderRadius: "10px",
        backgroundColor: "rgba(20, 20, 20, 0.92)",
        color: "#fff",
        fontFamily: FONT,
        fontSize: "13px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
      }}
    >
      <span style={{ opacity: 0.7, fontSize: "11px", letterSpacing: "0.04em" }}>DEV</span>
      <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => onChange(e.target.checked)}
          style={{ accentColor: "#015ac6" }}
        />
        Show listing mock ({NEWS_MOCK_COUNT + 1} articles, {PAGE_SIZE}/page)
      </label>
    </div>
  );
}
