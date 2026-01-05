import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { places, type Place } from "../data/places";

type Category = Place["category"];

const CATEGORY_META: Record<
  Category,
  { title: string; emoji: string; hint: string }
> = {
  restaurant: {
    title: "Restoranlar",
    emoji: "🍽️",
    hint: "Yemek & deneyim",
  },
  cafe: {
    title: "Kafeler",
    emoji: "☕",
    hint: "Kahve & çalışma",
  },
  hotel: {
    title: "Oteller",
    emoji: "🏨",
    hint: "Konaklama",
  },
  touristic: {
    title: "Turistik Yerler",
    emoji: "🗺️",
    hint: "Gezi noktaları",
  },
};

function getScoreColor(score: number) {
  if (score >= 90) return "#34d399"; // yeşil
  if (score >= 80) return "#60a5fa"; // mavi
  if (score >= 70) return "#facc15"; // sarı
  return "#fb7185"; // pembe/kırmızımsı
}

function getTierPill(tier: Place["tier"]) {
  if (tier === "Premium")
    return {
      bg: "rgba(52, 211, 153, 0.14)",
      fg: "#34d399",
      bd: "rgba(52, 211, 153, 0.35)",
    };
  if (tier === "Güvenli")
    return {
      bg: "rgba(96, 165, 250, 0.14)",
      fg: "#60a5fa",
      bd: "rgba(96, 165, 250, 0.35)",
    };
  return {
    bg: "rgba(250, 204, 21, 0.14)",
    fg: "#facc15",
    bd: "rgba(250, 204, 21, 0.35)",
  };
}

