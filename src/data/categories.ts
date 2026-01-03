export type Category = {
  id: string;
  title: string;
  subtitle?: string;
  emoji?: string;
};

export const CATEGORIES: Category[] = [
  { id: "construction", title: "İnşaat Malzemeleri/Ev", emoji: "🏠" },
  { id: "tech", title: "Teknoloji/Elektronik/Ağ", emoji: "💻" },
  { id: "food", title: "Gıda/İçecek/Restaurant", emoji: "🍽️" },
  { id: "beauty", title: "Güzellik/Güzellik End.", emoji: "💄" },
  { id: "services", title: "Hizmetler/Ticaret", emoji: "🧰" },
  { id: "daily", title: "Günlük/Yaşam Ürünleri", emoji: "🛒" },
  { id: "public", title: "Ticari/Kamu Endüstrisi", emoji: "🏛️" },
  { id: "equipment", title: "Ekipman/Makine San.", emoji: "⚙️" },
  { id: "culture", title: "Kültür/Eğlence", emoji: "🎭" },
  { id: "health", title: "Sağlık/Wellness", emoji: "🧘" },
  { id: "edu", title: "Eğitim/Akademik", emoji: "🎓" },
  { id: "auto", title: "Otomotiv/Yedek Parça", emoji: "🚗" },
  { id: "people", title: "İnsanlar/İsimler/Şahıslar", emoji: "👤" },
  { id: "city", title: "Şehir/Bölgesel Alanlar", emoji: "🗺️" },
  { id: "brand", title: "Marka Kategorileri", emoji: "🏷️" },
  { id: "travel", title: "Seyahat/Konaklama", emoji: "🏨" }
];