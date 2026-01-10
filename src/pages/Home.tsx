import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoriesOverlay from "../components/CategoriesOverlay";

export default function Home() {
  const nav = useNavigate();

  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const suggestions = useMemo(() => {
    const base = [
      "Türkiye’nin en güvenilir tarihi yerleri",
      "Kalabalık olmayan kafe",
      "Bali’de güvenli otel",
      "Yakınımdaki hastaneler",
      "Güvenilir oto servis",
      "İstanbul’da güvenilir restoran",
      "Dubai’de güvenli eğlence yerleri",
      "Katar’da güvenilir hizmet veren işletmeler",
    ];
    if (!query.trim()) return base.slice(0, 8);
    return base.filter((s) =>
      s.toLowerCase().includes(query.trim().toLowerCase())
    );
  }, [query]);

  return (
    <div style={{ minHeight: "100vh", background: "#f6f7fb", paddingBottom: 72 }}>
      {/* Top header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "linear-gradient(180deg,#3f5c9a 0%, #2e3f6e 100%)",
          padding: "14px 14px 18px",
          color: "white",
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              background: "rgba(255,255,255,0.15)",
              display: "grid",
              placeItems: "center",
              fontWeight: 900,
            }}
            title="TRUSBE"
          >
            ✓
          </div>

          {/* ✅ TRUSBE başlık */}
          <div style={{ fontWeight: 900, letterSpacing: 0.4 }}>TRUSBE</div>

          <div style={{ flex: 1 }} />

          <button
            onClick={() => setCategoriesOpen(true)}
            style={iconBtn}
            title="Kategoriler"
          >
            ▦
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("trusbe_user");
              nav("/login");
            }}
            style={iconBtn}
            title="Çıkış"
          >
            ⎋
          </button>
        </div>

        {/* Search */}
        <div style={{ marginTop: 14, position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(255,255,255,0.18)",
              border: "1px solid rgba(255,255,255,0.22)",
              borderRadius: 16,
              padding: "10px 12px",
              backdropFilter: "blur(10px)",
            }}
          >
            <span style={{ opacity: 0.9 }}>🎤</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e-trust search (otel, kafe, isim, skor...)"
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                color: "white",
                fontSize: 14,
              }}
            />
            <button
              onClick={() => alert("Search: " + (query || "—"))}
              style={{
                border: "none",
                background: "rgba(255,255,255,0.18)",
                color: "white",
                padding: "8px 12px",
                borderRadius: 14,
                cursor: "pointer",
                fontWeight: 800,
              }}
            >
              🔍
            </button>
          </div>

          {/* Suggestions dropdown */}
          {query.trim().length > 0 && (
            <div
              style={{
                marginTop: 10,
                background: "white",
                borderRadius: 16,
                boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
                overflow: "hidden",
                border: "1px solid rgba(15,23,42,0.08)",
              }}
            >
              {suggestions.slice(0, 7).map((s) => (
                <div
                  key={s}
                  onClick={() => setQuery(s)}
                  style={{
                    padding: "12px 14px",
                    cursor: "pointer",
                    borderBottom: "1px solid rgba(15,23,42,0.06)",
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected category chip */}
        {selectedCategory ? (
          <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <div
              style={{
                padding: "8px 12px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.18)",
                border: "1px solid rgba(255,255,255,0.22)",
                fontWeight: 700,
                fontSize: 12,
              }}
            >
              Filtre: {selectedCategory}
            </div>
            <button
              onClick={() => setSelectedCategory(null)}
              style={{
                padding: "8px 12px",
                borderRadius: 999,
                background: "rgba(0,0,0,0.15)",
                border: "1px solid rgba(255,255,255,0.22)",
                color: "white",
                cursor: "pointer",
                fontWeight: 800,
                fontSize: 12,
              }}
            >
              Temizle
            </button>
          </div>
        ) : null}
      </div>

      {/* Content */}
      <div style={{ padding: 14 }}>
        <SectionCard icon="✅" title="Bee’nin Seçimleri" desc="Bölgenizdeki en güvenilir öneriler burada." />
        <SectionCard icon="🥇" title="Best of Ever" desc="En yüksek güven puanlı yerler." />
        <SectionCard icon="🏆" title="Top 10 Liste" desc="Kategoriye göre en güvenilir 10." />
      </div>

      {/* Bottom nav (demo) */}
      <div
        style={{
          position: "fixed",
          left: 12,
          right: 12,
          bottom: 12,
          height: 56,
          background: "white",
          borderRadius: 18,
          boxShadow: "0 15px 40px rgba(0,0,0,0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          border: "1px solid rgba(15,23,42,0.08)",
        }}
      >
        <NavIcon label="👤" />
        <NavIcon label="📖" />
        <NavIcon label="👑" active />
        <NavIcon label="🏠" />
      </div>

      {/* Overlay */}
      <CategoriesOverlay
        open={categoriesOpen}
        onClose={() => setCategoriesOpen(false)}
        onSelectCategory={(id) => setSelectedCategory(id)}
      />
    </div>
  );
}

function SectionCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        background: "white",
        borderRadius: 18,
        padding: 14,
        marginBottom: 12,
        boxShadow: "0 12px 25px rgba(0,0,0,0.06)",
        border: "1px solid rgba(15,23,42,0.06)",
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
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 900, fontSize: 16 }}>{title}</div>
        <div style={{ opacity: 0.7, marginTop: 4 }}>{desc}</div>
      </div>
    </div>
  );
}

function NavIcon({ label, active }: { label: string; active?: boolean }) {
  return (
    <div
      style={{
        width: 46,
        height: 46,
        borderRadius: 14,
        display: "grid",
        placeItems: "center",
        background: active ? "rgba(79,124,255,0.12)" : "transparent",
        border: active ? "1px solid rgba(79,124,255,0.25)" : "none",
        fontSize: 20,
      }}
    >
      {label}
    </div>
  );
}

const iconBtn: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.22)",
  background: "rgba(255,255,255,0.14)",
  color: "white",
  cursor: "pointer",
  fontWeight: 900,
};