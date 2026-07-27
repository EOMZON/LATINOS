import { Suspense } from "react";
import { AnchorTabs } from "@/components/feature/anchor-tabs";
import { BodyMapPracticeQueue } from "@/components/feature/body-map-practice-queue";
import { HomeModuleCard } from "@/components/cards/home-module-card";
import { CorrectionLedgerDemo } from "@/components/feature/correction-ledger-demo";
import { HashedAssetGallery } from "@/components/feature/hashed-asset-gallery";
import { DetailPanel } from "@/components/sections/detail-panel";
import { PageHeader } from "@/components/sections/page-header";
import { RouteStagePanel } from "@/components/sections/route-stage-panel";
import { SectionHeader } from "@/components/sections/section-header";
import { SourceMatrix } from "@/components/sections/source-matrix";
import {
  danceAssetGroups,
  danceBridgeCards,
  danceDemoChecklist,
  danceDemoFocuses,
  danceDemoProfiles,
  danceDemoStates,
  danceIndependentDemoMetrics,
  danceIndependentDemoRows,
  danceIndependentDemoSignals,
  danceLead,
  danceRows,
  danceStageMetrics,
  danceStageSignals,
  danceSourceLeft,
  danceSourceRight,
} from "@/data/dance";
import { DANCE_OS_STORAGE_KEY } from "@/lib/witness-archive";

export default function DanceOsPage() {
  return (
    <div className="dance-os-page">
      <PageHeader eyebrow="Dance OS" title="从练习过程里长出工具，不从空白产品名开始" pill="route · /dance-os" />
      <AnchorTabs
        tabs={[
          { label: "总览", href: "#dance-summary", active: true },
          { label: "独立 Demo", href: "#independent-demo-entry" },
          { label: "去向", href: "#dance-next-bridge" },
          { label: "模块库", href: "#dance-assets" },
          { label: "纠错", href: "#correction-ledger-demo" },
          { label: "队列", href: "#body-map-practice-queue" },
          { label: "依据", href: "#dance-sources" },
        ]}
      />
      <p className="dance-intro-lead">{danceLead}</p>
      <section id="dance-summary">
        <DetailPanel
          className="compact-detail compact-detail-dance-top"
          stage={
            <RouteStagePanel
              className="compact-route-stage compact-route-stage-dance"
              label="CORRECTION SNAPSHOT"
              title="录 / 看 / 记 / 下一轮"
              metrics={danceStageMetrics}
              signals={danceStageSignals}
            />
          }
          title="Dance OS Demo"
          subtitle="session lens · correction ledger · body map · practice queue"
          rows={danceRows}
          chips={["Body Map", "Correction Ledger", "Next Step"]}
        />
      </section>

      <section id="independent-demo-entry">
        <DetailPanel
          className="compact-detail compact-detail-dance-top"
          stage={
            <RouteStagePanel
              className="compact-route-stage compact-route-stage-dance"
              label="INDEPENDENT DEMO ENTRY"
              title="frontdoor 先承接，再把独立工具壳单独长"
              metrics={danceIndependentDemoMetrics}
              signals={danceIndependentDemoSignals}
            />
          }
          title="独立 Dance OS Demo 入口"
          subtitle="frontdoor bridge · local shell · correction / queue / return proof"
          rows={danceIndependentDemoRows}
          chips={["Local Shell", "Queue", "Return Trigger"]}
          actions={
            <>
              <a className="btn brick" href="http://127.0.0.1:3301" target="_blank" rel="noreferrer">
                打开独立 Demo（本机 3301）
              </a>
              <a className="btn ghost" href="#correction-ledger-demo">
                继续看本页 route demo
              </a>
            </>
          }
        />
      </section>

      <section className="dance-bridge-section" id="dance-next-bridge">
        <SectionHeader
          className="compact-sec-head"
          title="从这里怎么继续"
          more="继续 route demo / 进入独立壳 / 还没说清卡点就先回 Daily"
        />
        <div className="module-grid compact-module-grid dance-bridge-grid">
          {danceBridgeCards.map((card) => (
            <HomeModuleCard key={card.title} card={card} variant="featured" />
          ))}
        </div>
      </section>

      <section id="dance-assets">
        <SectionHeader className="compact-sec-head" title="Dance OS 模块库" more="先选当前最需要的一组" />
        <HashedAssetGallery groups={danceAssetGroups} compact />
      </section>

      <section id="correction-ledger-demo">
        <SectionHeader className="compact-sec-head" title="Correction Ledger Demo" more="把这轮压成 1 个 next step" />
        <Suspense fallback={<div className="panel loading-panel">正在恢复这一轮的 correction 状态...</div>}>
          <CorrectionLedgerDemo
            profiles={danceDemoProfiles}
            states={danceDemoStates}
            focuses={danceDemoFocuses}
            checklist={danceDemoChecklist}
            storageKey={DANCE_OS_STORAGE_KEY}
            compact
          />
        </Suspense>
      </section>

      <section id="body-map-practice-queue">
        <SectionHeader
          className="compact-sec-head"
          title="Body Map / Practice Queue"
          more="让 witness 继续变成热区和下一轮队列"
        />
        <BodyMapPracticeQueue focuses={danceDemoFocuses} compact />
      </section>

      <section id="dance-sources">
        <SectionHeader className="compact-sec-head" title="本页依据" more="飞书骨架 + 旧站修正逻辑" />
        <SourceMatrix
          leftTitle="1 · 真实来源"
          leftRows={danceSourceLeft}
          rightTitle="2 · 产品成立条件"
          rightRows={danceSourceRight}
          className="compact-source-matrix"
        />
      </section>

      <footer>
        <div>LATINOS · Dance OS</div>
        <div>结论：先做录 / 看 / 记 / 下一步，再谈更复杂的分析</div>
      </footer>
    </div>
  );
}
