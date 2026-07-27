import { Suspense } from "react";
import { AnchorTabs } from "@/components/feature/anchor-tabs";
import { HomeModuleCard } from "@/components/cards/home-module-card";
import { DailyReturnBoard } from "@/components/feature/daily-return-board";
import { DailyLoopDemo } from "@/components/feature/daily-loop-demo";
import { InfoCard } from "@/components/cards/info-card";
import { TabbedMoveLibrary } from "@/components/feature/tabbed-move-library";
import { DetailPanel } from "@/components/sections/detail-panel";
import { PageHeader } from "@/components/sections/page-header";
import { RouteStagePanel } from "@/components/sections/route-stage-panel";
import { SectionHeader } from "@/components/sections/section-header";
import { SourceMatrix } from "@/components/sections/source-matrix";
import { WorkbenchCluster } from "@/components/sections/workbench-cluster";
import {
  dailyBridgeCards,
  dailyEntryCards,
  dailyEntryRail,
  dailyDemoDances,
  dailyDemoStates,
  dailyDemoTasks,
  dailyFlowCards,
  dailyLead,
  dailyLegacyPrinciples,
  dailyMoveGroups,
  dailyMoves,
  dailyRows,
  dailyStageMetrics,
  dailyStageSignals,
  dailySourceLeft,
  dailySourceRight,
} from "@/data/daily";
import { DAILY_LOOP_STORAGE_KEY } from "@/lib/witness-archive";

export default function DailyLatinPage() {
  const dailyLibraryGroups = [
    ...dailyMoveGroups.filter((group) => group.id === "paths"),
    ...dailyMoveGroups.filter((group) => group.id !== "paths"),
  ];

  return (
    <div className="daily-latin-page">
      <PageHeader eyebrow="Daily Latin" title="把今天这一轮压成最小入口" pill="route · /daily-latin" />
      <AnchorTabs
        tabs={[
          { label: "总览", href: "#daily-overview", active: true },
          { label: "状态", href: "#entry-states" },
          { label: "Demo", href: "#today-loop-demo" },
          { label: "去向", href: "#daily-next-bridge" },
          { label: "回流", href: "#live-return-bridge" },
          { label: "依据", href: "#daily-sources" },
          { label: "动作库", href: "#daily-library" },
        ]}
      />
      <p className="daily-intro-lead">{dailyLead}</p>
      <section id="daily-overview">
        <DetailPanel
          className="compact-detail compact-detail-daily compact-detail-daily-top"
          stage={
            <RouteStagePanel
              className="compact-route-stage compact-route-stage-daily"
              label="DAILY ENTRY SNAPSHOT"
              title="状态分流 / 4 步起步 / 回流判断"
              metrics={dailyStageMetrics}
              signals={dailyStageSignals}
            />
          }
          title="Daily Latin Demo"
          subtitle="entry states · practice loop · content witness"
          rows={dailyRows}
          chips={["状态分流", "4 步起步", "Daily Witness"]}
        />
      </section>

      <section id="entry-states">
        <SectionHeader className="compact-sec-head" title={dailyEntryRail.title} more={dailyEntryRail.more} />
        <div className="daily-entry-rail-grid">
          <div className="daily-entry-rail-panel">
            <div className="daily-entry-rail-head">
              <div className="daily-entry-rail-kicker mono">{dailyEntryRail.entry.kicker}</div>
              <h3>{dailyEntryRail.entry.title}</h3>
              <p>{dailyEntryRail.entry.description}</p>
            </div>
            <div className="log-grid">
              {dailyEntryCards.map((card) => (
                <InfoCard key={card.title} card={card} className="compact-card" />
              ))}
            </div>
          </div>

          <div id="daily-loop-overview" className="daily-entry-rail-panel">
            <div className="daily-entry-rail-head">
              <div className="daily-entry-rail-kicker mono">{dailyEntryRail.loop.kicker}</div>
              <h3>{dailyEntryRail.loop.title}</h3>
              <p>{dailyEntryRail.loop.description}</p>
            </div>
            <div className="log-grid">
              {dailyFlowCards.map((card) => (
                <InfoCard key={card.title} card={card} className="compact-card" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="today-loop-demo">
        <SectionHeader className="compact-sec-head" title="Today Loop Demo" more="先选状态，再压出一句 witness" />
        <Suspense fallback={<div className="panel loading-panel">正在恢复这一轮的入口状态...</div>}>
          <DailyLoopDemo
            states={dailyDemoStates}
            dances={dailyDemoDances}
            tasks={dailyDemoTasks}
            storageKey={DAILY_LOOP_STORAGE_KEY}
            compact
          />
        </Suspense>
      </section>

      <section className="daily-bridge-section" id="daily-next-bridge">
        <SectionHeader
          className="compact-sec-head"
          title="这轮做完后，从哪里继续"
          more="继续留在 Daily / 回到直播回流 / 已说清卡点就桥接到 Dance OS"
        />
        <div className="module-grid compact-module-grid daily-bridge-grid">
          {dailyBridgeCards.map((card) => (
            <HomeModuleCard key={card.title} card={card} variant="featured" />
          ))}
        </div>
      </section>

      <WorkbenchCluster columns="wide-left" className="compact-cluster">
        <section id="live-return-bridge">
          <SectionHeader
            className="compact-sec-head"
            title="Live Return / Clip Bridge / Archive Jump"
            more="这一轮做完后，判断继续 / 归档 / 桥接"
          />
          <DailyReturnBoard compact />
        </section>

        <section id="legacy-daily-principles">
          <SectionHeader className="compact-sec-head" title="旧站已验证的起步原则" more="把旧站里已验证有效的起步逻辑保留下来" />
          <div className="log-grid single-column">
            {dailyLegacyPrinciples.map((card) => (
              <InfoCard key={card.title} card={card} className="compact-card" />
            ))}
          </div>
        </section>
      </WorkbenchCluster>

      <section id="daily-sources">
        <SectionHeader className="compact-sec-head" title="本页依据" more="飞书主线 + 旧站起步原则一起托住这个入口" />
        <SourceMatrix
          className="compact-source-matrix compact-source-matrix-daily"
          leftTitle="1 · 真实来源"
          leftRows={dailySourceLeft}
          rightTitle="2 · 当前入口原则"
          rightRows={dailySourceRight}
        />
      </section>

      <section id="daily-library">
        <SectionHeader className="compact-sec-head" title="Daily Latin 动作库" more="只切当前真要看的那一组" />
        <TabbedMoveLibrary
          titlePrefix="DAILY LATIN LIBRARY"
          groups={dailyLibraryGroups}
          items={dailyMoves}
          compact
          hidePanelInCompact
        />
      </section>

      <footer>
        <div>LATINOS · Daily Latin</div>
        <div>结论：先把今天这一轮接上，再扩直播与内容承接</div>
      </footer>
    </div>
  );
}
