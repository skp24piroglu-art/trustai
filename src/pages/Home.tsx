import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoriesOverlay from "../components/CategoriesOverlay";

/**
 * TRUSBE Home (KİLİT TASARIM)
 * - Header: TRUSBE + Trust Beyond Expectation
 * - Search: e-trust search + Ara butonu
 * - Sağ: Ülke seçici + Kategoriler + Çıkış
 * - 3 kart: Bee / Best / Top10 -> tıklayınca aç/kapa
 * - Alt bar: 4 ikon (kaybolmayacak)
 */

type ExpandKey = "bee" | "best" | "top";

export default function Home() {
  const nav = useNavigate();

  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState<"Türkiye" | "Bali" | "Dubai" | "Katar">(
    "Türkiye"
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 3 kart aç/kapa
  const [openKey, setOpenKey] = useState<ExpandKey | null>(null);
  const toggle = (k: ExpandKey) => setOpenKey((p) => (p === k ? null : k));

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

  // Search placeholder + filtre etiketleri
  const chipText = useMemo(() => {
    const parts: string[] = [];
    if (country) parts.push(country);
    if (selectedCategory) parts.push(selectedCategory);
    return parts.join(" • ");
  }, [country, selectedCategory]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f6f7fb",
        paddingBottom: 88, // alt bar için yer
      }}
    >
      {/* TOP (Sticky) */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "linear-gradient(180deg,#3f5c9a 0%, #2e3f6e 100%)",
          padding: "14px 14px 16px",
          color: "white",
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
        }}
      >
        {/* Logo + sağ ikonlar */}
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

          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div style={{ fontWeight: 900, letterSpacing: 0.4 }}>TRUSBE</div>
            <div style={{ fontSize: 11, opacity: 0.85 }}>
              Trust Beyond Expectation
            </div>
          </div>

          <div style={{ flex: 1 }} />

          {/* Ülke seçici */}
          <select
            value={country}
            onChange={(e) =>
              setCountry(e.target.value as "Türkiye" | "Bali" | "Dubai" | "Katar")
            }
            style={{
              height: 40,
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.22)",
              background: "rgba(255,255,255,0.14)",
              color: "white",
              padding: "0 10px",
              fontWeight: 800,
              outline: "none",
              cursor: "pointer",
            }}
            title="Ülke"
          >
            <option value="Türkiye" style={{ color: "#0f172a" }}>
              Türkiye
            </option>
            <option value="Bali" style={{ color: "#0f172a" }}>
              Bali
            </option>
            <option value="Dubai" style={{ color: "#0f172a" }}>
              Dubai
            </option>
            <option value="Katar" style={{ color: "#0f172a" }}>
              Katar
            </option>
          </select>

          {/* Kategoriler */}
          <button
            onClick={() => setCategoriesOpen(true)}
            style={iconBtn}
            title="Kategoriler"
          >
            ▦
          </button>

          {/* Çıkış */}
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
        <div style={{ marginTop: 12, position: "relative" }}>
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
            <span style={{ opacity: 0.9 }}>🔍</span>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`e-trust search (otel, kafe, isim, skor...)${
                chipText ? " • " + chipText : ""
              }`}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                color: "white",
                fontSize: 14,
              }}
            />

            {/* TEMİZLE (KAYBOLMAYACAK) */}
            {(query.trim() || selectedCategory) && (
              <button
                onClick={() => {
                  setQuery("");
                  setSelectedCategory(null);
                }}
                style={{
                  border: "1px solid rgba(255,255,255,0.22)",
                  background: "rgba(0,0,0,0.18)",
                  color: "white",
                  padding: "8px 10px",
                  borderRadius: 14,
                  cursor: "pointer",
                  fontWeight: 900,
                }}
                title="Temizle"
              >
                Temizle
              </button>
            )}

            {/* ARA (KAYBOLMAYACAK) */}
            <button
              onClick={() => alert("Search: " + (query || "—"))}
              style={{
                border: "none",
                background: "rgba(255,255,255,0.18)",
                color: "white",
                padding: "8px 12px",
                borderRadius: 14,
                cursor: "pointer",
                fontWeight: 900,
              }}
              title="Ara"
            >
              Ara
            </button>
          </div>

          {/* Suggestions */}
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

        {/* Seçili kategori chip */}
        {selectedCategory ? (
          <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
            <div
              style={{
                padding: "8px 12px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.18)",
                border: "1px solid rgba(255,255,255,0.22)",
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
                background: "rgba(0,0,0,0.15)",
                border: "1px solid rgba(255,255,255,0.22)",
                color: "white",
                cursor: "pointer",
                fontWeight: 900,
                fontSize: 12,
              }}
            >
              Kaldır
            </button>
          </div>
        ) : null}
      </div>

      {/* CONTENT */}
      <div style={{ padding: 14 }}>
        <ExpandableCard
          icon="✅"
          title="Bee’nin Seçimleri"
          desc={`${country} için en güvenilir öneriler.`}
          open={openKey === "bee"}
          onToggle={() => toggle("bee")}
        >
          <DemoLine title="Galata Kulesi" score={94} meta="Tarihi • Gece güvenli" />
          <DemoLine title="Karaköy Kahve" score={91} meta="Kafe • Kalabalık orta" />
          <DemoLine title="Cihangir Restoran" score={89} meta="Restoran • Premium" />
          <SmallHint />
        </ExpandableCard>

        <ExpandableCard
          icon="🥇"
          title="En Güvenilir Yerler"
          desc="En yüksek güven skoruna sahip mekanlar."
          open={openKey === "best"}
          onToggle={() => toggle("best")}
        >
          <DemoLine title="Top Otel (Merkez)" score={96} meta="Otel • Aile dostu" />
          <DemoLine title="Güvenli Hastane" score={95} meta="Sağlık • 7/24" />
          <DemoLine title="En İyi AVM" score={93} meta="Alışveriş • Güvenlik güçlü" />
          <SmallHint />
        </ExpandableCard>

        <ExpandableCard
          icon="🏆"
          title="Top 10 Liste"
          desc="Kategoriye göre en güvenilir 10."
          open={openKey === "top"}
          onToggle={() => toggle("top")}
        >
          {selectedCategory ? (
            <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 8 }}>
              Seçili kategori: <b>{selectedCategory}</b>
            </div>
          ) : (
            <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 8 }}>
              Kategori seçersen liste filtrelenir.
            </div>
          )}
          <DemoLine title="1) Örnek Mekan" score={92} meta="—" />
          <DemoLine title="2) Örnek Mekan" score={90} meta="—" />
          <DemoLine title="3) Örnek Mekan" score={88} meta="—" />
          <SmallHint />
        </ExpandableCard>
      </div>

      {/* BOTTOM NAV (KAYBOLMAYACAK) */}
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
          zIndex: 20,
        }}
      >
        <NavIcon label="👤" />
        <NavIcon label="📖" />
        <NavIcon label="👑" active />
        <NavIcon label="🏠" />
      </div>

      {/* CATEGORIES OVERLAY */}
      <CategoriesOverlay
        open={categoriesOpen}
        onClose={() => setCategoriesOpen(false)}
        onSelectCategory={(id) => setSelectedCategory(id)}
      />
    </div>
  );
}

