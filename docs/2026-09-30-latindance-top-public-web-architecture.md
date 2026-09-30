# 2026-09-30 · latindance.top Public Web 架构与新版视觉基线

> 状态：ACTIVE  
> Owner：LATINOS  
> Cross-repo coordination：EOMZON/product-hub#193  
> Learning runtime：EOMZON/latinDance

## 1. 角色

LATINOS 是 Latin Dance 的 Public Web / Discovery / SEO / Brand shell：
- 首页
- 五舞种 topic hubs
- Body Force public entry
- Tools
- Daily
- Blog / knowledge
- Google Ads landing pages

latinDance 是独立 Learning Runtime：
- classes
- progress
- after-class capture
- Feishu ChatOps
- user state

目标域：
`latindance.top` → LATINOS  
`learn.latindance.top` → latinDance

旧：
`latindance.zondev.top` → 迁移期间继续服务，并做一对一 301。

## 2. URL IA

主域使用 subdirectory 集中 public SEO authority：

```
/
├── rumba/
├── cha-cha/
├── samba/
├── jive/
├── paso-doble/
├── force/
├── tools/
├── daily/
└── blog/
```

不要为每个舞种、blog、daily 都建立独立 subdomain。只有需要独立 runtime/deployment boundary 时才使用 subdomain。

## 3. 首页

首页不是单纯公司/品牌介绍页，而是：
- brand cover
- public learning discovery
- Body Force visual entry
- five-dance entry
- high-intent landing entry

Hero 原则：
- 一个强视觉中心
- 清晰中文价值说明
- CTA：开始学习 / 选择舞种 / 体验 Force
- 高意图广告应进入对应 landing page，而非全部进入首页

## 4. 历史视觉基线

2026-09-14：
早期设计探索，偏 warm/off-white + muted green；仅作为历史研究。

2026-09-17：
正式选定的 Body Force Visual DNA，作为新版主站视觉上游：

https://github.com/EOMZON/latinDance/blob/codex/body-force-visual-system-v2-20260917/docs/design/visual-system/visual-dna-reference.md

Prompt：
https://github.com/EOMZON/latinDance/blob/codex/body-force-visual-system-v2-20260917/docs/design/visual-system/asset-prompt-guideline.md

视觉：
- warm ivory / bone white
- charcoal / near-black sculptural single-person body
- translucent lavender-violet force ribbon
- pressure node / axis / rotation arc / geometric markers
- editorial / museum movement-study
- restrained serif headline + sans labels
- whitespace / fine-grid / technical caption
- approximately 80% real HTML/CSS/SVG/UI + 20% body/raster asset

**禁止**把它简化成“紫色网站”。紫色属于 Force Language，品牌底色仍以 warm ivory + graphite/charcoal 为主。

## 5. 数据 / UI 分层

```
Canonical Product Data
→ Visual Asset Ledger
→ mode-aware Selector
→ ViewModel / Projection
→ Reusable Component
→ Page
```

页面不得保存业务 truth、pose truth、第三方 source 细节或 raw asset path。

## 6. 五舞种

五舞种在 Public Web 作为 stable topic hubs：

- Rumba / 伦巴
- Cha-cha / 恰恰
- Samba / 桑巴
- Jive / 牛仔
- Paso Doble / 斗牛舞

共享同一视觉语法；差异来自真实 pose、supporting side、foot placement、force path、timing character，不靠简单换颜色。

对应 production visual upstream：
https://github.com/EOMZON/latinDance/issues/25

共享 Body Base / Force Kit：
https://github.com/EOMZON/latinDance/issues/30

## 7. 发布与迁移

P0：
1. 新域 Vercel project + custom domains
2. metadata / OG / canonical / sitemap / robots
3. analytics
4. 五舞种 topic hubs
5. homepage
6. 与 `learn.latindance.top` 建立正式链接关系
7. 旧域一对一 301 mapping

迁移期间不得先删旧 DNS / production route。

## 8. Cross-repo boundary

LATINOS 可以读取 canonical contract，但不要直接复制 latinDance 学习 runtime 数据。

共享建议：
- dance taxonomy
- content IDs
- URL contract
- analytics event names
- design tokens

不共享：
- user state
- Feishu credentials
- private learning runtime implementation

## 9. 并行 / writer policy

云端可并行：
- Public Web IA
- SEO/landing contract
- design tokens
- content schema
- analytics contract
- docs/issues

本机 single writer：
- actual body/raster assets
- visual ledger
- shared runtime components
- screenshots/performance/exact-SHA verification

## 10. 当前 cross-repo coordination

主协调 issue：
https://github.com/EOMZON/product-hub/issues/193

latinDance TODO：
https://github.com/EOMZON/latinDance/blob/main/docs/handoff/2026-09-30-latindance-top-domain-visual-migration-todolist.md

历史 Visual DNA：
https://github.com/EOMZON/latinDance/blob/codex/body-force-visual-system-v2-20260917/docs/design/visual-system/visual-dna-reference.md
