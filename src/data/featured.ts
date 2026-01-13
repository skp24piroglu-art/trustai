export type FeaturedItem = {
  id: string;
  title: string;
  subtitle?: string;
  score?: number; // 0..100
  badges?: string[]; // küçük etiketler
};

export type FeaturedSection = {
  id: "bee" | "trusted" | "weekly";
  title: string;
  desc: string;
  icon: string;
  items: FeaturedItem[];
};

export const FEATURED_SECTIONS: FeaturedSection[] = [
  {
    id: "bee",
    title: "Bee’nin Seçimleri",
    desc: "Bee’nin kürasyonu — premium öneriler",
    icon: "⭐",
    items: [
      { id: "b1", title: "Nomads Restaurant", subtitle: "İstiklal • Şık atmosfer", score: 92, badges: ["Premium", "Aydınlık"] },
      { id: "b2", title: "WorkHub Cafe", subtitle: "Pera • Çalışma dostu", score: 88, badges: ["Kamera", "Sakin"] },
      { id: "b3", title: "City Center Hotel", subtitle: "Taksim • 24/7 Resepsiyon", score: 90, badges: ["Kartlı giriş"] },
      { id: "b4", title: "Old Town Square", subtitle: "Tarihi alan • Yoğun", score: 78, badges: ["Polis noktası"] },
    ],
  },
  {
    id: "trusted",
    title: "En Güvenilir Yerler",
    desc: "Güven skoru en yüksek olanlar",
    icon: "🛡️",
    items: [
      { id: "t1", title: "Premium Bistro", subtitle: "Beyoğlu • Kontrollü alan", score: 85, badges: ["Rezervasyon"] },
      { id: "t2", title: "City Center Hotel", subtitle: "Merkezi konum", score: 90, badges: ["Premium"] },
      { id: "t3", title: "WorkHub Cafe", subtitle: "Sessiz • Kamera", score: 88, badges: ["Güvenli"] },
      { id: "t4", title: "Nomads Restaurant", subtitle: "Hijyen denetimi", score: 92, badges: ["Premium"] },
    ],
  },
  {
    id: "weekly",
    title: "Haftanın En İyileri",
    desc: "Bu hafta öne çıkanlar",
    icon: "👑",
    items: [
      { id: "w1", title: "Top 10 Restoran", subtitle: "Bu hafta en güvenilir 10", score: 0, badges: ["Liste"] },
      { id: "w2", title: "Top 10 Kafe", subtitle: "Çalışma + güven", score: 0, badges: ["Liste"] },
      { id: "w3", title: "Top 10 Otel", subtitle: "Konaklama güven skoru", score: 0, badges: ["Liste"] },
      { id: "w4", title: "Top 10 Turistik", subtitle: "Gezilecek yerler", score: 0, badges: ["Liste"] },
    ],
  },
];