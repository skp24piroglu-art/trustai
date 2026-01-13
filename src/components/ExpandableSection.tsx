import { useMemo, useState } from "react";

type Props = {
  title: string;
  subtitle?: string;
  icon?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
};

export default function ExpandableSection({
  title,
  subtitle,
  icon,
  defaultOpen = false,
  children,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  const contentStyle = useMemo<React.CSSProperties>(() => {
    return {
      maxHeight: open ? 900 : 0,
      overflow: "hidden",
      transition: "max-height 260ms ease",
    };
  }, [open]);

  return (
    <div
      style={{
        background: "white",
        borderRadius: 18,
        boxShadow: "0 12px 25px rgba(0,0,0,0.06)",
        border: "1px solid rgba(15,23,42,0.06)",
        marginBottom: 12,
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen((s) => !s)}
        style={{
          width: "100%",
          textAlign: "left",
          border: "none",
          background: "transparent",
          padding: 14,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
        aria-expanded={open}
      >
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: 16,
            background: "linear-gradient(180deg,#f3d27a 0%, #caa546 100%)",
            display: "grid",
            placeItems: "center",
            fontSize: 22,
            flex: "0 0 auto",
          }}
        >
          {icon ?? "★"}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 900, fontSize: 16 }}>{title}</div>
          {subtitle ? (
            <div style={{ opacity: 0.7, marginTop: 4, fontSize: 13 }}>
              {subtitle}
            </div>
          ) : null}
        </div>

        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 14,
            display: "grid",
            placeItems: "center",
            background: "rgba(79,124,255,0.10)",
            border: "1px solid rgba(79,124,255,0.20)",
            fontSize: 16,
            fontWeight: 900,
          }}
          title={open ? "Kapat" : "Aç"}
        >
          {open ? "–" : "+"}
        </div>
      </button>

      <div style={contentStyle}>
        <div
          style={{
            padding: "0 14px 14px",
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(-4px)",
            transition: "opacity 220ms ease, transform 220ms ease",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
