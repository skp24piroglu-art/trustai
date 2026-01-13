import { useRef } from "react";

type Props = {
  title: string;
  subtitle?: string;
  items: Array<{
    id: string;
    name: string;
    score: number;
    meta?: string; // "Kalabalık değil • Gece güvenli" gibi
    icon?: string; // "⭐" gibi
  }>;
  onItemClick?: (id: string) => void;
};

function getScoreColor(score: number) {
  if (score >= 90) return "#34d399"; // green
  if (score >= 80) return "#fbbf24"; // amber
  return "#fb7185"; // rose
}

export default function HorizontalRail({
  title,
  subtitle,
  items,
  onItemClick,
}: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dx: number) => {
    scrollerRef.current?.scrollBy({ left: dx, behavior: "smooth" });
  };

  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
        <div style={{ fontWeight: 900, fontSize: 16 }}>{title}</div>
        {subtitle ? (
          <div style={{ opacity: 0.65, fontSize: 12, marginBottom: 2 }}>
            {subtitle}
          </div>
        ) : null}
        <div style={{ flex: 1 }} />
        <button
          onClick={() => scrollBy(-320)}
          style={arrowBtn}
          aria-label="Scroll left"
          type="button"
        >
          ‹
        </button>
        <button
          onClick={() => scrollBy(320)}
          style={arrowBtn}
          aria-label="Scroll right"
          type="button"
        >
          ›
        </button>
      </div>

      <div
        ref={scrollerRef}
        style={{
          marginTop: 10,
          display: "flex",
          gap: 12,
          overflowX: "auto",
          paddingBottom: 10,
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => onItemClick?.(it.id)}
            type="button"
            style={{
              minWidth: 250,
              maxWidth: 250,
              scrollSnapAlign: "start",
              textAlign: "left",
              borderRadius: 18,
              padding: 14,
              border: "1px solid rgba(15,23,42,0.10)",
              background: "white",
              boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 14,
                  background: "rgba(79,124,255,0.10)",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 18,
                }}
              >
                {it.icon || "⭐"}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 900,
                    fontSize: 14,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {it.name}
                </div>
                {it.meta ? (
                  <div
                    style={{
                      marginTop: 3,
                      fontSize: 12,
                      opacity: 0.65,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {it.meta}
                  </div>
                ) : null}
              </div>

              <div
                style={{
                  minWidth: 46,
                  height: 30,
                  borderRadius: 12,
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 900,
                  color: "white",
                  background: getScoreColor(it.score),
                }}
                title="Güven skoru"
              >
                {it.score}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

const arrowBtn: React.CSSProperties = {
  width: 34,
  height: 34,
  borderRadius: 12,
  border: "1px solid rgba(15,23,42,0.10)",
  background: "white",
  cursor: "pointer",
  fontWeight: 900,
  fontSize: 18,
  lineHeight: "32px",
};
