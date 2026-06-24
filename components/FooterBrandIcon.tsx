type FooterBrandIconProps = {
  className?: string;
};

export default function FooterBrandIcon({ className }: FooterBrandIconProps) {
  return (
    <img
      src="/assets/footer-brand-icon.svg"
      alt=""
      width={220}
      height={220}
      className={className}
      draggable={false}
      style={{
        width: "clamp(140px, 16vw, 220px)",
        height: "auto",
        display: "block",
        userSelect: "none",
        flexShrink: 0,
      }}
    />
  );
}
