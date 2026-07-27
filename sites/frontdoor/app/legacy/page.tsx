import Link from "next/link";
import { HomeModuleCard } from "@/components/cards/home-module-card";
import { InfoCard } from "@/components/cards/info-card";
import { DetailPanel } from "@/components/sections/detail-panel";
import { PageHeader } from "@/components/sections/page-header";
import { RouteStagePanel } from "@/components/sections/route-stage-panel";
import { SectionHeader } from "@/components/sections/section-header";
import {
  legacyBridgeCards,
  legacyCards,
  legacyLanguageCards,
  legacyLead,
  legacyMappingCards,
  legacyRows,
  legacyStageMetrics,
  legacyStageSignals,
  legacyStrategyCards,
} from "@/data/legacy";

export default function LegacyPage() {
  return (
    <div className="legacy-page">
      <PageHeader eyebrow="旧站 Proof" title="现有 live 站点，不推倒，先保留" pill="https://latindance.zondev.top" />
      <p className="legacy-intro-lead">{legacyLead}</p>
      <DetailPanel
        className="compact-detail compact-detail-legacy-top"
        stage={
          <div className="legacy-proof-stage">
            <RouteStagePanel
              className="compact-route-stage compact-route-stage-legacy"
              label="LIVE PROOF SNAPSHOT"
              title="先判断 / 再开始 / 再修 1 个点"
              metrics={legacyStageMetrics}
              signals={legacyStageSignals}
            />
            <div className="legacy-proof-strip">
              <div className="legacy-proof-chip">
                <span>旧站 promise</span>
                <strong>想练拉丁舞，不知道从哪开始？</strong>
              </div>
              <div className="legacy-proof-chip">
                <span>service promise</span>
                <strong>先选你今天的状态，把这一轮做完。</strong>
              </div>
              <div className="legacy-proof-chip">
                <span>system description</span>
                <strong>不是资料库；先判断、再开始、再修一个具体问题。</strong>
              </div>
            </div>
          </div>
        }
        title="Roya 拉丁舞起步页"
        subtitle="source · /Users/zon/Desktop/MINE/9_latin/apps/latinDance"
        rows={legacyRows}
        chips={["Legacy Proof", "Adult Beginner", "Live Site"]}
        actions={
          <>
            <a className="btn brick" href="https://latindance.zondev.top" target="_blank" rel="noreferrer">
              打开旧站
            </a>
            <Link className="btn ghost" href="/daily-latin">
              继续 Daily Latin
            </Link>
            <Link className="btn ghost" href="/dance-os">
              继续 Dance OS
            </Link>
          </>
        }
      />
      <section className="legacy-bridge-section">
        <SectionHeader title="从旧 proof 继续今天" more="不是停在回顾，而是把旧站已成立的入口接回新 frontdoor" />
        <div className="module-grid compact-module-grid legacy-bridge-grid">
          {legacyBridgeCards.map((card) => (
            <HomeModuleCard key={card.title} card={card} variant="featured" />
          ))}
        </div>
      </section>
      <section>
        <SectionHeader title="现有入口模块" more="来自旧站的真实结构" />
        <div className="log-grid">
          {legacyCards.map((card) => (
            <InfoCard key={card.title} card={card} />
          ))}
        </div>
      </section>
      <section>
        <SectionHeader title="当前承接策略" more="不是迁目录，而是保留 / 映射 / 并行" />
        <div className="log-grid">
          {legacyStrategyCards.map((card) => (
            <InfoCard key={card.title} card={card} />
          ))}
        </div>
      </section>
      <section>
        <SectionHeader title="旧站已经验证过的表达" more="这些句子已经证明适合作为新入口的真实语言资产" />
        <div className="log-grid">
          {legacyLanguageCards.map((card) => (
            <InfoCard key={card.title} card={card} />
          ))}
        </div>
      </section>
      <section>
        <SectionHeader title="旧站到新入口的映射" more="把已经有效的结构映到 frontdoor / Daily / Dance OS" />
        <div className="log-grid">
          {legacyMappingCards.map((card) => (
            <InfoCard key={card.title} card={card} />
          ))}
        </div>
      </section>
      <footer>
        <div>LATINOS · 旧站 Proof</div>
        <div>结论：保留它，把它当 legacy proof，不急着替换</div>
      </footer>
    </div>
  );
}
