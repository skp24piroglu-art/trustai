import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "@/data/categories";

export default function Categories() {
  const nav = useNavigate();
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return CATEGORIES;
    return CATEGORIES.filter((c) =>
      `${c.title} ${c.subtitle ?? ""}`.toLowerCase().includes(s)
    );
  }, [q]);

  const goHome = () => nav("/");

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1d9aa6, #0b3a41 65%, #071d22)",
        padding: 16,
        color: "white",
      }}
    >
      {/* üst bar */}
      <div
        style={{
          maxWidth: 980,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div style={{ fontWeight: 900 }}>✅ e-trust search</div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, opacity: 0.85 }}>
          <span>🏆</span>
          <span>🥇</span>
          <span>🛡️</span>
          <span>👑</span>
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
        {/* ❗ Kapat butonu: sadece Home’a döner */}
        <button
          onClick={goHome}
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

        <div style={{ textAlign: "center", fontWeight: 900, letterSpacing: 0.6 }}>
          KATEGORİLER
        </div>

        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Kategori ara..."
          style={{
            width: "100%",
            marginTop: 12,
            padding: 10,
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.22)",
            background: "rgba(0,0,0,0.18)",
            color: "white",
            outline: "none",
          }}
        />

        <div
          style={{
            marginTop: 14,
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 12,
          }}
        >
          {filtered.map((c) => {
            const disabled = !c.hasItems || !c.mapTo;

            return (
              <button
                key={c.id}
                onClick={() => {
                  if (disabled) {
                    alert("Bu kategori yakında aktif olacak ✅");
                    return;
                  }
                  // ✅ Home’a filtre parametresi ile git
                  nav("/?pc=" + encodeURIComponent(c.mapTo));
                }}
                style={{
                  padding: 14,
                  borderRadius: 18,
                  textAlign: "left",
                  background: disabled ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.20)",
                  color: "white",
                  cursor: "pointer",
                  opacity: disabled ? 0.55 : 1,
                }}
              >
                <div style={{ fontWeight: 800 }}>
                  {c.emoji ?? "•"} {c.title}
                </div>
                {disabled && (
                  <div style={{ fontSize: 12, opacity: 0.8, marginTop: 6 }}>
                    Yakında
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ maxWidth: 980, margin: "12px auto", fontSize: 12, opacity: 0.8 }}>
        Beta — Login + Kategori + Liste (şimdilik bazı kategoriler “yakında”)
      </div>
    </div>
  );
}
