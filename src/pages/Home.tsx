import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoriesOverlay from "../components/CategoriesOverlay";
import ExpandableSection from "../components/ExpandableSection";

type Country = "Türkiye" | "Bali" | "Dubai" | "Katar";

export default function Home() {
  const nav = useNavigate();

  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [country, setCountry] = useState<Country>("Türkiye");

  // Accordion open state
  const [openKey, setOpenKey] = useState<null | "bee" | "trusted" | "top10">(
    "bee"
  );

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
    <div style={{ minHeight: "100vh", background: "#0b1220", paddingBottom: 90 }}>
      {/* Top header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,

          // ✅ DARK GLASS HEADER
          background:
            "linear-gradient(180deg, rgba(8,10,14,0.92) 0%, rgba(8,10,14,0.82) 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(14px)",

          padding: "14px 14px 18px",
          color: "white",
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          boxShadow: "0 18px 50px rgba(0,0,0,0.45)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 14,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.10)",
              display: "grid",
              placeItems: "center",
              fontWeight: 900,
            }}
            title="TRUSBE"
          >
            ✓
          </div>

          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontWeight: 900, letterSpacing: 0.4, fontSize: 16 }}>
              TRUSBE
            </div>
            <div style={{ opacity: 0.85, fontSize: 12 }}>
              Trust Beyond Expectation
            </div>
          </div>

          <div style={{ flex: 1 }} />

          {/* ✅ COUNTRY SELECT DARK */}
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value as Country)}
            style={{
              height: 40,
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(255,255,255,0.06)",
              color: "white",
              padding: "0 10px",
              fontWeight: 800,
              outline: "none",
              cursor: "pointer",
            }}
            title="Ülke"
          >
            <option style={{ color: "#111" }} value="Türkiye">
              Türkiye
            </option>
            <option style={{ color: "#111" }} value="Bali">
              Bali
            </option>
            <option style={{ color: "#111" }} value="Dubai">
              Dubai
            </option>
            <option style={{ color: "#111" }} value="Katar">
              Katar
            </option>
          </select>

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

              // ✅ SEARCH DARK GLASS
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 16,
              padding: "10px 12px",
              backdropFilter: "blur(10px)",
            }}
          >
            <span style={{ opacity: 0.9 }}>🔍</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`e-trust search (otel, kafe, isim, skor...) • ${country}`}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                color: "white",
                fontSize: 14,
              }}
            />

            {query.trim().length > 0 ? (
              <button
                onClick={() => setQuery("")}
                style={{
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.06)",
                  color: "white",
                  padding: "8px 10px",
                  borderRadius: 14,
                  cursor: "pointer",
                  fontWeight: 900,
                }}
                title="Temizle"
              >
                ✕
              </button>
            ) : null}

            {/* ✅ GOLD SEARCH BUTTON */}
            <button
              onClick={() => alert("Search: " + (query || "—"))}
              style={{
                border: "1px solid rgba(255,215,0,0.25)",
                background: "rgba(255,215,0,0.18)",
                color: "white",
                padding: "8px 12px",
                borderRadius: 14,
                cursor: "pointer",
                fontWeight: 800,
              }}
            >
              Ara
            </button>
          </div>

          {/* Suggestions dropdown */}
          {query.trim().length > 0 && (
            <div
              style={{
                marginTop: 10,
                background: "rgba(12,16,24,0.96)",
                color: "white",
                borderRadius: 16,
                boxShadow: "0 20px 60px rgba(0,0,0,0.55)",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.10)",
                backdropFilter: "blur(12px)",
              }}
            >
              {suggestions.slice(0, 7).map((s) => (
                <div
                  key={s}
                  onClick={() => setQuery(s)}
                  style={{
                    padding: "12px 14px",
                    cursor: "pointer",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    opacity: 0.95,
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
          <div
            style={{
              marginTop: 10,
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div
              style={{
                padding: "8px 12px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                fontWeight: 800,
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
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                color: "white",
                cursor: "pointer",
                fontWeight: 900,
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
        <ExpandableSection
          icon="⭐"
          title="Bee’nin Seçimleri"
          desc={`${country} için en güvenilir öneriler.`}
          open={openKey === "bee"}
          onToggle={() => setOpenKey(openKey === "bee" ? null : "bee")}
        >
          <ListItem title="Galata Kulesi" meta="Tarihi • Gece güvenli" score={92} />
          <ListItem title="Karaköy Kahve" meta="Kafe • Kalabalık orta" score={85} />
          <ListItem title="Cihangir Restoran" meta="Restoran • Premium" score={88} />
          <Note text='Harita entegrasyonu sırada: “Haritada Gör” butonu + pinler.' />
        </ExpandableSection>

        <ExpandableSection
          icon="🛡️"
          title="En Güvenilir Yerler"
          desc="En yüksek güven skoruna sahip mekanlar."
          open={openKey === "trusted"}
          onToggle={() => setOpenKey(openKey === "trusted" ? null : "trusted")}
        >
          <ListItem title="Top Otel (Merkez)" meta="Otel • Aile dostu" score={90} />
          <ListItem title="Güvenli Hastane" meta="Sağlık • 7/24" score={96} />
          <ListItem title="En İyi AVM" meta="Alışveriş • Güvenlik güçlü" score={91} />
          <Note text='Harita entegrasyonu sırada: “Haritada Gör” butonu + pinler.' />
        </ExpandableSection>

        <ExpandableSection
          icon="🏆"
          title="Top 10 Liste"
          desc="Kategoriye göre en güvenilir 10."
          open={openKey === "top10"}
          onToggle={() => setOpenKey(openKey === "top10" ? null : "top10")}
        >
          <div
            style={{
              opacity: 0.85,
              marginBottom: 10,
              fontSize: 13,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            Kategori seçersen liste filtrelenir.
          </div>
          <RankItem n={1} title="Örnek Mekan" score={93} />
          <RankItem n={2} title="Örnek Mekan" score={91} />
          <RankItem n={3} title="Örnek Mekan" score={89} />
          <Note text='Harita entegrasyonu sırada: “Haritada Gör” butonu + pinler.' />
        </ExpandableSection>
      </div>

      {/* Bottom nav */}
      <div
        style={{
          position: "fixed",
          left: 12,
          right: 12,
          bottom: 12,
          height: 56,
          background: "rgba(10,15,25,0.85)",
          borderRadius: 18,
          boxShadow: "0 15px 40px rgba(0,0,0,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          border: "1px solid rgba(255,255,255,0.10)",
          zIndex: 20,
          backdropFilter: "blur(12px)",
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

function ListItem({
  title,
  meta,
  score,
}: {
  title: string;
  meta: string;
  score: number;
}) {
  return (
    <div
      style={{
        padding: "10px 12px",
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.82)",
        marginBottom: 10,
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 900, color: "#0b1220" }}>{title}</div>
        <div
          style={{
            opacity: 0.75,
            marginTop: 2,
            fontSize: 12,
            color: "#0b1220",
          }}
        >
          {meta}
        </div>
      </div>

      <div
        style={{
          minWidth: 46,
          height: 30,
          borderRadius: 12,
          display: "grid",
          placeItems: "center",
          fontWeight: 900,
          color: "#0b1220",
          background: "rgba(255, 215, 0, 0.35)",
          border: "1px solid rgba(15,23,42,0.10)",
        }}
        title="Trust Score"
      >
        {score}
      </div>
    </div>
  );
}

function RankItem({
  n,
  title,
  score,
}: {
  n: number;
  title: string;
  score: number;
}) {
  return (
    <div
      style={{
        padding: "10px 12px",
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.82)",
        marginBottom: 10,
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 900, color: "#0b1220" }}>
          {n}) {title}
        </div>
        <div
          style={{
            opacity: 0.65,
            marginTop: 2,
            fontSize: 12,
            color: "#0b1220",
          }}
        >
          —
        </div>
      </div>

      <div
        style={{
          minWidth: 46,
          height: 30,
          borderRadius: 12,
          display: "grid",
          placeItems: "center",
          fontWeight: 900,
          color: "#0b1220",
          background: "rgba(255, 215, 0, 0.35)",
          border: "1px solid rgba(15,23,42,0.10)",
        }}
        title="Trust Score"
      >
        {score}
      </div>
    </div>
  );
}

function Note({ text }: { text: string }) {
  return (
    <div
      style={{
        marginTop: 8,
        fontSize: 12,
        opacity: 0.75,
        color: "rgba(255,255,255,0.75)",
      }}
    >
      {text}
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
        background: active ? "rgba(255, 215, 0, 0.18)" : "transparent",
        border: active
          ? "1px solid rgba(255, 215, 0, 0.28)"
          : "1px solid rgba(255,255,255,0.06)",
        fontSize: 20,
      }}
    >
      {label}
    </div>
  );
}

// ✅ ICON BUTTON DARK
const iconBtn: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.06)",
  color: "white",
  cursor: "pointer",
  fontWeight: 900,
};