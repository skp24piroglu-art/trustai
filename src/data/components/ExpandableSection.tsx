import { ReactNode } from "react";

type Props = {
  title: string;
  desc?: string;
  icon: string; // emoji
  open: boolean;
  onToggle: () => void;
  children?: ReactNode;
};

export default function ExpandableSection({
  title,
  desc,
  icon,
  open,
  onToggle,
  children,
}: Props) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.75)",
        borderRadius: 18,
        border: "1px solid rgba(15,23,42,0.08)",
        boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
        overflow: "hidden",
        marginBottom: 12,
      }}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          textAlign: "left",
          cursor: "pointer",
          background: "transparent",
          border: "none",
          padding: 14,
          display: "flex",
          gap: 12,
          alignItems: "center",
        }}
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
          {icon}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 900, fontSize: 16 }}>{title}</div>
          {desc ? (
            <div style={{ opacity: 0.75, marginTop: 4, fontSize: 13 }}>
              {desc}
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
            border: "1px solid rgba(15,23,42,0.10)",
            background: "rgba(255,255,255,0.55)",
            fontWeight: 900,
          }}
          aria-hidden
        >
          {open ? "▴" : "▾"}
        </div>
      </button>

      {/* Body */}
      {open ? (
        <div style={{ padding: "0 14px 14px" }}>
          <div
            style={{
              background: "rgba(255,255,255,0.55)",
              border: "1px solid rgba(15,23,42,0.08)",
              borderRadius: 16,
              padding: 12,
            }}
          >
            {children}
          </div>
        </div>
      ) : null}
    </div>
  );
}