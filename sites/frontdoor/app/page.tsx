import Link from "next/link";
import { LatinOsMap } from "@/components/feature/latin-os-map";
import { PriorityBoard } from "@/components/feature/priority-board";
import { sourceFlow, systemModules } from "@/data/system";

export default function HomePage() {
  return <div className="system-home">
    <header className="system-masthead">
      <div className="system-masthead-copy"><span className="eyebrow mono">FROM XIAOHONGSHU PLAN · OPEN SOURCE</span><h1>把拉丁学习，做成一张能走进去的地图。</h1><p>学习路径、知识、身体、动作、资料与成长记录都保留。需求信号只决定先开发哪里，不会把完整计划缩成一个专题。</p><div className="system-actions"><Link className="btn brick" href="#system-map">查看完整计划 ↓</Link><Link className="btn ghost" href="/force">进入当前开发：发力链 →</Link></div></div>
      <div className="system-pulse" aria-label="当前开发状态"><div className="system-pulse-orbit"><span>身体</span><span>动作</span><span>节奏</span><span>练习</span><i /></div><div className="system-pulse-caption"><span className="mono">NOW BUILDING / 01</span><strong>身体系统<br />发力链</strong><small>它是当前优先切片，不是整个网站。</small></div></div>
    </header>

    <section id="system-map" className="system-section"><div className="system-section-head"><div><span className="eyebrow mono">THE WHOLE PLAN</span><h2>原计划的六个部分，一个都不少。</h2></div><p>首页先给整体地图；每一部分逐步长成可搜索、可练习、可回来的产品。</p></div><LatinOsMap modules={systemModules} /></section>

    <section className="system-section priority-section"><div className="system-section-head"><div><span className="eyebrow mono">DEMAND → ROADMAP</span><h2>大家更想要什么，就先把什么做深。</h2></div><p>发力链先行；节拍、基本步和居家短练紧随其后。其余模块保留在架构中持续建设。</p></div><PriorityBoard /></section>

    <section className="system-section module-detail-section"><div className="system-section-head"><div><span className="eyebrow mono">SIX MODULES</span><h2>不是六张空卡片，而是六种学习问题。</h2></div></div><div className="module-detail-grid">{systemModules.map((module) => <Link href={module.href} className={`module-detail module-detail-${module.state}`} key={module.id}><span className="mono">{module.index} / {module.state === "building" ? "BUILDING" : module.state === "next" ? "NEXT" : "PLANNED"}</span><h3>{module.title}</h3><b>{module.short}</b><p>{module.description}</p><ul>{module.examples.map((example) => <li key={example}>{example}</li>)}</ul></Link>)}</div></section>

    <section className="source-pipeline"><div><span className="eyebrow mono">CONTENT PIPELINE</span><h2>课堂信息在后台供给内容，不抢首页主角。</h2><p>转录是珍贵原料，但公开前要结构化、复核和改写。首页展示的是用户能理解和练习的结果。</p></div><ol>{sourceFlow.map((item, index) => <li key={item}><span className="mono">0{index + 1}</span><strong>{item}</strong>{index < sourceFlow.length - 1 && <i>→</i>}</li>)}</ol></section>

    <footer className="system-footer"><div><span className="mono">OPEN SOURCE</span><strong>一个人先搭架子，所有人都可以来补内容。</strong></div><div><a href="https://github.com/EOMZON/LATINOS" target="_blank" rel="noreferrer">查看 GitHub ↗</a><Link href="/roadmap">查看路线图 →</Link></div></footer>
  </div>;
}
