import { useMemo } from 'react'
import type { BodyPose } from '../lib/bodyPose'
import { bodyToPolygon, type SilhouettePts } from '../lib/silhouette'
import SkeletonFigure from './SkeletonFigure'

/**
 * 实心人形剪影 pictogram(Just Dance 式平色体块,远看是体块不是线条)。
 * 回退链(都不报错):
 *   ① 姿态胶囊剪影(bodyToPolygon,与打分同源、四肢完整,默认首选)
 *   ② 分割剪影(预提取管线的 Selfie Segmenter 轮廓;近距离全身视频质量更好,
 *     身体点缺失的关键帧也可以用它补上)
 *   ③ 旧线框骨架卡(SkeletonFigure)
 * 镜像与主画面一致(x → 1−x)。
 */
export default function SilhouetteFigure({
  pts,
  body,
  width = 84,
  height = 112,
  color = 'rgba(255, 255, 255, 0.9)',
  className,
}: {
  /** 分割剪影多边形(format 2 预计算;身体点缺失时的备胎) */
  pts?: SilhouettePts | null
  /** 关键帧身体姿态:优先用来生成胶囊剪影 */
  body?: BodyPose
  width?: number
  height?: number
  color?: string
  className?: string
}) {
  const geom = useMemo(() => {
    const effective = (body ? bodyToPolygon(body) : null) ?? pts
    if (!effective || effective.length < 6) return null
    let minX = 1
    let minY = 1
    let maxX = 0
    let maxY = 0
    for (const [x, y] of effective) {
      if (x < minX) minX = x
      if (y < minY) minY = y
      if (x > maxX) maxX = x
      if (y > maxY) maxY = y
    }
    const padX = Math.max(0.02, (maxX - minX) * 0.08)
    const padY = Math.max(0.02, (maxY - minY) * 0.08)
    // 用 0–1000 的整数空间做 viewBox,路径精度足够且体积小
    const S = 1000
    const d =
      effective
        .map(([x, y], i) => {
          // 镜像:与主画面(镜像摄像头)方向一致
          const px = Math.round((1 - x) * S)
          const py = Math.round(y * S)
          return `${i === 0 ? 'M' : 'L'}${px} ${py}`
        })
        .join(' ') + ' Z'
    return {
      d,
      viewBox: `${Math.max(0, (minX - padX) * S)} ${Math.max(0, (minY - padY) * S)} ${Math.min(
        S,
        (maxX - minX + padX * 2) * S,
      )} ${Math.min(S, (maxY - minY + padY * 2) * S)}`,
    }
  }, [pts, body])

  if (!geom) {
    return body ? (
      <SkeletonFigure body={body} width={width} height={height} color={color} className={className} />
    ) : null
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={geom.viewBox}
      className={className}
      aria-hidden="true"
    >
      <path
        d={geom.d}
        fill={color}
        stroke={color}
        strokeWidth={14}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}
