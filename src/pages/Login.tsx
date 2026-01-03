import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [name, setName] = useState("");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "radial-gradient(circle at top, #1d9aa6, #0b3a41 65%, #071d22)",
        padding: 16,
      }}
    >
      <div
        style={{
          width: "min(520px, 92vw)",
          borderRadius: 22,
          padding: 22,
          background: "rgba(255,255,255,0.10)",
          border: "1px solid rgba(255,255,255,0.18)",
          backdropFilter: "blur(10px)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 900, display: "flex", gap: 10, alignItems: "center" }}>
          🌍 Trusbe
        </div>
        <div style={{ opacity: 0.8, marginTop: 6 }}>Trust Beyond Expectation</div>

        <div style={{ marginTop: 18, opacity: 0.8, fontSize: 13 }}>Ad / Kullanıcı adı</div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Örn: Serhat"
          style={{
            width: "100%",
            marginTop: 8,
            padding: "12px 14px",
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.18)",
            background: "rgba(0,0,0,0.18)",
            outline: "none",
            color: "white",
            fontSize: 14,
          }}
        />

        <button
          onClick={() => nav("/categories")}
          style={{
            width: "100%",
            marginTop: 14,
            padding: "12px 14px",
            borderRadius: 14,
            border: "none",
            background: "rgba(255,255,255,0.92)",
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          Giriş Yap
        </button>

        <div style={{ marginTop: 10, fontSize: 12, opacity: 0.75 }}>
          🚀 Beta — Şimdilik sadece isim ile giriş
        </div>
      </div>
    </div>
  );
}