import type { BodyPoint, BodyPose } from '../lib/bodyPose'

/**
 * 动作教学引导的目标姿态(手工构造,归一化:髋中点原点、肩宽单位长,y 向下)。
 * 索引 0–21 对应 MediaPipe 11–32 号身体关键点。
 * 匹配用与跟练相同的 9 维关节角度特征,阈值放宽到 55 分。
 */

function pt(x: number, y: number): BodyPoint {
  return { x, y, v: 1 }
}

function basePose(): BodyPose {
  // 拉丁站姿:身体挺拔,手臂自然贴近
  return [
    pt(-0.5, -1.15), // 0 左肩
    pt(0.5, -1.15), // 1 右肩
    pt(-0.62, -0.55), // 2 左肘
    pt(0.62, -0.55), // 3 右肘
    pt(-0.58, 0.0), // 4 左腕
    pt(0.58, 0.0), // 5 右腕
    pt(-0.6, 0.12), // 6 左小指
    pt(0.6, 0.12), // 7 右小指
    pt(-0.56, 0.12), // 8 左食指
    pt(0.56, 0.12), // 9 右食指
    pt(-0.52, 0.06), // 10 左拇指
    pt(0.52, 0.06), // 11 右拇指
    pt(-0.35, 0.0), // 12 左髋
    pt(0.35, 0.0), // 13 右髋
    pt(-0.33, 0.95), // 14 左膝
    pt(0.33, 0.95), // 15 右膝
    pt(-0.35, 1.85), // 16 左踝
    pt(0.35, 1.85), // 17 右踝
    pt(-0.35, 1.92), // 18 左脚跟
    pt(0.35, 1.92), // 19 右脚跟
    pt(-0.42, 1.98), // 20 左脚尖
    pt(0.42, 1.98), // 21 右脚尖
  ]
}

function armsOpenPose(): BodyPose {
  const p = basePose()
  // 手臂向两侧打开,略低于肩
  p[2] = pt(-0.95, -1.05)
  p[3] = pt(0.95, -1.05)
  p[4] = pt(-1.42, -0.95)
  p[5] = pt(1.42, -0.95)
  p[6] = pt(-1.52, -0.92)
  p[7] = pt(1.52, -0.92)
  p[8] = pt(-1.5, -1.0)
  p[9] = pt(1.5, -1.0)
  p[10] = pt(-1.46, -0.88)
  p[11] = pt(1.46, -0.88)
  return p
}

function weightShiftPose(): BodyPose {
  const p = basePose()
  // 重心在右腿:左腿弯曲、脚尖点地向左前伸出,躯干略向右倾
  p[0] = pt(-0.42, -1.15)
  p[1] = pt(0.58, -1.15)
  p[14] = pt(-0.1, 0.78) // 左膝弯曲内收
  p[16] = pt(-0.5, 1.78) // 左脚尖点地
  p[18] = pt(-0.52, 1.85)
  p[20] = pt(-0.62, 1.9)
  // 左手略抬起
  p[2] = pt(-0.7, -0.62)
  p[4] = pt(-0.66, -0.12)
  return p
}

export interface TutorialPose {
  id: string
  name: string
  tip: string
  body: BodyPose
}

export const TUTORIAL_POSES: TutorialPose[] = [
  {
    id: 'stance',
    name: '拉丁站姿',
    tip: '身体挺拔,重心在前脚掌,双肩放松下沉,手臂自然贴身体两侧。',
    body: basePose(),
  },
  {
    id: 'arms-open',
    name: '手臂打开',
    tip: '双臂向两侧打开到肩膀高度,手肘保持微弯,手指延伸,不要耸肩。',
    body: armsOpenPose(),
  },
  {
    id: 'weight-shift',
    name: '重心换腿',
    tip: '重心完全放到右腿,左腿膝盖弯曲、脚尖点地向旁伸出,骨盆保持稳定。',
    body: weightShiftPose(),
  },
]

/** 教学匹配阈值(比正式判定宽松) */
export const TUTORIAL_PASS_SCORE = 55
/** 需要连续保持达标的秒数 */
export const TUTORIAL_HOLD_SEC = 0.8
