export type PlaceCategory = "restaurant" | "cafe" | "hotel" | "touristic";

export type Category = {
  id: string;
  title: string;
  subtitle?: string;
  emoji?: string;

  // ✅ Şimdilik bu kategoride içerik var mı?
  hasItems?: boolean;

  // ✅ Bu kategori şimdilik hangi Home bölümünü filtreliyor?
  mapTo?: PlaceCategory;
};

export const CATEGORIES: Category[] = [
  { id: "construction", title: "İnşaat Malzemeleri/Ev", emoji: "🏠", hasItems: false },
  { id: "tech", title: "Teknoloji/Elektronik/Ağ", emoji: "💻", hasItems: false },

  // ✅ Şimdilik içerik var: Restaurant
  { id: "food", title: "Gıda/İçecek/Restaurant", emoji: "🍽️", hasItems: true, mapTo: "restaurant" },

  { id: "beauty", title: "Güzellik/Güzellik End.", emoji: "💄", hasItems: false },
  { id: "services", title: "Hizmetler/Ticaret", emoji: "🧰", hasItems: false },
  { id: "daily", title: "Günlük/Yaşam Ürünleri", emoji: "🛒", hasItems: false },
  { id: "public", title: "Ticari/Kamu Endüstrisi", emoji: "🏛️", hasItems: false },
  { id: "equipment", title: "Ekipman/Makine San.", emoji: "⚙️", hasItems: false },
  { id: "culture", title: "Kültür/Eğlence", emoji: "🎭", hasItems: false },
  { id: "health", title: "Sağlık/Wellness", emoji: "🧘", hasItems: false },
  { id: "edu", title: "Eğitim/Akademik", emoji: "🎓", hasItems: false },
  { id: "auto", title: "Otomotiv/Yedek Parça", emoji: "🚗", hasItems: false },
  { id: "people", title: "İnsanlar/İsimler/Şahıslar", emoji: "👤", hasItems: false },

  // ❗ Şehir/Bölgesel Alanlar = item yoksa tıklayınca ekran değiştirmeyecek
  { id: "city", title: "Şehir/Bölgesel Alanlar", emoji: "🗺️", hasItems: false },

  { id: "brand", title: "Marka Kategorileri", emoji: "🏷️", hasItems: false },

  // ✅ Şimdilik içerik var: Otel
  { id: "travel", title: "Seyahat/Konaklama", emoji: "🏨", hasItems: true, mapTo: "hotel" },

  // ✅ Şimdilik içerik var: Kafe
  { id: "cafe", title: "Kafeler", emoji: "☕", hasItems: true, mapTo: "cafe" },

  // ✅ Şimdilik içerik var: Turistik
  { id: "tour", title: "Turistik Yerler", emoji: "🧭", hasItems: true, mapTo: "touristic" },
];