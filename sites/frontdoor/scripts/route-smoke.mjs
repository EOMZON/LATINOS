const baseUrl = process.env.FRONTDOOR_BASE_URL || "http://localhost:3000";

const checks = [
  { path: "/", title: "把拉丁学习，做成一张能走进去的地图。" },
  { path: "/force", title: "看懂力量从哪里开始" },
  { path: "/legacy", title: "现有 live 站点，不推倒，先保留" },
  { path: "/daily-latin", title: "把今天这一轮压成最小入口" },
  { path: "/dance-os", title: "从练习过程里长出工具，不从空白产品名开始" },
  { path: "/tools", title: "飞书、规范、部署入口都在这里" },
  { path: "/roadmap", title: "先定义两个 demo，再决定 preview 与域名" },
  { path: "/dashboard", title: "辅助承接层已收齐，接下来先定义两个 demo" },
  { path: "/about", title: "这不是只做一个网站，而是在搭 Latin Dance OS" },
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function verifyRoute({ path, title }) {
  const url = `${baseUrl}${path}`;
  const response = await fetch(url);

  assert(response.ok, `${path} returned HTTP ${response.status}`);

  const html = await response.text();

  assert(html.includes(title), `${path} is missing expected heading: ${title}`);

  return { path, status: response.status, title };
}

const results = [];

for (const check of checks) {
  results.push(await verifyRoute(check));
}

console.log(JSON.stringify({ baseUrl, verified: results }, null, 2));
