type FooterBrandIconProps = {
  className?: string;
};

export default function FooterBrandIcon({ className }: FooterBrandIconProps) {
  return (
    <img
      src="/assets/footer-brand-icon.svg"
      alt=""
      width={260}
      height={260}
      className={className}
      draggable={false}
      style={{
        width: "clamp(180px, 20vw, 260px)",
        height: "auto",
        display: "block",
        userSelect: "none",
        flexShrink: 0,
      }}
    />
  );
}
