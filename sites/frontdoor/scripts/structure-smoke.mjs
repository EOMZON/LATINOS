import { readFile } from "node:fs/promises";

const baseUrl = process.env.FRONTDOOR_BASE_URL || "http://localhost:3000";
const cssPath = new URL("../styles/workbench.css", import.meta.url);

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function fetchHtml(path) {
  const response = await fetch(`${baseUrl}${path}`);
  assert(response.ok, `${path} returned HTTP ${response.status}`);
  return response.text();
}

const [danceHtml, dailyHtml, forceHtml, homeHtml, legacyHtml, aboutHtml, dashboardHtml, css] = await Promise.all([
  fetchHtml("/dance-os"),
  fetchHtml("/daily-latin"),
  fetchHtml("/force"),
  fetchHtml("/"),
  fetchHtml("/legacy"),
  fetchHtml("/about"),
  fetchHtml("/dashboard"),
  readFile(cssPath, "utf8"),
]);

assert(forceHtml.includes("FORCE CHAIN"), "Force Lab is missing the force chain blocks");
assert(forceHtml.includes("常见代偿"), "Force Lab is missing compensation guidance");
assert(forceHtml.includes("TRY NOW"), "Force Lab is missing actionable drills");
assert(forceHtml.includes("待专业复核"), "Force Lab is missing review-state disclosure");
assert(forceHtml.includes("不是私有课堂原文"), "Force Lab is missing the public/private source boundary");
assert((forceHtml.match(/class="force-topic"/g) || []).length === 5, "Force Lab must render exactly five first-slice topics");

assert(danceHtml.includes('href="#dance-sources"'), "Dance OS is missing the #dance-sources anchor tab");
assert(danceHtml.includes('id="dance-sources"'), "Dance OS is missing the dance-sources section id");
assert(danceHtml.includes('href="#body-map-practice-queue"'), "Dance OS is missing the body-map anchor tab");
assert(danceHtml.includes("Dance OS 模块库"), "Dance OS is missing the grouped asset library section");
assert(danceHtml.includes("Correction Ledger Demo"), "Dance OS is missing the correction ledger demo section");
assert(danceHtml.includes('id="correction-ledger-demo"'), "Dance OS is missing the correction ledger anchor section");
assert(danceHtml.includes("Body Map / Practice Queue"), "Dance OS is missing the body map / practice queue section");
assert(danceHtml.includes("BODY MAP SNAPSHOT"), "Dance OS is missing the body map snapshot panel");
assert(danceHtml.includes("PRACTICE QUEUE"), "Dance OS is missing the practice queue panel");
assert(danceHtml.includes("Return Trigger"), "Dance OS is missing the enriched asset content");
assert(danceHtml.includes("产品成立条件"), "Dance OS is missing the source-backed product criteria section");
assert(danceHtml.includes("feedback lens"), "Dance OS is missing the richer asset state labels");

assert(dailyHtml.includes("入口状态"), "Daily Latin is missing the entry states section");
assert(dailyHtml.includes("Daily Loop"), "Daily Latin is missing the daily loop section");
assert(dailyHtml.includes("Today Loop Demo"), "Daily Latin is missing the daily loop demo section");
assert(dailyHtml.includes('id="today-loop-demo"'), "Daily Latin is missing the today loop anchor section");
assert(dailyHtml.includes('href="#live-return-bridge"'), "Daily Latin is missing the return anchor tab");
assert(dailyHtml.includes("Live Return / Clip Bridge / Archive Jump"), "Daily Latin is missing the return bridge section");
assert(dailyHtml.includes("NEXT DAILY QUEUE"), "Daily Latin is missing the next daily queue panel");
assert(dailyHtml.includes("旧站已验证的起步原则"), "Daily Latin is missing the legacy proof section");
assert(dailyHtml.includes("本页依据"), "Daily Latin is missing the source-backed evidence section");
assert(dailyHtml.includes("Daily Latin 动作库"), "Daily Latin is missing the interactive move library section");

assert(homeHtml.includes("TODAY"), "Home page is missing the TODAY hero state");
assert(homeHtml.includes("连续练习"), "Home page is missing the heatmap section");
assert(homeHtml.includes("刚做完的一轮"), "Home page is missing the next session rail");
assert(homeHtml.includes("工作台"), "Home page is missing the core workbench section");
assert(homeHtml.includes("发力实验室"), "Home page is missing the Force Lab primary entry");
assert(homeHtml.includes("旧站起步页"), "Home page is missing the legacy module card");
assert(homeHtml.includes("Dance OS"), "Home page is missing the Dance OS module card");
assert(dashboardHtml.includes("下一批交付"), "Dashboard is missing the next action section");
assert(dashboardHtml.includes("决策护栏"), "Dashboard is missing the guardrail section");
assert(dashboardHtml.includes("Proof / Risk / Gate"), "Dashboard is missing the proof-risk-gate section");
assert(dashboardHtml.includes("当前 proof"), "Dashboard is missing the proof decision card");
assert(dashboardHtml.includes("Route Map"), "Dashboard is missing the route map section");
assert(dashboardHtml.includes("Witness Archive"), "Dashboard is missing the shared witness archive section");
assert(dashboardHtml.includes("/dance-os"), "Dashboard is missing the route-level mapping content");
assert(legacyHtml.includes("旧站已经验证过的表达"), "Legacy page is missing the language asset section");
assert(aboutHtml.includes("当前公开渠道"), "About page is missing the public channels section");

assert(css.includes("@media (max-width:860px)"), "Missing mobile media query");
assert(css.includes(".sidebar{display:none}"), "Missing mobile sidebar hide rule");
assert(css.includes(".asset-grid{grid-template-columns:repeat(2,minmax(0,1fr))}"), "Missing mobile asset grid rule");

console.log(
  JSON.stringify(
    {
      baseUrl,
      checks: [
        "dance anchors",
        "dance correction ledger demo",
        "dance body map practice queue",
        "daily sections",
        "daily loop demo",
        "force-first knowledge and drill slice",
        "source-backed route sections",
        "home phase hero",
        "home core workbench",
        "home next session queue",
        "dashboard dense sections",
        "dashboard witness archive",
        "legacy/about source-grounded sections",
        "mobile css guardrails",
      ],
    },
    null,
    2,
  ),
);