function ExpandableCard({
  icon,
  title,
  desc,
  open,
  onToggle,
  children,
}: {
  icon: string;
  title: string;
  desc: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      onClick={onToggle}
      style={{
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        background: "white",
        borderRadius: 18,
        padding: 14,
        marginBottom: 12,
        boxShadow: "0 12px 25px rgba(0,0,0,0.06)",
        border: "1px solid rgba(15,23,42,0.06)",
        cursor: "pointer",
        userSelect: "none",
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

      <div style={{ flex: 1, paddingTop: 2 }}>
        <div style={{ fontWeight: 900, fontSize: 16 }}>{title}</div>
        <div style={{ opacity: 0.75, marginTop: 4, fontSize: 13 }}>{desc}</div>

        {open ? (
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              marginTop: 12,
              paddingTop: 10,
              borderTop: "1px solid rgba(15,23,42,0.08)",
            }}
          >
            {children}
          </div>
        ) : null}
      </div>

      <div style={{ opacity: 0.55, fontWeight: 900, paddingTop: 8 }}>
        {open ? "▾" : "▸"}
      </div>
    </div>
  );
}

function DemoLine({
  title,
  score,
  meta,
}: {
  title: string;
  score: number;
  meta: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 10px",
        borderRadius: 14,
        border: "1px solid rgba(15,23,42,0.08)",
        marginBottom: 8,
        background: "rgba(2,6,23,0.02)",
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 900 }}>{title}</div>
        <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>{meta}</div>
      </div>
      <div
        style={{
          minWidth: 44,
          height: 34,
          borderRadius: 12,
          display: "grid",
          placeItems: "center",
          background: "rgba(79,124,255,0.10)",
          border: "1px solid rgba(79,124,255,0.22)",
          fontWeight: 900,
        }}
        title="Güven Skoru"
      >
        {score}
      </div>
    </div>
  );
}

function SmallHint() {
  return (
    <div style={{ marginTop: 8, fontSize: 12, opacity: 0.7 }}>
      Harita entegrasyonu sırada: “Haritada Gör” butonu + pinler.
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