export default function Home() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [dark, setDark] = useState(true);

  function logout() {
    localStorage.removeItem("trusbe_user");
    navigate("/login");
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return places;

    return places.filter((p) => {
      const hay = `${p.name} ${p.subtitle} ${p.tier} ${p.category} ${p.score}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query]);

  // Bölümlere ayır (restaurant/cafe/hotel/touristic)
  const sections = useMemo(() => {
    const order: Category[] = ["restaurant", "cafe", "hotel", "touristic"];
    return order.map((cat) => ({
      cat,
      items: filtered.filter((p) => p.category === cat),
    }));
  }, [filtered]);

  const bg = dark
    ? "radial-gradient(1200px 600px at 10% 0%, rgba(59,130,246,0.20), transparent 60%), radial-gradient(900px 500px at 85% 10%, rgba(34,197,94,0.18), transparent 55%), #070A12"
    : "radial-gradient(1200px 600px at 10% 0%, rgba(59,130,246,0.10), transparent 60%), radial-gradient(900px 500px at 85% 10%, rgba(34,197,94,0.10), transparent 55%), #F6F7FB";

  const text = dark ? "rgba(255,255,255,0.92)" : "rgba(10,10,10,0.88)";
  const subtext = dark ? "rgba(255,255,255,0.70)" : "rgba(10,10,10,0.60)";
  const cardBg = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const border = dark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)";
  const soft = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";

  return (
    <div style={{ minHeight: "100vh", background: bg, color: text }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "28px 16px 38px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ fontSize: 28, lineHeight: 1 }}>🌍</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 34, fontWeight: 900, letterSpacing: -0.5 }}>Trusbe</div>
            <div style={{ marginTop: 2, color: subtext, fontWeight: 600 }}>
              Yakındaki güvenilir mekanlar
            </div>
          </div>

          <button
            onClick={() => setDark((v) => !v)}
            title="Tema"
            style={{
              borderRadius: 999,
              border: `1px solid ${border}`,
              background: cardBg,
              color: text,
              padding: "10px 14px",
              cursor: "pointer",
              backdropFilter: "blur(10px)",
            }}
          >
            {dark ? "🌙" : "☀️"}
          </button>

          <button
            onClick={logout}
            style={{
              borderRadius: 999,
              border: `1px solid ${border}`,
              background: cardBg,
              color: text,
              padding: "10px 16px",
              cursor: "pointer",
              fontWeight: 800,
              backdropFilter: "blur(10px)",
            }}
          >
            Çıkış
          </button>
        </div>

        {/* Search */}
        <div
          style={{
            marginTop: 18,
            borderRadius: 18,
            border: `1px solid ${border}`,
            background: cardBg,
            backdropFilter: "blur(12px)",
            padding: "12px 14px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ opacity: 0.8 }}>🔎</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e-trust search (otel, kafe, skor, isim...)"
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              background: "transparent",
              color: text,
              fontSize: 16,
              fontWeight: 600,
            }}
          />
        </div>

        {/* SECTIONS: Bölüm bölüm */}
        <div style={{ marginTop: 18, display: "grid", gap: 26 }}>
          {sections.map(({ cat, items }) => {
            const meta = CATEGORY_META[cat];

            // Arama varken boş bölümleri hiç göstermeyelim (daha temiz)
            if (query.trim() && items.length === 0) return null;

            return (
              <div key={cat}>
                {/* Section header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <div style={{ fontSize: 20 }}>{meta.emoji}</div>
                    <div style={{ fontSize: 20, fontWeight: 950, letterSpacing: -0.2 }}>
                      {meta.title}
                    </div>
                    <div style={{ color: subtext, fontWeight: 700, fontSize: 13 }}>
                      {meta.hint}
                    </div>
                  </div>

                  <div style={{ color: subtext, fontWeight: 800, fontSize: 12 }}>
                    {items.length} adet
                  </div>
                </div>

                {/* Cards in this section */}
                <div style={{ display: "grid", gap: 16 }}>
                  {items.map((p) => {
                    const scoreColor = getScoreColor(p.score);
                    const pill = getTierPill(p.tier);
                    const open = expandedId === p.id;

                    return (
                      <div
                        key={p.id}
                        style={{
                          borderRadius: 22,
                          border: `1px solid ${border}`,
                          background: cardBg,
                          padding: 18,
                          boxShadow: dark
                            ? "0 18px 60px rgba(0,0,0,0.35)"
                            : "0 18px 60px rgba(0,0,0,0.10)",
                          backdropFilter: "blur(14px)",
                        }}
                      >
                        {/* Title row */}
                        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 24, fontWeight: 950, letterSpacing: -0.4 }}>
                              {p.name}
                            </div>
                            <div style={{ marginTop: 4, color: subtext, fontWeight: 700 }}>
                              {p.subtitle}
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-end",
                              gap: 8,
                            }}
                          >
                            <span
                              style={{
                                padding: "7px 12px",
                                borderRadius: 999,
                                border: `1px solid ${pill.bd}`,
                                background: pill.bg,
                                color: pill.fg,
                                fontWeight: 900,
                                fontSize: 13,
                              }}
                            >
                              {p.tier}
                            </span>

                            <div style={{ color: subtext, fontWeight: 800, fontSize: 12 }}>
                              {p.score}/100
                            </div>
                          </div>
                        </div>

                        {/* Trust score bar */}
                        <div style={{ marginTop: 14 }}>
                          <div style={{ color: subtext, fontWeight: 800, fontSize: 13 }}>
                            Trust Score
                          </div>

                          <div
                            style={{
                              marginTop: 8,
                              height: 10,
                              borderRadius: 999,
                              background: soft,
                              overflow: "hidden",
                              border: `1px solid ${border}`,
                            }}
                          >
                            <div
                              style={{
                                width: `${p.score}%`,
                                height: "100%",
                                background: `linear-gradient(90deg, ${scoreColor}, rgba(255,255,255,0.12))`,
                                transition: "width .25s ease",
                              }}
                            />
                          </div>
                        </div>

                        {/* Actions */}
                        <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10 }}>
                          <button
                            style={{
                              borderRadius: 999,
                              border: `1px solid ${border}`,
                              background: soft,
                              color: text,
                              padding: "10px 14px",
                              cursor: "pointer",
                              fontWeight: 900,
                            }}
                            title="Beğendim"
                          >
                            👍
                          </button>
                          <button
                            style={{
                              borderRadius: 999,
                              border: `1px solid ${border}`,
                              background: soft,
                              color: text,
                              padding: "10px 14px",
                              cursor: "pointer",
                              fontWeight: 900,
                            }}
                            title="Beğenmedim"
                          >
                            👎
                          </button>

                          <div style={{ flex: 1 }} />

                          <button
                            style={{
                              borderRadius: 999,
                              border: `1px solid ${border}`,
                              background: soft,
                              color: text,
                              padding: "10px 14px",
                              cursor: "pointer",
                              fontWeight: 900,
                            }}
                            title="Favori"
                          >
                            🤍
                          </button>

                          <button
                            onClick={() => setExpandedId((cur) => (cur === p.id ? null : p.id))}
                            style={{
                              borderRadius: 999,
                              border: `1px solid ${border}`,
                              background: soft,
                              color: text,
                              padding: "10px 16px",
                              cursor: "pointer",
                              fontWeight: 900,
                            }}
                          >
                            {open ? "Kapat" : "Neden Güvenli?"}
                          </button>
                        </div>

                        {/* Expand */}
                        {open && (
                          <div
                            style={{
                              marginTop: 14,
                              borderRadius: 18,
                              border: `1px solid ${border}`,
                              background: dark ? "rgba(0,0,0,0.22)" : "rgba(255,255,255,0.65)",
                              padding: 14,
                            }}
                          >
                            <div style={{ fontSize: 18, fontWeight: 950, marginBottom: 8 }}>
                              Güvenlik Sinyalleri
                            </div>

                            <ul
                              style={{
                                margin: 0,
                                paddingLeft: 20,
                                color: subtext,
                                fontWeight: 700,
                                lineHeight: 1.7,
                              }}
                            >
                              {(p.signals || []).map((s) => (
                                <li key={s}>
                                  <span style={{ color: text }}>✅</span> {s}
                                </li>
                              ))}
                            </ul>

                            <div style={{ marginTop: 10, color: subtext, fontWeight: 700, fontSize: 13 }}>
                              🤖 <span style={{ color: text, fontWeight: 900 }}>TrustAI yorumu:</span>{" "}
                              Genel risk düşük. Yoğun saatlerde çevre faktörlerini kontrol et.
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 18, color: subtext, fontWeight: 700, fontSize: 12 }}>
          🚀 Beta — Şu an: Login + Home liste + bölümleme. Sıradaki adım: gerçek kullanıcı (Register) + gerçek DB.
        </div>
      </div>
    </div>
  );
}