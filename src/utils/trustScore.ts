// src/utils/trustScore.ts

export type TrustBadge =
  | "PREMIUM_ONAYLI"
  | "GUVENLI"
  | "ORTA"
  | "RISKLI";

export type TrustResult = {
  trustScore: number; // 0 - 100
  badge: TrustBadge;
  badgeLabel: string;
  badgeColor: string;
};

/**
 * TrustAI çekirdek skorlama fonksiyonu
 * Tek yerden hesaplanır, UI'dan tamamen bağımsızdır.
 */
export function calculateTrustScore(params: {
  safetyScore: number;   // 0 - 100
  userRating: number;    // 0 - 5
  isPremium: boolean;
}): TrustResult {
  const { safetyScore, userRating, isPremium } = params;

  // Güvenlik ana ağırlık (en önemli)
  const safetyWeight = 0.7;
  const ratingWeight = 0.3;

  // Kullanıcı puanını 100'lük sisteme çevir
  const normalizedRating = Math.min(Math.max(userRating, 0), 5) * 20;

  // Temel skor
  let score =
    safetyScore * safetyWeight +
    normalizedRating * ratingWeight;

  // Premium küçük ama anlamlı etki (güvenliği EZMEZ)
  if (isPremium) {
    score += 3;
  }

  // 0-100 aralığına sabitle
  const trustScore = Math.max(0, Math.min(100, Math.round(score)));

  // Badge hesaplama
  if (trustScore >= 90) {
    return {
      trustScore,
      badge: "PREMIUM_ONAYLI",
      badgeLabel: "🟢 Premium Onaylı",
      badgeColor: "#22c55e",
    };
  }

  if (trustScore >= 80) {
    return {
      trustScore,
      badge: "GUVENLI",
      badgeLabel: "🔵 Güvenli",
      badgeColor: "#3b82f6",
    };
  }

  if (trustScore >= 70) {
    return {
      trustScore,
      badge: "ORTA",
      badgeLabel: "🟡 Orta",
      badgeColor: "#facc15",
    };
  }

  return {
    trustScore,
    badge: "RISKLI",
    badgeLabel: "🔴 Riskli",
    badgeColor: "#ef4444",
  };
}