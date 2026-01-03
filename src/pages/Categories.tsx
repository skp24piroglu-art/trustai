import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "@/data/categories";

export default function Categories() {
  const nav = useNavigate();
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return CATEGORIES;
    return CATEGORIES.filter((c) => `${c.title} ${c.subtitle ?? ""}`.toLowerCase().includes(s));
  }, [q]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #1d9aa6, #0b3a41 65%, #071d22)",
        padding: 16,
        color: "white",
      }}
    >
      {/* üst bar (logolar gibi) */}
      <div style={{ maxWidth: 980, margin: "0 auto", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ fontWeight: 900, display: "flex", gap: 8, alignItems: "center" }}>
          ✅ e-trust search
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, opacity: 0.85 }}>
          <span>🏆</span><span>🥇</span><span>🛡️</span><span>👑</span>
        </div>
      </div>

      {/* modal */}
      <div
        style={{
          maxWidth: 980,
          margin: "14px auto 0",
          borderRadius: 26,
          background: "rgba(46, 98, 180, 0.45)",
          border: "1px solid rgba(255,255,255,0.18)",
          backdropFilter: "blur(10px)",
          padding: 18,
          position: "relative",
        }}
      >
        <button
          onClick={() => nav("/home")}
          title="Kapat"
          style={{
            position: "absolute",
            right: 14,
            top: 14,
            width: 38,
            height: 38,
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.25)",
            background: "rgba(0,0,0,0.25)",
            color: "white",
            cursor: "pointer",
            fontSize: 18,
            fontWeight: 900,
          }}
        >
          ×
        </button>

        <div style={{ textAlign: "center", fontSize: 18, fontWeight: 900, letterSpacing: 0.5 }}>
          KATEGORİLER
        </div>

        <div style={{ marginTop: 14, display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ opacity: 0.9 }}>🔎</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Kategori ara..."
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.22)",
              background: "rgba(0,0,0,0.18)",
              color: "white",
              outline: "none",
            }}
          />
        </div>

        <div
          style={{
            marginTop: 14,
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 12,
          }}
        >
          {filtered.map((c) => (
            <button
              key={c.id}
              onClick={() => nav("/home?category=" + encodeURIComponent(c.id))}
              style={{
                padding: "14px 14px",
                borderRadius: 18,
                textAlign: "left",
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.20)",
                color: "white",
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(0,0,0,0.18) inset",
              }}
            >
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ fontSize: 20 }}>{c.emoji ?? "•"}</div>
                <div style={{ fontWeight: 800 }}>{c.title}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 980, margin: "12px auto 0", fontSize: 12, opacity: 0.75 }}>
        Beta — Şu an: Login + Kategori + Liste. Sıradaki: Favoriler + Harita.
      </div>
    </div>
  );
}
