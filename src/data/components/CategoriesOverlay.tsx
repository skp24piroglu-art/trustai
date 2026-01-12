import { CATEGORIES } from "../data/categories";

type Props = {
  open: boolean;
  onClose: () => void;
  onSelectCategory?: (categoryId: string) => void;
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
        background: "rgba(0,0,0,0.55)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: 80,
        paddingLeft: 16,
        paddingRight: 16,

        // mobilde scroll hissi daha düzgün olsun
        overscrollBehavior: "contain",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(920px, 100%)",
          background: "rgba(255,255,255,0.10)",
          border: "1px solid rgba(255,255,255,0.18)",
          borderRadius: 22,
          padding: 18,
          color: "white",
          backdropFilter: "blur(14px)",

          // ✅ MOBİL SCROLL FIX:
          maxHeight: "calc(100vh - 110px)",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: 1 }}>
            KATEGORİLER
          </div>
          <div style={{ flex: 1 }} />
          <button
            onClick={onClose}
            style={{
              width: 42,
              height: 42,
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.20)",
              background: "rgba(255,255,255,0.10)",
              color: "white",
              cursor: "pointer",
              fontSize: 20,
              lineHeight: "42px",
            }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* List (senin istediğin detaylı görünüm) */}
        <div
          style={{
            marginTop: 14,
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 12,
          }}
        >
          {CATEGORIES.map((c) => {
            const locked = !!c.locked;
            return (
              <button
                key={c.id}
                onClick={() => {
                  if (locked) return;
                  onSelectCategory?.(c.id);
                  onClose();
                }}
                style={{
                  textAlign: "left",
                  padding: "14px 16px",
                  borderRadius: 18,
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(255,255,255,0.10)",
                  color: "white",
                  cursor: locked ? "not-allowed" : "pointer",
                  opacity: locked ? 0.55 : 1,
                }}
              >
                <div style={{ fontWeight: 900, fontSize: 15 }}>{c.title}</div>

                {c.subtitle ? (
                  <div style={{ marginTop: 6, fontSize: 12, opacity: 0.8 }}>
                    {c.subtitle}
                  </div>
                ) : null}

                {locked ? (
                  <div style={{ marginTop: 6, fontSize: 12, opacity: 0.75 }}>
                    Phase 2’de açılır
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 12, fontSize: 12, opacity: 0.75 }}>
          Phase 1: kişiler görünmez (altyapı hazır). Phase 2’de açılır.
        </div>
      </div>
    </div>
  );
}