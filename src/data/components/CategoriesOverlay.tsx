import { CATEGORIES } from "../data/categories";

type Props = {
  open: boolean;
  onClose: () => void;
  onSelectCategory?: (categoryId: string) => void;
};

export default function CategoriesOverlay({ open, onClose, onSelectCategory }: Props) {
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
        paddingTop: 70,
        paddingLeft: 12,
        paddingRight: 12,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(860px, 100%)",
          background: "rgba(255,255,255,0.10)",
          border: "1px solid rgba(255,255,255,0.18)",
          borderRadius: 22,
          padding: 16,
          color: "white",
          backdropFilter: "blur(14px)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: 1 }}>
            KATEGORİLER
          </div>
          <div style={{ flex: 1 }} />
          <button
            onClick={onClose}
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.20)",
              background: "rgba(255,255,255,0.10)",
              color: "white",
              cursor: "pointer",
              fontSize: 18,
              lineHeight: "38px",
            }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Scroll area (mobil fix) */}
        <div
          style={{
            marginTop: 12,
            maxHeight: "calc(100vh - 160px)",
            overflowY: "auto",
            paddingRight: 4,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 12,
            }}
          >
            {CATEGORIES.map((c) => {
              const disabled = c.disabled === true;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    if (disabled) return;
                    onSelectCategory?.(c.id);
                    onClose();
                  }}
                  style={{
                    textAlign: "left",
                    padding: "12px 14px",
                    borderRadius: 18,
                    border: "1px solid rgba(255,255,255,0.18)",
                    background: disabled
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(255,255,255,0.10)",
                    color: "white",
                    cursor: disabled ? "not-allowed" : "pointer",
                    opacity: disabled ? 0.65 : 1,
                  }}
                >
                  <div style={{ fontWeight: 900 }}>{c.title}</div>
                  {c.subtitle ? (
                    <div style={{ marginTop: 4, fontSize: 12, opacity: 0.80 }}>
                      {c.subtitle}
                    </div>
                  ) : null}
                  {disabled && c.note ? (
                    <div style={{ marginTop: 6, fontSize: 12, opacity: 0.75 }}>
                      {c.note}
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
    </div>
  );
}