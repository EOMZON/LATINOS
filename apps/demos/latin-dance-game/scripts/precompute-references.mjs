#!/usr/bin/env node
/**
 * 离线预提取参考视频的姿态序列:
 *   1. 临时起 vite dev server(端口 5199)
 *   2. 用系统 Chrome(headless,puppeteer-core 驱动)打开 precompute.html
 *   3. 在浏览器里跑与线上一致的 MediaPipe 提取(lite 模型 + 中档平滑 + 2 帧采样)
 *   4. 把结果写到 public/references/<视频名>.poses.json
 * 运行:npm run precompute
 */
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer-core'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const refsDir = path.join(root, 'public', 'references')
const PORT = 5199
const CHROME_CANDIDATES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
]

const chromePath = CHROME_CANDIDATES.find((p) => fs.existsSync(p))
if (!chromePath) {
  console.error('找不到系统 Chrome / Chromium / Edge,无法离线提取。')
  process.exit(1)
}

const videos = fs.readdirSync(refsDir).filter((f) => /\.(mp4|mov|webm)$/i.test(f))
if (videos.length === 0) {
  console.log('public/references/ 下没有视频,无事可做。')
  process.exit(0)
}

console.log(`使用浏览器:${chromePath}`)
console.log(`待提取视频:${videos.join(', ')}`)

// ---- 起 vite dev server ----
const server = spawn(
  'npx',
  ['vite', '--port', String(PORT), '--strictPort', '--logLevel', 'warn'],
  { cwd: root, stdio: ['ignore', 'pipe', 'pipe'], detached: true },
)
server.stderr.on('data', (d) => process.stderr.write(d))

async function waitForServer() {
  for (let i = 0; i < 80; i++) {
    try {
      const r = await fetch(`http://localhost:${PORT}/precompute.html`)
      if (r.ok) return
    } catch {
      // 还没起来
    }
    await new Promise((r) => setTimeout(r, 500))
  }
  throw new Error('vite dev server 启动超时')
}

let browser = null
const cleanup = async () => {
  try {
    if (browser) await browser.close()
  } catch {}
  // detached 进程组:连 vite 子进程一起收掉
  try {
    if (server.pid) process.kill(-server.pid, 'SIGTERM')
  } catch {
    try {
      server.kill('SIGTERM')
    } catch {}
  }
}
process.on('SIGINT', async () => {
  await cleanup()
  process.exit(130)
})

try {
  await waitForServer()
  console.log(`dev server 已就绪(端口 ${PORT})`)

  browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--mute-audio', '--no-sandbox', '--disable-dev-shm-usage'],
  })

  let okCount = 0
  for (const video of videos) {
    const outName = video.replace(/\.[^.]+$/, '.poses.json')
    const outPath = path.join(refsDir, outName)
    const videoId = `references/${video}`
    console.log(`\n提取 ${video} …`)
    const t0 = Date.now()

    const page = await browser.newPage()
    try {
      await page.goto(`http://localhost:${PORT}/precompute.html`, { waitUntil: 'load' })
      await page.waitForFunction('window.__precomputeReady === true', { timeout: 120000 })
      const videoUrl = `http://localhost:${PORT}/references/${encodeURIComponent(video)}`
      const result = await page.evaluate(
        (u, id) => window.__runExtraction(u, id),
        videoUrl,
        videoId,
      )

      // 结构校验
      if (!result || result.format !== 1) throw new Error('返回格式不正确')
      if (!result.seqJson || !Array.isArray(result.seqJson.samples) || result.seqJson.samples.length < 5) {
        throw new Error('姿态序列不完整')
      }
      if (!Array.isArray(result.keyPoses) || result.keyPoses.length === 0) {
        throw new Error('没有提取到关键姿态')
      }
      if (!result.fingerprint || result.fingerprint.videoId !== videoId) {
        throw new Error('指纹缺失或视频不匹配')
      }

      fs.writeFileSync(outPath, JSON.stringify(result))
      const sizeKb = (fs.statSync(outPath).size / 1024).toFixed(0)
      const elapsed = ((Date.now() - t0) / 1000).toFixed(1)
      console.log(
        `  ✓ ${outName}  时长 ${result.meta.duration.toFixed(1)}s · ${result.meta.frames} 帧 · ` +
          `关键姿态 ${result.meta.keyPoseCount} 个 · ${sizeKb} KB · 耗时 ${elapsed}s`,
      )
      okCount += 1
    } finally {
      await page.close()
    }
  }
  console.log(`\n完成:${okCount}/${videos.length} 个参考已预提取。`)
} catch (e) {
  console.error('\n预提取失败:', e instanceof Error ? e.message : e)
  await cleanup()
  process.exit(1)
}

await cleanup()
process.exit(0)
