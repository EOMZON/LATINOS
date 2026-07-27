export * from "./types";
export * from "./about";
export * from "./daily";
export * from "./dashboard";
export * from "./dance";
export * from "./home";
export * from "./legacy";
export * from "./roadmap";
export * from "./tools";

import { dailyMoves } from "./daily";
import { dashboardMetrics } from "./dashboard";
import { danceProducts } from "./dance";
import { legacyLanguageCards } from "./legacy";
import { roadmapDeliverables } from "./roadmap";

export const homeStateMetrics = dashboardMetrics;
export const homeMovePreview = dailyMoves
  .filter((item) => item.category === "通用" || item.category === "路径")
  .slice(0, 4);
export const homeAssetPreview = danceProducts;
export const homeDeliveryPreview = roadmapDeliverables;
export const homeVoicePreview = legacyLanguageCards.slice(0, 3);
