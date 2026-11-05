// Runs the website checks in headless Chromium. Used by .github/workflows/pages.yml before deploying.
// Local use (needs Node 20+): npm install --no-save playwright@1.48.2 && npx playwright install chromium && node tests/web/run.mjs
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { chromium } from "playwright";

const here = path.dirname(fileURLToPath(import.meta.url));
const site = path.resolve(here, "../../docs");
const port = 8790;
const server = spawn("python3", ["-m", "http.server", String(port), "--bind", "127.0.0.1", "--directory", site], { stdio: "ignore" });
const stop = () => { try { server.kill(); } catch (_) {} };

let code = 1;
try {
  await new Promise((r) => setTimeout(r, 1200));
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: "load" });
  await page.waitForTimeout(1500);
  await page.addScriptTag({ path: path.join(here, "checks.js") });
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
