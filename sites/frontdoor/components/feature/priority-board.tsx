import Link from "next/link";
import { prioritySignals } from "@/data/system";

export function PriorityBoard() {
  return <div className="priority-board">
    {prioritySignals.map((item, index) => <Link href={item.href} className="priority-row" key={item.rank}><span className="priority-rank mono">{item.rank}</span><div className="priority-copy"><strong>{item.title}</strong><small>{item.detail}</small></div><div className="priority-meter" aria-label={`需求信号：${item.signal}`}><i style={{ width: `${100 - index * 13}%` }} /></div><div className="priority-state"><b>{item.signal}</b><span>{item.state}</span></div></Link>)}
    <p className="priority-note">这里展示相对需求信号，不伪造精确票数。排序综合你看到的投票与已收集反馈，并会继续更新。</p>
  </div>;
}
