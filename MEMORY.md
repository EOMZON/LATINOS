# LATINOS Memory

## 项目身份

`LATINOS` 是拉丁主题的长期母仓。

它承接的是一个更大的方向，而不是单点网站：

`Latin Dance OS`

## 目标收束

从飞书内容判断，这条线的核心不是“做直播”或“做网站”。

真正目标是把以下三件事组织成一个长期系统：

1. `Daily Latin / Daily 直播 IP`
2. `拉丁成长网站 / 资产承接`
3. `Dance Tools / Dance OS / 产品化 demo`

## 当前确定的工作原则

- `Feishu` 是唯一 source of truth
- `Notion` 是遗留说法，之后默认替换为飞书对应内容
- 旧站 `latindance.zondev.top` 是现有公开 proof，先保留
- 新目录 `LATINOS` 先做：
  - 规则中控
  - 记忆中控
  - 新 frontdoor
  - demo 孵化
  - 旧资产映射

## 已知旧资产

- 旧站 live：
  - `https://latindance.zondev.top/`
- 旧站源码：
  - `/Users/zon/Desktop/MINE/9_latin/apps/latinDance`
- 旧拉丁母体：
  - `/Users/zon/Desktop/MINE/9_latin`

## 当前推荐的网站策略

短期：

- 不碰旧站生产入口
- 在 `LATINOS` 里做新的 frontdoor 和 demo 结构
- 用新入口把“旧版 proof / 新 demo / 新体系”并行展示

中期：

- 等新 frontdoor 足够稳，再考虑是否接到旧域名首页
- 旧站内容保留成 `legacy` 或 `v1` 入口

## 当前状态（2026-10-11 实测审计）

canonical 计划仍是 2026-09-30 口径：`docs/2026-09-30-latindance-top-public-web-architecture.md` + `product-hub#193`。
`latindance.top` = LATINOS Public Web（品牌/SEO/内容，主域 subdirectory）；`learn.latindance.top` = latinDance Learning Runtime；旧域做 old→new 301 后释放。

但实测发现执行层停摆 + 一处生产事故（详见 `docs/analysis/2026-10-11-latin-dance-os-progress-audit.md`）：

- `latindance.top` / `www` TLS 证书 2026-07-27 已过期，浏览器硬拦截
- apex 301 方向与设计相反（现在 new→old，应为 old→new）
- 线上跑的是 `latinDance` main 的「Roya拉丁舞 · Start Small」，本仓 frontdoor 未部署到任何 latindance.top 域
- 五舞种 topic hub（/rumba 等）全 404；`learn.latindance.top` 无 DNS/TLS
- LATINOS main 停在 `d3f2859`（09-30），PR #2 设计系统 DRAFT 11 天未合

**未来 agent 必读**：动手前先跑 `openssl s_client -connect latindance.top:443 -servername latindance.top | openssl x509 -noout -dates`
与 `curl -I https://latindance.top/`（不加 `-k`）确认线上状态，不要在"新站已上线"的错误假设上推进。

## 需要未来 agent 持续记住的事

- 用户不想再看到混乱目录
- 用户希望在一开始就把结构、规范、memory、规则立好
- 用户不想丢掉旧内容
- 用户也不想被旧结构绑死
- 用户希望未来 demo 和正式站能共存，但不要互相污染
