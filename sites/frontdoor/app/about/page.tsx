import Link from "next/link";
import { HomeModuleCard } from "@/components/cards/home-module-card";
import { InfoCard } from "@/components/cards/info-card";
import { DetailPanel } from "@/components/sections/detail-panel";
import { PageHeader } from "@/components/sections/page-header";
import { RouteStagePanel } from "@/components/sections/route-stage-panel";
import { SectionHeader } from "@/components/sections/section-header";
import { SourceMatrix } from "@/components/sections/source-matrix";
import { WorkbenchCluster } from "@/components/sections/workbench-cluster";
import {
  aboutBridgeCards,
  aboutContactCards,
  aboutDecisionCard,
  aboutFocusCards,
  aboutIdentityRows,
  aboutLead,
  aboutPrinciples,
  aboutRouteLeft,
  aboutRouteRight,
  aboutStageMetrics,
  aboutStageSignals,
} from "@/data/about";

export default function AboutPage() {
  return (
    <div className="about-page">
      <PageHeader eyebrow="关于这条线" title="这不是只做一个网站，而是在搭 Latin Dance OS" pill="identity · proof · product boundary" />
      <p className="about-intro-lead">{aboutLead}</p>
      <DetailPanel
        className="compact-detail compact-detail-about-top"
        stage={
          <div className="about-proof-stage">
            <RouteStagePanel
              className="compact-route-stage compact-route-stage-about"
              label="IDENTITY / PROOF / NEXT SNAPSHOT"
              title="先保留公开 proof，再把三条主线收进同一执行判断"
              metrics={aboutStageMetrics}
              signals={aboutStageSignals}
            />
            <div className="about-proof-strip">
              <div className="about-proof-chip">
                <span>identity</span>
                <strong>IP · Asset · Product</strong>
              </div>
              <div className="about-proof-chip">
                <span>legacy policy</span>
                <strong>keep proof · map forward</strong>
              </div>
              <div className="about-proof-chip">
                <span>next gate</span>
                <strong>finish Phase 2 before demo definition</strong>
              </div>
            </div>
          </div>
        }
        title="这条线真正服务什么"
        subtitle="daily latin ip · legacy proof · frontdoor asset · dance os product"
        rows={aboutIdentityRows}
        chips={["Keep Proof", "Grow Daily IP", "Build Frontdoor", "Productize Dance OS"]}
        actions={
          <>
            <Link className="btn brick" href="/legacy">
              看旧站 Proof
            </Link>
            <Link className="btn ghost" href="/dashboard">
              看当前阶段
            </Link>
            <Link className="btn ghost" href="/daily-latin">
              继续 Daily Latin
            </Link>
          </>
        }
      />
      <section className="about-bridge-section">
        <SectionHeader title="从这条线身份继续今天" more="不是停在理解愿景，而是决定你现在该从哪条入口继续" />
        <div className="module-grid compact-module-grid about-bridge-grid">
          {aboutBridgeCards.map((card) => (
            <HomeModuleCard key={card.title} card={card} variant="featured" />
          ))}
        </div>
      </section>
      <section>
        <SectionHeader title="这条 route 负责说清什么" more="不是讲项目故事，而是把这条线到底服务什么、当前不是什么讲成执行判断" />
        <SourceMatrix
          leftTitle="1 · 这条线真正服务什么"
          leftRows={aboutRouteLeft}
          rightTitle="2 · 当前不是什么"
          rightRows={aboutRouteRight}
        />
      </section>
      <section>
        <SectionHeader title="当前真正要成立" more="这页最重要的不是解释愿景，而是把当前最真实的四件事说清楚" />
        <div className="log-grid">
          {aboutFocusCards.map((card) => (
            <InfoCard key={card.title} card={card} />
          ))}
        </div>
      </section>
      <section>
        <SectionHeader title="三条主线" more="IP / 资产承接 / 产品化 必须同时存在，而不是只成立其中一条" />
        <div className="log-grid">
          {aboutPrinciples.map((card) => (
            <InfoCard key={card.title} card={card} />
          ))}
        </div>
      </section>
      <section>
        <SectionHeader title="当前公开渠道" more="来自旧站已存在的真实外部入口，而不是新造占位渠道" />
        <div className="log-grid">
          {aboutContactCards.map((card) => (
            <InfoCard key={card.title} card={card} />
          ))}
        </div>
      </section>
      <section>
        <SectionHeader title="这一页最后只需要留下什么" more="如果只能留下一个判断，就把今天最真实的执行判断留下来" />
        <WorkbenchCluster columns="wide-right">
          <section>
            <SectionHeader title="当前最短判断" more="不是 slogan，而是当前可以直接执行的路线" />
            <div className="log-grid single-column">
              <InfoCard card={aboutDecisionCard} />
            </div>
          </section>
          <section>
            <SectionHeader title="为什么现在还不该跳阶段" more="这条线只有把身份页也收成前台承接页，后面的 demo 定义才不会重新散掉" />
            <div className="log-grid single-column">
              <InfoCard
                card={{
                  day: "GATE 01",
                  title: "先收齐辅助承接页，再进入两个 demo 定义",
                  rows: [
                    { label: "当前", value: "/about 是 Phase 2 最后一个明显缺口" },
                    { label: "之后", value: "Phase 2 complete → define 2 demos" },
                  ],
                  note: "如果 about 还只是理念页，后面做 demo 时就会重新失去 frontdoor、proof 和 product 之间的统一语言。",
                }}
              />
            </div>
          </section>
        </WorkbenchCluster>
      </section>
      <footer>
        <div>LATINOS · About</div>
        <div>结论：先保留 proof，再把 IP / Asset / Product 同时做真</div>
      </footer>
    </div>
  );
}
