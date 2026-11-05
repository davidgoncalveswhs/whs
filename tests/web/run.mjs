// Runs the website checks in headless Chromium. Used by .github/workflows/pages.yml before deploying.
// Local use (needs Node 20+): npm install --no-save playwright@1.48.2 && npx playwright install chromium && node tests/web/run.mjs
import { spawn } from "node:child_process";
import { cpSync, mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { chromium } from "playwright";

const here = path.dirname(fileURLToPath(import.meta.url));
// Serve a temporary copy of docs/ with the checks next to it. The site's security policy blocks
// inline scripts, so the checks have to load as a same-origin file.
const site = mkdtempSync(path.join(os.tmpdir(), "whs-site-"));
cpSync(path.resolve(here, "../../docs"), site, { recursive: true });
cpSync(path.join(here, "checks.js"), path.join(site, "__whs-checks.js"));
const port = 8790;
const server = spawn("python3", ["-m", "http.server", String(port), "--bind", "127.0.0.1", "--directory", site], { stdio: "ignore" });
const stop = () => {
  try { server.kill(); } catch (_) {}
  try { rmSync(site, { recursive: true, force: true }); } catch (_) {}
};

let code = 1;
try {
  await new Promise((r) => setTimeout(r, 1200));
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: "load" });
  await page.waitForTimeout(1500);
  await page.addScriptTag({ url: "/__whs-checks.js" });
  const result = await page.evaluate(() => window.runWhsChecks());
  await browser.close();
  for (const name of result.failed) console.log("FAIL " + name);
  for (const message of pageErrors) console.log("PAGE ERROR " + message);
  console.log(`${result.passed} passed, ${result.failed.length} failed, ${pageErrors.length} page errors`);
  code = result.failed.length === 0 && pageErrors.length === 0 ? 0 : 1;
} catch (error) {
  console.log("Test run failed: " + (error && error.stack || error));
} finally {
  stop();
}
process.exit(code);
