import { forcePrinciples, forceTopics } from "@/data/force";

function Chain({ items }: { items: string[] }) {
  return (
    <ol className="force-chain" aria-label="发力链">
      {items.map((item, index) => (
        <li key={item}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{item}</strong>
        </li>
      ))}
    </ol>
  );
}

export default function ForcePage() {
  return (
    <div className="force-page">
      <header className="force-hero">
        <div className="force-hero-copy">
          <div className="eyebrow">FORCE LAB · 发力实验室</div>
          <h1>看懂力量从哪里开始，<br />再把一个动作练对。</h1>
          <p>
            不是肌肉特效，也不是“使劲”提示。这里把脚下支撑、主力腿、骨盆、核心和上身对抗连成一条能观察、能练习的身体链。
          </p>
        </div>
        <div className="force-hero-status">
          <span>FIRST PUBLIC SLICE</span>
          <strong>5</strong>
          <p>个来自真实课堂问题的首发专题</p>
          <small>教学归纳 · 非实时肌电 · 待专业复核</small>
        </div>
      </header>

      <section className="force-index" aria-label="专题索引">
        {forceTopics.map((topic) => (
          <a key={topic.id} href={`#${topic.id}`}>
            <span>{topic.number}</span>
            <strong>{topic.title}</strong>
            <small>{topic.dance}</small>
          </a>
        ))}
      </section>

      <section className="force-topics">
        {forceTopics.map((topic) => (
          <article className="force-topic" id={topic.id} key={topic.id}>
            <div className="force-topic-head">
              <div>
                <span className="force-number display">{topic.number}</span>
                <div className="force-dance mono">{topic.dance}</div>
              </div>
              <div className="force-topic-title">
                <p>{topic.question}</p>
                <h2>{topic.title}</h2>
                <div>{topic.summary}</div>
              </div>
            </div>

            <div className="force-topic-grid">
              <section className="force-block force-chain-block">
                <div className="force-label mono">FORCE CHAIN</div>
                <h3>力量经过哪里</h3>
                <Chain items={topic.chain} />
              </section>

              <section className="force-block">
                <div className="force-label mono">LOOK FOR</div>
                <h3>练习时观察</h3>
                <ul>{topic.cues.map((cue) => <li key={cue}>{cue}</li>)}</ul>
                <div className="force-compensations">
                  <span>常见代偿</span>
                  <div>{topic.compensations.map((item) => <em key={item}>{item}</em>)}</div>
                </div>
              </section>

              <section className="force-block force-drill">
                <div className="force-label mono">TRY NOW · {topic.drill.duration}</div>
                <h3>{topic.drill.title}</h3>
                <ol>{topic.drill.steps.map((step) => <li key={step}>{step}</li>)}</ol>
                <div className="force-source">
                  <span>{topic.evidence.sourceType}</span>
                  <strong>{topic.evidence.status}</strong>
                  <small>{topic.evidence.label}</small>
                </div>
              </section>
            </div>
          </article>
        ))}
      </section>

      <section className="force-boundary">
        <div>
          <div className="eyebrow">PUBLIC KNOWLEDGE BOUNDARY</div>
          <h2>公开的是整理后的训练知识，<br />不是私有课堂原文。</h2>
          <p>原始课堂转录、老师与学员身份保持私有。公开条目保留来源类型、编辑状态和复核状态；不同教学体系可以并列，不伪装成唯一答案。</p>
        </div>
        <dl>
          {forcePrinciples.map((item) => (
            <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>
          ))}
        </dl>
      </section>

      <section className="force-contribute">
        <div>
          <div className="eyebrow">OPEN COLLABORATION</div>
          <h2>你不需要会 Git，才能一起完善它。</h2>
        </div>
        <div className="force-contribute-routes">
          <a href="https://github.com/EOMZON/LATINOS/issues/new/choose" target="_blank" rel="noreferrer">
            <span>舞者 / 老师</span><strong>提交动作问题、体感或纠错线索 →</strong>
          </a>
          <a href="https://github.com/EOMZON/LATINOS" target="_blank" rel="noreferrer">
            <span>开发者 / 设计者</span><strong>Fork、建分支并提交 Pull Request →</strong>
          </a>
        </div>
      </section>
    </div>
  );
}
