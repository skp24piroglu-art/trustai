import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import CategoriesOverlay from "../components/CategoriesOverlay";
import { CATEGORIES } from "../data/categories";

const COUNTRIES = ["Türkiye", "Bali", "Dubai", "Katar"] as const;

export default function Home() {
  const nav = useNavigate();

  const [country, setCountry] = useState<(typeof COUNTRIES)[number]>("Türkiye");
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const selectedCategoryTitle = useMemo(() => {
    if (!selectedCategory) return null;
    return CATEGORIES.find((c) => c.id === selectedCategory)?.title ?? selectedCategory;
  }, [selectedCategory]);

  const suggestions = useMemo(() => {
    const base = [
      "Türkiye’de güvenilir tarihi yerler",
      "Kalabalık olmayan kafe",
      "Bali’de güvenli otel",
      "Yakınımdaki hastaneler",
      "Güvenilir oto servis",
      "Dubai’de güvenilir restoran",
      "Katar’da güvenilir hizmet veren işletmeler",
      "Güvenilir turistik alanlar",
    ];
    const s = query.trim().toLowerCase();
    if (!s) return [];
    return base.filter((x) => x.toLowerCase().includes(s)).slice(0, 7);
  }, [query]);

  function logout() {
    localStorage.removeItem("trusbe_user");
    nav("/login");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F6F7FB", paddingBottom: 78 }}>
      {/* ✅ Sticky Premium Header */}
      <div style={headerWrap}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={logoBox} title="TRUSBE">T</div>

          <div style={{ lineHeight: 1.05 }}>
            <div style={{ fontWeight: 950, letterSpacing: 0.3, fontSize: 16 }}>TRUSBE</div>
            <div style={{ fontSize: 12, opacity: 0.85 }}>Trust Beyond Expectation</div>
          </div>

          <div style={{ flex: 1 }} />

          {/* Country selector */}
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value as any)}
            style={countrySelect}
            aria-label="Country"
          >
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Menu */}
          <button onClick={() => setCategoriesOpen(true)} style={iconBtn} title="Menü">
            ☰
          </button>

          {/* Logout */}
          <button onClick={logout} style={iconBtn} title="Çıkış">
            ⎋
          </button>
        </div>

        {/* Search */}
        <div style={{ marginTop: 12, position: "relative" }}>
          <div style={searchWrap}>
            <span style={{ opacity: 0.9 }}>🔎</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e-trust search (otel, kafe, isim, skor...)"
              style={searchInput}
            />
            <button
              onClick={() => alert(`Search: ${country} • ${query || "—"}`)}
              style={searchBtn}
            >
              Ara
            </button>
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 ? (
            <div style={suggestionBox}>
              {suggestions.map((s) => (
                <div
                  key={s}
                  onClick={() => setQuery(s)}
                  style={suggestionItem}
                >
                  {s}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {/* Selected category chip */}
        {selectedCategory ? (
          <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <div style={chip}>
              Filtre: {selectedCategoryTitle}
            </div>
            <button onClick={() => setSelectedCategory(null)} style={chipClear}>
              Temizle
            </button>
          </div>
        ) : null}
      </div>

      {/* Content blocks */}
      <div style={{ padding: 14 }}>
        <SectionCard
          icon="✅"
          title="Bee’nin Seçimleri"
          desc={`${country} için en güvenilir öneriler.`}
        />
        <SectionCard icon="🥇" title="Best of Ever" desc="En yüksek güven puanlı yerler." />
        <SectionCard icon="🏆" title="Top 10 Liste" desc="Kategoriye göre en güvenilir 10." />
      </div>

      {/* Bottom Nav (placeholder) */}
      <div style={bottomNav}>
        <NavIcon label="👤" />
        <NavIcon label="🗺️" />
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
    <div style={card}>
      <div style={cardIcon}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 950, fontSize: 16 }}>{title}</div>
        <div style={{ opacity: 0.72, marginTop: 4, fontSize: 13 }}>{desc}</div>
      </div>
      <div style={{ opacity: 0.35, fontWeight: 900 }}>›</div>
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
        border: active ? "1px solid rgba(79,124,255,0.25)" : "1px solid transparent",
        fontSize: 20,
      }}
    >
      {label}
    </div>
  );
}

const headerWrap: CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 10,
  padding: "14px 14px 16px",
  color: "white",
  background: "linear-gradient(180deg,#3F5C9A 0%, #2E3F6E 100%)",
  borderBottomLeftRadius: 22,
  borderBottomRightRadius: 22,
  boxShadow: "0 16px 40px rgba(0,0,0,0.18)",
};

const logoBox: CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: 14,
  display: "grid",
  placeItems: "center",
  background: "rgba(255,255,255,0.14)",
  border: "1px solid rgba(255,255,255,0.18)",
  fontWeight: 950,
};

const countrySelect: CSSProperties = {
  height: 40,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.22)",
  background: "rgba(255,255,255,0.14)",
  color: "white",
  padding: "0 10px",
  fontWeight: 800,
  cursor: "pointer",
  outline: "none",
};

const iconBtn: CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.22)",
  background: "rgba(255,255,255,0.14)",
  color: "white",
  cursor: "pointer",
  fontWeight: 950,
};

const searchWrap: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  background: "rgba(255,255,255,0.18)",
  border: "1px solid rgba(255,255,255,0.22)",
  borderRadius: 16,
  padding: "10px 12px",
  backdropFilter: "blur(10px)",
};

const searchInput: CSSProperties = {
  flex: 1,
  border: "none",
  outline: "none",
  background: "transparent",
  color: "white",
  fontSize: 14,
};

const searchBtn: CSSProperties = {
  border: "none",
  background: "rgba(255,255,255,0.18)",
  color: "white",
  padding: "8px 12px",
  borderRadius: 14,
  cursor: "pointer",
  fontWeight: 900,
};

const suggestionBox: CSSProperties = {
  marginTop: 10,
  background: "white",
  borderRadius: 16,
  boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
  overflow: "hidden",
  border: "1px solid rgba(15,23,42,0.08)",
};

const suggestionItem: CSSProperties = {
  padding: "12px 14px",
  cursor: "pointer",
  borderBottom: "1px solid rgba(15,23,42,0.06)",
};

const chip: CSSProperties = {
  padding: "8px 12px",
  borderRadius: 999,
  background: "rgba(255,255,255,0.18)",
  border: "1px solid rgba(255,255,255,0.22)",
  fontWeight: 800,
  fontSize: 12,
};

const chipClear: CSSProperties = {
  padding: "8px 12px",
  borderRadius: 999,
  background: "rgba(0,0,0,0.16)",
  border: "1px solid rgba(255,255,255,0.22)",
  color: "white",
  cursor: "pointer",
  fontWeight: 900,
  fontSize: 12,
};

const card: CSSProperties = {
  display: "flex",
  gap: 12,
  alignItems: "center",
  background: "white",
  borderRadius: 18,
  padding: 14,
  marginBottom: 12,
  boxShadow: "0 12px 25px rgba(0,0,0,0.06)",
  border: "1px solid rgba(15,23,42,0.06)",
};

const cardIcon: CSSProperties = {
  width: 54,
  height: 54,
  borderRadius: 16,
  background: "linear-gradient(180deg,#F3D27A 0%, #CAA546 100%)",
  display: "grid",
  placeItems: "center",
  fontSize: 22,
};

const bottomNav: CSSProperties = {
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
};