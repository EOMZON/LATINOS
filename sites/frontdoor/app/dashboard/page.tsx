import { CourseCard } from "@/components/cards/course-card";
import { DecisionCard } from "@/components/cards/decision-card";
import { WitnessArchiveBoard } from "@/components/feature/witness-archive-board";
import { DetailPanel } from "@/components/sections/detail-panel";
import { InfoCard } from "@/components/cards/info-card";
import { MetricCard } from "@/components/cards/metric-card";
import { RouteSignalCard } from "@/components/cards/route-signal-card";
import { PageHeader } from "@/components/sections/page-header";
import { RouteStagePanel } from "@/components/sections/route-stage-panel";
import { SectionHeader } from "@/components/sections/section-header";
import { SourceMatrix } from "@/components/sections/source-matrix";
import { WorkbenchCluster } from "@/components/sections/workbench-cluster";
import {
  dashboardActionCards,
  dashboardBars,
  dashboardDecisionSignals,
  dashboardLead,
  dashboardMetrics,
  dashboardOpsCards,
  dashboardRows,
  dashboardRouteSignals,
  dashboardSourceLeft,
  dashboardSourceRight,
  dashboardStageMetrics,
  dashboardStageSignals,
  dashboardVerificationCards,
} from "@/data/dashboard";

export default function DashboardPage() {
  return (
    <div className="dashboard-page">
      <PageHeader eyebrow="状态看板" title="辅助承接层已收齐，接下来先定义两个 demo" pill="当前阶段：Phase 3 · demo definition" />
      <p className="dashboard-intro-lead">{dashboardLead}</p>
      <section id="dashboard-summary">
        <DetailPanel
          className="compact-detail compact-detail-dashboard-top"
          stage={
            <div className="dashboard-proof-stage">
              <RouteStagePanel
                className="compact-route-stage compact-route-stage-dashboard"
                label="PHASE / PROOF / NEXT SNAPSHOT"
                title="辅助承接层已收齐，当前先把两个 demo 的边界定义清楚"
                metrics={dashboardStageMetrics}
                signals={dashboardStageSignals}
              />
              <div className="dashboard-proof-strip">
                <div className="dashboard-proof-chip">
                  <span>phase</span>
                  <strong>Phase 3</strong>
                </div>
                <div className="dashboard-proof-chip">
                  <span>current rule</span>
                  <strong>define 2 demos before deploy</strong>
                </div>
                <div className="dashboard-proof-chip">
                  <span>after phase 3</span>
                  <strong>shared assets → preview</strong>
                </div>
              </div>
            </div>
          }
          title="当前阶段、已收页面与下一阶段"
          subtitle="phase truth · auxiliary alignment · verification chain · next demo definition"
          rows={dashboardRows}
          chips={["Phase 3", "5 Aux Passes", "Demo Definition"]}
        />
      </section>
      <WorkbenchCluster columns="wide-left" className="dashboard-cluster">
        <section id="dashboard-metrics">
          <div className="dash-grid">
            {dashboardMetrics.map((metric) => (
              <MetricCard key={metric.label} metric={metric} compact />
            ))}
          </div>
        </section>
        <section id="dashboard-structure-bar">
          <SectionHeader className="compact-sec-head" title="结构推进条" />
          <div className="heatmap-card">
            <div className="bars">
              {dashboardBars.map((item) => (
                <div key={item.label} className="bar" style={{ height: `${(item.value / 5) * 100}%` }}>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </WorkbenchCluster>
      <WorkbenchCluster columns="wide-right" className="dashboard-cluster">
        <section id="dashboard-next-actions">
          <SectionHeader className="compact-sec-head" title="下一批交付" more="看板不只汇报状态，也要明确接下来继续长什么" />
          <div className="course-grid">
            {dashboardActionCards.map((item) => (
              <CourseCard key={item.title} item={item} compact />
            ))}
          </div>
        </section>
        <section id="dashboard-verification">
          <SectionHeader className="compact-sec-head" title="验证状态" more="哪些结论已经有脚本或浏览器证据" />
          <div className="log-grid">
            {dashboardVerificationCards.map((card) => (
              <InfoCard key={card.title} card={card} className="compact-card" />
            ))}
          </div>
        </section>
      </WorkbenchCluster>
      <section id="dashboard-guardrails">
        <SectionHeader className="compact-sec-head" title="决策护栏" more="这里不是抽象原则，而是当前 frontdoor 正在执行的真实边界" />
        <SourceMatrix
          leftTitle="1 · 验证链"
          leftRows={dashboardSourceLeft}
          rightTitle="2 · 当前护栏"
          rightRows={dashboardSourceRight}
          className="compact-source-matrix"
          hideMini
        />
      </section>
      <section id="dashboard-proof-risk-gate">
        <SectionHeader className="compact-sec-head" title="Proof / Risk / Gate" more="看板不只记录状态，还要说明已经被什么证明、当前最可能失败在哪、下一道门槛是什么" />
        <div className="decision-grid">
          {dashboardDecisionSignals.map((item) => (
            <DecisionCard key={item.title} item={item} compact />
          ))}
        </div>
      </section>
      <section id="dashboard-route-map">
        <SectionHeader className="compact-sec-head" title="Route Map" more="把 proof / risk / gate 压到每一条正在运行的 route 上，而不是只停在整体结论" />
        <div className="route-grid">
          {dashboardRouteSignals.map((item) => (
            <RouteSignalCard key={item.route} item={item} compact hideNote />
          ))}
        </div>
      </section>
      <section id="dashboard-witness-archive">
        <SectionHeader className="compact-sec-head" title="Witness Archive" more="如果两个 demo 真的是同一个系统，这里就应该开始长出共享回流证据" />
        <WitnessArchiveBoard compact />
      </section>
      <section id="dashboard-ops">
        <SectionHeader className="compact-sec-head" title="当前运维判断" more="现在应该继续做什么，不该急着做什么" />
        <div className="log-grid">
          {dashboardOpsCards.map((card) => (
            <InfoCard key={card.title} card={card} className="compact-card" />
          ))}
        </div>
      </section>
      <footer className="compact-dashboard-footer">
        <div>LATINOS · 状态看板</div>
        <div>当前优先级：先定义两个 demo，再进入共享资产与 preview</div>
      </footer>
    </div>
  );
}
