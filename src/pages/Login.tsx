import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [name, setName] = useState("");

  function handleLogin() {
    if (!name.trim()) {
      alert("Lütfen isminizi girin");
      return;
    }

    localStorage.setItem("trusbe_user", name.trim());
    nav("/");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background:
          "radial-gradient(circle at top, #1f3c88 0%, #0b1d3a 55%, #050b18 100%)",
        padding: 16,
      }}
    >
      <div
        style={{
          width: "min(420px, 92vw)",
          borderRadius: 26,
          padding: "28px 24px 26px",
          background: "rgba(255,255,255,0.10)",
          border: "1px solid rgba(255,255,255,0.20)",
          backdropFilter: "blur(16px)",
          color: "white",
          boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
          textAlign: "center",
        }}
      >
        {/* LOGO / TITLE */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 900,
            letterSpacing: 1,
          }}
        >
          TRUSBE
        </div>

        {/* SLOGAN */}
        <div
          style={{
            marginTop: 6,
            fontSize: 14,
            letterSpacing: 1.2,
            opacity: 0.85,
            fontWeight: 600,
          }}
        >
          TRUST BEYOND EXPECTATION
        </div>

        {/* DIVIDER */}
        <div
          style={{
            margin: "22px auto 18px",
            width: 80,
            height: 2,
            background:
              "linear-gradient(90deg, transparent, #ffffffaa, transparent)",
          }}
        />

        {/* INPUT */}
        <div
          style={{
            textAlign: "left",
            fontSize: 12,
            opacity: 0.8,
            marginBottom: 6,
          }}
        >
          Ad / Kullanıcı adı
        </div>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Örn: Serhat"
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.25)",
            background: "rgba(0,0,0,0.30)",
            outline: "none",
            color: "white",
            fontSize: 15,
          }}
        />

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            marginTop: 18,
            padding: "14px",
            borderRadius: 18,
            border: "none",
            background:
              "linear-gradient(180deg, #ffffff 0%, #e6e6e6 100%)",
            color: "#0b1d3a",
            fontWeight: 900,
            letterSpacing: 0.6,
            cursor: "pointer",
            boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
          }}
        >
          GİRİŞ YAP
        </button>

        {/* FOOTER */}
        <div
          style={{
            marginTop: 18,
            fontSize: 11,
            opacity: 0.65,
          }}
        >
          Powered by <b>e-trust intelligence</b>
        </div>
      </div>
    </div>
  );
}