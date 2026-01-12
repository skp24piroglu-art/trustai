import { CATEGORIES } from "../data/categories";

type Props = {
  open: boolean;
  onClose: () => void;
  onSelectCategory?: (id: string) => void;
};

export default function CategoriesOverlay({
  open,
  onClose,
  onSelectCategory,
}: Props) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: 70,
        paddingBottom: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(900px, 100%)",
          maxHeight: "85vh",          // 🔥 MOBİL SCROLL
          overflowY: "auto",          // 🔥 MOBİL SCROLL
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(16px)",
          borderRadius: 24,
          padding: 20,
          color: "white",
          border: "1px solid rgba(255,255,255,0.18)",
        }}
      >
        {/* HEADER */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 18, letterSpacing: 1 }}>
            KATEGORİLER
          </h2>
          <div style={{ flex: 1 }} />
          <button
            onClick={onClose}
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              background: "rgba(255,255,255,0.15)",
              border: "none",
              color: "white",
              fontSize: 18,
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        {/* LIST */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0,1fr))",
            gap: 12,
          }}
        >
          {CATEGORIES.map((c) => {
            const locked = c.phase === 2;

            return (
              <button
                key={c.id}
                disabled={locked}
                onClick={() => {
                  if (!locked) {
                    onSelectCategory?.(c.id);
                    onClose();
                  }
                }}
                style={{
                  textAlign: "left",
                  padding: "14px 16px",
                  borderRadius: 18,
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: locked
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(255,255,255,0.12)",
                  color: "white",
                  cursor: locked ? "not-allowed" : "pointer",
                  opacity: locked ? 0.5 : 1,
                }}
              >
                <div style={{ fontWeight: 700 }}>{c.title}</div>
                {c.subtitle && (
                  <div style={{ fontSize: 12, opacity: 0.75, marginTop: 4 }}>
                    {c.subtitle}
                  </div>
                )}
                {locked && (
                  <div style={{ fontSize: 11, marginTop: 6 }}>
                    Phase 2’de açılır
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* FOOTER */}
        <div style={{ marginTop: 14, fontSize: 12, opacity: 0.7 }}>
          Phase 1: kişiler görünmez (altyapı hazır). Phase 2’de açılır.
        </div>
      </div>
    </div>
  );
}