# LATINOS

`LATINOS` 是新的拉丁主题母仓。

它不是旧站的替代品，也不是单一 demo 文件夹，而是之后这条线的：

- 规则层
- memory 层
- frontdoor 层
- demo 孵化层
- 旧资产承接层

## 当前定位

这个仓库服务的是一条长期主题：

`Latin Dance OS = Daily Latin IP + 拉丁成长网站 + Dance Tools / Demos`

当前已经确认的策略：

- `Feishu` 是唯一内容源，不再把 `Notion` 当成真实来源
- 旧站 `https://latindance.zondev.top/` 先保留，不直接推倒
- 新内容先在这个仓库里规范化，再决定如何挂到旧域名
- 这个仓库优先承担“新 frontdoor + 新 demo + 规则中控”

## 当前公开切片：Force Lab

现阶段不从“大而全知识库”继续铺页面，而是先把一个能力闭环做深：

`看懂从哪里发力 → 看见身体链 → 识别常见代偿 → 做一个短练习`

- 页面：`sites/frontdoor/app/force/`
- 公开内容：`sites/frontdoor/data/force.ts`
- 私有课堂来源索引：`data/force-source-index.json.local`（被 Git 忽略，不得公开）
- 贡献规则：[CONTRIBUTING.md](CONTRIBUTING.md)

舞者和老师可以通过 GitHub Issue 投稿，不需要会 Git；开发者可以 fork、建分支并提交 Pull Request。原始课堂转录、老师/学员身份和无权公开的媒体不进入公共仓库。

## 目录约定

- `AGENTS.md`
  - 未来 AI / agent 进入本目录后的必读规则
- `MEMORY.md`
  - 长期记忆，保存不该每次重新判断的结论
- `memory/`
  - 每日工作日志与临时上下文
- `docs/analysis/`
  - 深度分析、决策依据、best-minds 落盘
- `docs/standards/`
  - 目录规范、内容源规范、网站策略、agent 规则
- `docs/legacy/`
  - 对旧站与旧资产的映射，不直接混进新代码
- `data/feishu/`
  - 飞书来源索引、token、说明
- `sites/frontdoor/`
  - 新前台入口的本地静态骨架
- `apps/demos/`
  - 新 demo 的孵化位置

## 已知旧资产

- 线上旧站：`https://latindance.zondev.top/`
- 旧站源码：
  - `/Users/zon/Desktop/MINE/9_latin/apps/latinDance`
- 旧拉丁母体工作区：
  - `/Users/zon/Desktop/MINE/9_latin`

## 先做什么

1. 先读 `AGENTS.md`
2. 再读 `MEMORY.md`
3. 再读 `docs/standards/source-of-truth.md`
4. 再决定要改的是：
   - 规则
   - frontdoor
   - demo
   - 旧站承接

## 暂不做什么

- 不在没有明确要求时改动旧站生产源码
- 不把飞书里的想法随手落到无结构目录
- 不继续扩 `Notion` 相关工作流
- 不把 demo、正式站、归档内容混在同一层
- 不把私有 Minutes 或课堂原文直接开源
- 不把教学 cue、个人体感或摄像头推断包装成实时肌电或医学事实

## License

- 代码：MIT，见 [LICENSE](LICENSE)
- 项目原创公开内容：CC BY 4.0，适用边界见 [CONTENT-LICENSE.md](CONTENT-LICENSE.md)
- 第三方链接、名称、课堂材料、音频、图片和视频不因被提及而改变原有权利归属
