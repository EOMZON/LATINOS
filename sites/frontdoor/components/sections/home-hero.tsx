import Link from "next/link";
import type { HomeHeroData } from "@/data/types";

export function HomeHero({ hero }: { hero: HomeHeroData }) {
  return (
    <div className="hero">
      <div className="hero-left">
        <div className="day-row">
          <span className="day-num display">{hero.phase}</span>
          <span className="hero-phase-note">{hero.phaseNote}</span>
        </div>
        <div className="hero-tag">{hero.tag}</div>
        <div className="hero-desc">{hero.description}</div>
        <div className="stat-strip">
          {hero.stats.map((stat) => (
            <div key={stat.label}>
              {stat.label}
              <strong>{stat.value}</strong>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-right">
        <div className="hero-progress">
          <div className="ring-wrap">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#222226" strokeWidth="10" />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#9D6FE0"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="326.7"
                strokeDashoffset="176.4"
              />
            </svg>
            <div className="ring-center">
              <div className="n">{hero.progressValue}</div>
              <div className="l">{hero.progressLabel}</div>
            </div>
          </div>
        </div>
        <div className="hero-right-lower">
          <div className="live-session">
            <div className="k">{hero.sessionLabel}</div>
            <div className="v">{hero.sessionValue}</div>
          </div>
          <Link className="btn brick hero-cta" href={hero.ctaHref}>
            {hero.ctaLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
