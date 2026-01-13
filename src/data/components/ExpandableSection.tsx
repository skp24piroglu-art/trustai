import { ReactNode } from "react";

type Props = {
  title: string;
  desc?: string;
  icon?: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
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
    <div style={{ marginBottom: 12 }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          textAlign: "left",
          display: "flex",
          gap: 12,
          alignItems: "center",
          background: "white",
          borderRadius: 18,
          padding: 14,
          boxShadow: "0 12px 25px rgba(0,0,0,0.06)",
          border: "1px solid rgba(15,23,42,0.06)",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: 16,
            background: "linear-gradient(180deg,#f3d27a,#caa546)",
            display: "grid",
            placeItems: "center",
            fontSize: 22,
            flexShrink: 0,
          }}
        >
          {icon ?? "✨"}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 900, fontSize: 16 }}>{title}</div>
          {desc ? (
            <div style={{ opacity: 0.7, marginTop: 4, fontSize: 13 }}>
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
            background: "rgba(79,124,255,0.10)",
            border: "1px solid rgba(79,124,255,0.18)",
            fontWeight: 900,
            fontSize: 18,
            flexShrink: 0,
          }}
          aria-hidden
        >
          {open ? "–" : "+"}
        </div>
      </button>

      {/* BODY */}
      <div
        style={{
          maxHeight: open ? 800 : 0,
          overflow: "hidden",
          transition: "max-height 260ms ease",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: 18,
            marginTop: 10,
            padding: 14,
            boxShadow: "0 12px 25px rgba(0,0,0,0.06)",
            border: "1px solid rgba(15,23,42,0.06)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}