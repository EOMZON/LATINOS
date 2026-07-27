import Link from "next/link";
import { HomeModuleCard } from "@/components/cards/home-module-card";
import { InfoCard } from "@/components/cards/info-card";
import { DetailPanel } from "@/components/sections/detail-panel";
import { PageHeader } from "@/components/sections/page-header";
import { RouteStagePanel } from "@/components/sections/route-stage-panel";
import { SectionHeader } from "@/components/sections/section-header";
import { SourceMatrix } from "@/components/sections/source-matrix";
import {
  ruleCards,
  toolBridgeCards,
  toolExecutionCards,
  toolLead,
  toolSourcesLeft,
  toolSourcesRight,
  toolStageMetrics,
  toolStageSignals,
  toolStopDoingCards,
} from "@/data/tools";
import { WorkbenchCluster } from "@/components/sections/workbench-cluster";

export default function ToolsPage() {
  return (
    <div className="tools-page">
      <PageHeader eyebrow="来源与规则" title="飞书、规范、部署入口都在这里" pill="唯一 source of truth · Feishu" />
      <p className="tools-intro-lead">{toolLead}</p>
      <DetailPanel
        className="compact-detail compact-detail-tools-top"
        stage={
          <div className="tools-proof-stage">
            <RouteStagePanel
              className="compact-route-stage compact-route-stage-tools"
              label="SOURCE / RULE / DECISION SNAPSHOT"
              title="先回到真相，再决定入口，再讨论生产"
              metrics={toolStageMetrics}
              signals={toolStageSignals}
            />
            <div className="tools-proof-strip">
              <div className="tools-proof-chip">
                <span>source of truth</span>
                <strong>Feishu first</strong>
              </div>
              <div className="tools-proof-chip">
                <span>legacy policy</span>
                <strong>保留 / 映射 / 并行</strong>
              </div>
              <div className="tools-proof-chip">
                <span>ship gate</span>
                <strong>preview before production</strong>
              </div>
            </div>
          </div>
        }
        title="来源、规则和当前入口判断"
        subtitle="feishu truth · legacy proof · frontdoor preview · deployment guardrails"
        rows={[
          { label: "内容真相", value: "Feishu 文档组，不再双轨" },
          { label: "旧站策略", value: "公开 proof，先保留" },
          { label: "当前工程", value: "sites/frontdoor / Next / route-scoped" },
          { label: "切换门槛", value: "verify / smoke / preview / 实机复核" },
        ]}
        chips={["Feishu First", "Keep Legacy", "Preview First"]}
        actions={
          <>
            <a
              className="btn brick"
              href="https://my.feishu.cn/wiki/Gq7fwe8YXiRfDpkiRkzcFLkwnFx"
              target="_blank"
              rel="noreferrer"
            >
              打开 Feishu 主线
            </a>
            <Link className="btn ghost" href="/legacy">
              看旧站 Proof
            </Link>
            <Link className="btn ghost" href="/roadmap">
              看切换 Gate
            </Link>
          </>
        }
      />
      <section className="tools-bridge-section">
        <SectionHeader title="从规则继续今天" more="不是只看文档，而是决定接下来要去的那一页" />
        <div className="module-grid compact-module-grid tools-bridge-grid">
          {toolBridgeCards.map((card) => (
            <HomeModuleCard key={card.title} card={card} variant="featured" />
          ))}
        </div>
      </section>
      <SourceMatrix
        className="compact-source-matrix compact-source-matrix-tools"
        leftTitle="1 · 飞书主来源"
        leftRows={toolSourcesLeft}
        rightTitle="2 · 当前关键入口"
        rightRows={toolSourcesRight}
      />
      <section>
        <SectionHeader title="当前规则" more="不只是写在文档里，也要体现在前台决策里" />
        <div className="log-grid">
          {ruleCards.map((card) => (
            <InfoCard key={card.title} card={card} />
          ))}
        </div>
      </section>
      <WorkbenchCluster columns="wide-left">
        <section>
          <SectionHeader title="当前执行链" more="这页真正服务的是：从 source of truth 到 frontdoor 再到 preview 的整条执行路径" />
          <div className="log-grid">
            {toolExecutionCards.map((card) => (
              <InfoCard key={card.title} card={card} />
            ))}
          </div>
        </section>
        <section>
          <SectionHeader title="当前停做项" more="这些不是抽象禁令，而是为了防止这条线重新长回混乱结构" />
          <div className="log-grid single-column">
            {toolStopDoingCards.map((card) => (
              <InfoCard key={card.title} card={card} />
            ))}
          </div>
        </section>
      </WorkbenchCluster>
      <footer>
        <div>LATINOS · 来源与规则</div>
        <div>结论：Feishu first，legacy 保留，preview 先行</div>
      </footer>
    </div>
  );
}
