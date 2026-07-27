import { CourseCard } from "@/components/cards/course-card";
import { HomeModuleCard } from "@/components/cards/home-module-card";
import { InfoCard } from "@/components/cards/info-card";
import { DetailPanel } from "@/components/sections/detail-panel";
import { PageHeader } from "@/components/sections/page-header";
import { RouteStagePanel } from "@/components/sections/route-stage-panel";
import { SectionHeader } from "@/components/sections/section-header";
import { SourceMatrix } from "@/components/sections/source-matrix";
import { WorkbenchCluster } from "@/components/sections/workbench-cluster";
import {
  roadmapBridgeCards,
  roadmapDeliverables,
  roadmapGateLeft,
  roadmapGateRight,
  roadmapGuardCards,
  roadmapLead,
  roadmapPhases,
  roadmapStageMetrics,
  roadmapStageSignals,
} from "@/data/roadmap";

export default function RoadmapPage() {
  return (
    <div className="roadmap-page">
      <PageHeader eyebrow="路线图" title="先定义两个 demo，再决定 preview 与域名" pill="当前阶段：Phase 3 · demo definition" />
      <p className="roadmap-intro-lead">{roadmapLead}</p>
      <DetailPanel
        className="compact-detail compact-detail-roadmap-top"
        stage={
          <div className="roadmap-proof-stage">
              <RouteStagePanel
                className="compact-route-stage compact-route-stage-roadmap"
                label="PHASE / GATE / DECISION SNAPSHOT"
                title="辅助承接层已收齐，下一步先把两个 demo 边界定义清楚"
                metrics={roadmapStageMetrics}
                signals={roadmapStageSignals}
              />
              <div className="roadmap-proof-strip">
                <div className="roadmap-proof-chip">
                  <span>current phase</span>
                  <strong>Phase 3 · define 2 demos</strong>
                </div>
                <div className="roadmap-proof-chip">
                  <span>current rule</span>
                  <strong>define first, incubate second</strong>
                </div>
                <div className="roadmap-proof-chip">
                  <span>domain policy</span>
                <strong>preview before production</strong>
              </div>
            </div>
          </div>
        }
        title="当前阶段、下一阶段与域名门槛"
        subtitle="phase order · auxiliary alignment · demo incubation · domain mapping"
        rows={[
          { label: "当前主线", value: "先定义两个 demo 的边界、目录与入口" },
          { label: "已收页面", value: "legacy / tools / roadmap / dashboard / about" },
          { label: "下一阶段", value: "共享资产沉淀 → preview / deploy 判断" },
          { label: "域名策略", value: "demo 与 preview 足够稳后再评估首页映射" },
        ]}
        chips={["Phase 3", "Define First", "Preview Later"]}
      />
      <section className="roadmap-bridge-section">
        <SectionHeader title="按路线继续今天" more="这页不是停在计划，而是决定接下来该去哪一页" />
        <div className="module-grid compact-module-grid roadmap-bridge-grid">
          {roadmapBridgeCards.map((card) => (
            <HomeModuleCard key={card.title} card={card} variant="featured" />
          ))}
        </div>
      </section>
      <WorkbenchCluster columns="wide-left">
        <section>
          <SectionHeader title="四个阶段" />
          <div className="roadmap">
            {roadmapPhases.map((phase) => (
              <div key={phase.title} className={`phase${phase.done ? " done" : ""}`}>
                <div className="ph-label">{phase.label}</div>
                <h4>{phase.title}</h4>
                <p>{phase.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader title="接下来的 3 个交付" more="不是今天就切生产" />
          <div className="course-grid">
            {roadmapDeliverables.map((item) => (
              <CourseCard key={item.title} item={item} />
            ))}
          </div>
        </section>
      </WorkbenchCluster>
      <section>
        <SectionHeader title="切入口前的 gate" more="这页不是路线图口号，而是当前真的成立什么、明确不做什么" />
        <SourceMatrix
          leftTitle="1 · 切入口前必须成立"
          leftRows={roadmapGateLeft}
          rightTitle="2 · 当前明确不做"
          rightRows={roadmapGateRight}
        />
      </section>
      <section>
        <SectionHeader title="不要绑死的 3 个动作" more="目录规范、新入口重构、生产替换不该被迫同一轮完成" />
        <div className="log-grid">
          {roadmapGuardCards.map((card) => (
            <InfoCard key={card.title} card={card} />
          ))}
        </div>
      </section>
      <footer>
        <div>LATINOS · 路线图</div>
        <div>原则：先 preview，后 production</div>
      </footer>
    </div>
  );
}
