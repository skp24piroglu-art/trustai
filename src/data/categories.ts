export type Category = {
  id: string;
  title: string;
  subtitle?: string;
  icon?: string; // şimdilik opsiyonel
};

export const CATEGORIES: Category[] = [
  { id: "construction_home", title: "İnşaat Malzemeleri/Ev" },
  { id: "tech_electronics", title: "Teknoloji/Elektronik/Ağ" },
  { id: "food_restaurant", title: "Gıda/İçecek/Restaurant" },
  { id: "beauty", title: "Güzellik/Güzellik End." },
  { id: "services_trade", title: "Hizmetler/Ticaret" },
  { id: "daily_life", title: "Günlük/Yaşam Ürünleri" },
  { id: "public_industry", title: "Ticari/Kamu Endüstrisi" },
  { id: "equipment_machine", title: "Ekipman/Makine San." },
  { id: "culture_entertainment", title: "Kültür/Eğlence" },
  { id: "health_wellness", title: "Sağlık/Wellness" },
  { id: "education_academic", title: "Eğitim/Akademik" },
  { id: "automotive_parts", title: "Otomotiv/Yedek Parça" },
  { id: "people_names", title: "İnsanlar/İsimler/Şahıslar", subtitle: "Phase 2’de açılır" },
  { id: "city_regions", title: "Şehir/Bölgesel Alanlar" },
  { id: "brand_categories", title: "Marka Kategorileri" },
  { id: "travel_stay", title: "Seyahat/Konaklama" },

  // videodaki vizyona göre ekstra (Phase 1’de gösterilebilir)
  { id: "historic_places", title: "Tarihi Mekanlar", subtitle: "Gezilecek yerler / turistik alanlar" },
  { id: "parks_squares", title: "Meydanlar & Parklar" },
  { id: "hospitals", title: "Hastaneler & Klinikler", subtitle: "Acil durumda nereye gideyim?" },
  { id: "hotels", title: "Oteller" },
  { id: "cafes", title: "Kafeler" },
  { id: "nightlife", title: "Eğlence Mekanları" },
];
