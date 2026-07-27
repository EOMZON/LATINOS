import type { ReactNode } from "react";
import type { StoredWitness } from "@/lib/demo-store";

export function WitnessRecordCard({
  eyebrow,
  title,
  witness,
  metaLeft,
  metaRight,
  actions,
  variant = "archive",
}: {
  eyebrow?: string;
  title: string;
  witness: StoredWitness;
  metaLeft: string;
  metaRight: string;
  actions?: ReactNode;
  variant?: "archive" | "queue" | "return";
}) {
  const groundingLabels = {
    archive: {
      proof: "为什么值得留",
      exit: "如果这轮还没收住",
    },
    queue: {
      proof: "为什么排进下一轮",
      exit: "如果继续后仍没闭环",
    },
    return: {
      proof: "下次回来为什么先做它",
      exit: "什么情况说明入口还没成立",
    },
  }[variant];

  return (
    <article className={`witness-record-card witness-record-card-${variant}`}>
      <div className="witness-record-head">
        <div>
          {eyebrow ? <span className="archive-label mono">{eyebrow}</span> : null}
          <strong>{title}</strong>
        </div>
        <span>{witness.createdAt}</span>
      </div>
      <div className="witness-record-meta">
        <span>{metaLeft}</span>
        <span>{metaRight}</span>
      </div>
      <p className="witness-record-step">{witness.nextStep}</p>
      <p className="witness-record-lens">回看 lens：{witness.lens}</p>
      <div className="witness-record-grounding">
        <div>
          <span>{groundingLabels.proof}</span>
          <p>{witness.focusProof}</p>
        </div>
        <div>
          <span>{groundingLabels.exit}</span>
          <p>{witness.exitRule}</p>
        </div>
      </div>
      {witness.note ? <div className="archive-item-note">备注：{witness.note}</div> : null}
      {actions ? <div className="queue-actions witness-record-actions">{actions}</div> : null}
    </article>
  );
}
