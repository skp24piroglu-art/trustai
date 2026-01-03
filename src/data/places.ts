// 🔹 Tip export ediliyor (HATA BURADAYDI)
export type Place = {
  id: string;
  name: string;
  subtitle: string;
  score: number; // 0..100
  tier: "Premium" | "Güvenli" | "Orta";
  category: "restaurant" | "cafe" | "hotel" | "touristic";
  signals: string[];
};

// 🔹 Liste export ediliyor
export const places: Place[] = [
  // ================= RESTORAN =================
  {
    id: "nomads",
    name: "Nomads Restaurant",
    subtitle: "4.6 — Şık atmosfer, kaliteli mutfak",
    score: 92,
    tier: "Premium",
    category: "restaurant",
    signals: [
      "Düzenli hijyen denetimi",
      "Güvenlik kamerası mevcut",
      "Merkezi ve aydınlık konum",
    ],
  },
  {
    id: "bistro",
    name: "Premium Bistro",
    subtitle: "4.8 — Premium servis, özel deneyim",
    score: 85,
    tier: "Güvenli",
    category: "restaurant",
    signals: [
      "Rezervasyonlu giriş",
      "Eğitimli personel",
      "Kontrollü alan",
    ],
  },

  // ================= KAFE =================
  {
    id: "local-cafe",
    name: "Local Cafe",
    subtitle: "4.1 — Samimi ortam, uygun fiyat",
    score: 74,
    tier: "Orta",
    category: "cafe",
    signals: [
      "Mahalle esnafı",
      "Sabit müşteri kitlesi",
      "Gündüz yoğun",
    ],
  },
  {
    id: "work-cafe",
    name: "WorkHub Cafe",
    subtitle: "4.5 — Çalışma dostu, sakin",
    score: 88,
    tier: "Güvenli",
    category: "cafe",
    signals: [
      "Laptop dostu",
      "Kamera sistemi",
      "Sessiz ortam",
    ],
  },

  // ================= OTEL =================
  {
    id: "city-hotel",
    name: "City Center Hotel",
    subtitle: "4.7 — Merkezi konum, güvenli konaklama",
    score: 90,
    tier: "Premium",
    category: "hotel",
    signals: [
      "24 saat resepsiyon",
      "Kartlı giriş",
      "Kamera sistemi",
    ],
  },
 
  // ================= TURİSTİK =================
  {
    id: "old-town",
    name: "Old Town Square",
    subtitle: "Tarihi alan, yoğun ziyaret",
    score: 78,
    tier: "Orta",
    category: "touristic",
    signals: [
      "Gündüz yoğun",
      "Polis noktası yakın",
      "Aydınlatma yeterli",
    ],
  },
];
