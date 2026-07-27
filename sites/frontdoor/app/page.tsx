import Link from "next/link";
import { HomeModuleCard } from "@/components/cards/home-module-card";
import { NextSessionQueue } from "@/components/feature/next-session-queue";
import { Heatmap } from "@/components/sections/heatmap";
import { HomeHero } from "@/components/sections/home-hero";
import { PageHeader } from "@/components/sections/page-header";
import { SectionHeader } from "@/components/sections/section-header";
import {
  homeFooter,
  homeHeatmap,
  homeHero,
  homeIndependentDemoBridge,
  homePrimaryModules,
  homeProgress,
  homeSupportModules,
  homeWorkbench,
} from "@/data/home";

export default function HomePage() {
  return (
    <>
      <PageHeader className="topline-home" eyebrow={homeHero.eyebrow} title={homeHero.title} pill={homeHero.pill} />
      <HomeHero hero={homeHero} />

      <section className="home-heatmap-section">
        <SectionHeader className="compact-sec-head" title={homeHeatmap.title} more={homeHeatmap.more} />
        <Heatmap
          values={homeProgress}
          className="compact-heatmap-card"
          rangeLabel={homeHeatmap.rangeLabel}
          note={homeHeatmap.note}
        />
      </section>

      <div className="workbench-cluster home-lower-cluster">
        <section className="home-workbench-stack">
          <SectionHeader className="compact-sec-head" title={homeWorkbench.title} more={homeWorkbench.more} />
          <div className="home-workbench-board-shell">
            <p className="home-workbench-intro">{homeWorkbench.intro}</p>
            <NextSessionQueue className="compact-queue-board compact-queue-rail-board" variant="rail" />

            <section className="home-demo-bridge" id="independent-dance-demo">
              <div className="home-demo-bridge-copy">
                <div className="home-demo-bridge-kicker mono">{homeIndependentDemoBridge.kicker}</div>
                <h3>{homeIndependentDemoBridge.title}</h3>
                <p>{homeIndependentDemoBridge.description}</p>
              </div>

              <div className="home-demo-bridge-rows">
                {homeIndependentDemoBridge.rows.map((row) => (
                  <div key={row.label} className="home-demo-bridge-row">
                    <span>{row.label}</span>
                    <b>{row.value}</b>
                  </div>
                ))}
              </div>

              <div className="home-demo-bridge-actions">
                <Link className="btn brick" href={homeIndependentDemoBridge.primaryHref}>
                  {homeIndependentDemoBridge.primaryLabel}
                </Link>
                <a
                  className="btn ghost"
                  href={homeIndependentDemoBridge.secondaryHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  {homeIndependentDemoBridge.secondaryLabel}
                </a>
              </div>
            </section>

            <div className="home-module-rail">
              <div className="home-module-rail-section">
                <div className="home-module-rail-head">
                  <div>
                    <div className="home-module-rail-kicker mono">{homeWorkbench.entryLabel}</div>
                    <h3>{homeWorkbench.entryTitle}</h3>
                  </div>
                  <p>{homeWorkbench.entryMore}</p>
                </div>
                <div className="module-grid compact-module-grid home-module-board home-module-board-featured">
                  {homePrimaryModules.map((card) => (
                    <HomeModuleCard key={card.title} card={card} variant="featured" />
                  ))}
                </div>
              </div>

              <div className="home-module-rail-section home-module-rail-section-support">
                <div className="home-module-rail-head">
                  <div>
                    <div className="home-module-rail-kicker mono">{homeWorkbench.supportLabel}</div>
                    <h3>{homeWorkbench.supportTitle}</h3>
                  </div>
                  <p>{homeWorkbench.supportMore}</p>
                </div>
                <div className="module-grid compact-module-grid home-module-board home-module-board-support">
                  {homeSupportModules.map((card) => (
                    <HomeModuleCard key={card.title} card={card} variant="support" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="home-footer compact-home-footer">
        <div>{homeFooter.left}</div>
        <div>{homeFooter.right}</div>
      </footer>
    </>
  );
}
