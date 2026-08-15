import Link from "next/link";
import type { SystemModule } from "@/data/system";

export function LatinOsMap({ modules }: { modules: SystemModule[] }) {
  return <div className="os-map" aria-label="Latin Dance OS 六大模块地图">
    <div className="os-map-core"><span className="mono">LATIN DANCE OS</span><strong>看懂</strong><i>→</i><strong>练习</strong><i>→</i><strong>留下</strong><small>完整系统保持展开 · 按需求信号分批开发</small></div>
    {modules.map((module) => <Link key={module.id} href={module.href} className={`os-node os-node-${module.id}`}><span className="mono">{module.index}</span><div><strong>{module.title}</strong><small>{module.short}</small></div><em>{module.state === "building" ? "正在开发" : module.state === "next" ? "下一批" : "已规划"}</em></Link>)}
  </div>;
}
