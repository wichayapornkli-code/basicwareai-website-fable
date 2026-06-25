"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useDark } from "@/components/ThemeProvider";

const FONT = '"Plus Jakarta Sans", sans-serif';

type Props = {
  currentPage: number;
  totalPages: number;
};

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width={8}
      height={14}
      viewBox="0 0 8 14"
      fill="none"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <path
        d={direction === "left" ? "M7 1L1 7L7 13" : "M1 1L7 7L1 13"}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PageButton({
  children,
  active,
  onClick,
  ariaLabel,
  isDark,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  isDark: boolean;
}) {
  const borderColor = active
    ? "var(--c-accent)"
    : isDark
      ? "rgba(255,255,255,0.22)"
      : "#e8e8e8";
  const textColor = active ? "#fff" : isDark ? "#c8c8c8" : "#7c7c7c";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-current={active ? "page" : undefined}
      disabled={!onClick}
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "100px",
        border: `1px solid ${borderColor}`,
        backgroundColor: active ? "var(--c-accent)" : "transparent",
        color: textColor,
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: "14px",
        cursor: onClick ? "pointer" : "default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        flexShrink: 0,
        opacity: onClick ? 1 : 0.45,
      }}
    >
      {children}
    </button>
  );
}

export default function Pagination({ currentPage, totalPages }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isDark } = useDark();
  const t = useTranslations("pagination");

  if (totalPages <= 1) return null;

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (page <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px 0",
      }}
    >
      <PageButton
        ariaLabel={t("previous")}
        isDark={isDark}
        onClick={currentPage > 1 ? () => goToPage(currentPage - 1) : undefined}
      >
        <ChevronIcon direction="left" />
      </PageButton>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <PageButton
          key={page}
          active={page === currentPage}
          isDark={isDark}
          onClick={() => goToPage(page)}
          ariaLabel={t("page", { page })}
        >
          {page}
        </PageButton>
      ))}

      <PageButton
        ariaLabel={t("next")}
        isDark={isDark}
        onClick={
          currentPage < totalPages ? () => goToPage(currentPage + 1) : undefined
        }
      >
        <ChevronIcon direction="right" />
      </PageButton>
    </div>
  );
}
