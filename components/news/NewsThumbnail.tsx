import type { CSSProperties } from "react";

type Props = {
  coverSrc?: string;
  alt: string;
  zoomOnHover?: boolean;
  borderRadius?: string;
  aspectRatio?: string;
  fullWidth?: boolean;
};

const THUMB_STYLE: CSSProperties = {
  position: "relative",
  width: "min(100%, 309px)",
  aspectRatio: "3 / 2",
  borderRadius: "8px",
  overflow: "hidden",
  flexShrink: 0,
};

export default function NewsThumbnail({
  coverSrc,
  alt,
  zoomOnHover = false,
  borderRadius,
  aspectRatio,
  fullWidth = false,
}: Props) {
  const wrapClass = zoomOnHover ? "bw-img-zoom" : undefined;
  const style: CSSProperties = {
    ...THUMB_STYLE,
    ...(fullWidth ? { width: "100%" } : {}),
    ...(borderRadius ? { borderRadius } : {}),
    ...(aspectRatio ? { aspectRatio } : {}),
  };

  if (coverSrc) {
    return (
      <div className={wrapClass} style={style}>
        <img
          src={coverSrc}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={wrapClass}
      style={{
        ...style,
        backgroundColor: "#0148ae",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src="/assets/logo_white.png"
        alt=""
        style={{
          width: "86px",
          height: "auto",
          display: "block",
        }}
      />
    </div>
  );
}
