import { spawn } from "node:child_process";
import { once } from "node:events";
import { setTimeout as delay } from "node:timers/promises";

const port = process.env.FRONTDOOR_SMOKE_PORT || "3101";
const baseUrl = `http://127.0.0.1:${port}`;
const cwd = process.cwd();

function killProcess(child) {
  if (!child.killed) {
    child.kill("SIGTERM");
  }
}

async function waitForServer(url, child) {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (child.exitCode != null) {
      throw new Error(`next start exited early with code ${child.exitCode}`);
    }

    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {}

    await delay(500);
  }

  throw new Error(`Timed out waiting for ${url}`);
}

async function run() {
  const start = spawn(
    "pnpm",
    ["exec", "next", "start", "--hostname", "127.0.0.1", "--port", port],
    {
      cwd,
      env: process.env,
      stdio: "inherit",
    },
  );

  try {
    await waitForServer(baseUrl, start);

    const routeSmoke = spawn(process.execPath, ["./scripts/route-smoke.mjs"], {
      cwd,
      env: {
        ...process.env,
        FRONTDOOR_BASE_URL: baseUrl,
      },
      stdio: "inherit",
    });

    const [routeCode] = await once(routeSmoke, "exit");

    if (routeCode !== 0) {
      throw new Error(`route smoke failed with exit code ${routeCode}`);
    }

    const structureSmoke = spawn(process.execPath, ["./scripts/structure-smoke.mjs"], {
      cwd,
      env: {
        ...process.env,
        FRONTDOOR_BASE_URL: baseUrl,
      },
      stdio: "inherit",
    });

    const [structureCode] = await once(structureSmoke, "exit");

    if (structureCode !== 0) {
      throw new Error(`structure smoke failed with exit code ${structureCode}`);
    }

    const browserSmoke = spawn("python3", ["./scripts/browser-smoke.py"], {
      cwd,
      env: {
        ...process.env,
        FRONTDOOR_BASE_URL: baseUrl,
      },
      stdio: "inherit",
    });

    const [browserCode] = await once(browserSmoke, "exit");

    if (browserCode !== 0) {
      throw new Error(`browser smoke failed with exit code ${browserCode}`);
    }
  } finally {
    killProcess(start);
    await once(start, "exit").catch(() => {});
  }
}

await run();
