import type { CSSProperties } from "react";

type Props = {
  coverSrc?: string;
  alt: string;
  zoomOnHover?: boolean;
  borderRadius?: string;
  aspectRatio?: string;
  fullWidth?: boolean;
};

const DEFAULT_THUMB_SRC = "/assets/news_default_thumbnail.jpg";

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

  const src = coverSrc ?? DEFAULT_THUMB_SRC;

  return (
    <div className={wrapClass} style={style}>
      <img
        src={src}
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
