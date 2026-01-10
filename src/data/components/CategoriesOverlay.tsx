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

        // ✅ telefonda aşağı kaydırma garanti
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(820px, 100%)",
          background: "rgba(255,255,255,0.10)",
          border: "1px solid rgba(255,255,255,0.18)",
          borderRadius: 22,
          padding: 18,
          color: "white",
          backdropFilter: "blur(14px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",

          // ✅ panel kendi içinde de scroll olabilir
          maxHeight: "calc(100vh - 120px)",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: 0.6 }}>
            TRUSBE — KATEGORİLER
          </div>
          <div style={{ flex: 1 }} />
          <button
            onClick={onClose}
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.20)",
              background: "rgba(255,255,255,0.10)",
              color: "white",
              cursor: "pointer",
              fontSize: 18,
              lineHeight: "40px",
            }}
            aria-label="Close"
            title="Kapat"
          >
            ✕
          </button>
        </div>

        <div
          style={{
            marginTop: 14,
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 12,
          }}
        >
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                onSelectCategory?.(c.id);
                onClose();
              }}
              style={{
                textAlign: "left",
                padding: "12px 14px",
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.10)",
                color: "white",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ fontSize: 18 }}>{c.emoji ?? "•"}</div>
                <div style={{ fontWeight: 800 }}>{c.title}</div>
              </div>

              {c.subtitle ? (
                <div style={{ marginTop: 6, fontSize: 12, opacity: 0.78 }}>
                  {c.subtitle}
                </div>
              ) : null}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 14, fontSize: 12, opacity: 0.75 }}>
          Phase 1: kişiler görünmez (altyapı hazır). Phase 2’de açılır.
        </div>
      </div>
    </div>
  );
}