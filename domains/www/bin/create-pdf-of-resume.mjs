import { exec } from "node:child_process";
import { request } from "node:http";
import { chromium } from "playwright";

const HOSTNAME = "localhost";
const PORT = 3000;

function waitFor(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function isServerReady() {
  return new Promise((resolve) => {
    const req = request({ port: PORT, hostname: HOSTNAME, path: "/" }, (res) => {
      resolve(true);
    });
    req.on("error", (err) => resolve(false));
    req.end();
  });
}

async function startServer() {
  const serverProcess = exec("pnpm exec astro preview");
  const kill = () => {
    console.log("Killing the server");
    serverProcess.kill();
  };

  let attempts = 1;
  console.log(`Waiting for server ${attempts}`);
  let isReady = await isServerReady();
  while (!isReady && attempts < 61) {
    await waitFor(500);
    attempts++;
    console.log(`Waiting for server ${attempts}`);
    isReady = await isServerReady();
  }

  if (!isReady) {
    kill();
    throw new Error("Gave up waiting for server");
  }

  return kill;
}

async function capture() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log("Navigating to resume");
  await Promise.all([
    page.waitForFunction(() => {
      // We take this to mean that all our effects have ran and we're ready to snap a pic.
      const antispamElement = window.document.getElementById("anti-spam-heading");
      return antispamElement?.textContent.includes("eric");
    }),
    page.goto(`http://${HOSTNAME}:${PORT}/about/resume/`, {
      waitUntil: "networkidle",
    }),
  ]);

  console.log("Creating PDF");
  await page.pdf({
    path: "src/profession/resume/print.pdf",
    printBackground: true,
    pageRanges: "1",
  });

  console.log("Closing browser");
  return browser.close();
}

async function startServerAndCapture() {
  const kill = await startServer();
  try {
    await capture();
  } finally {
    kill();
  }
}

async function main() {
  let exitCode = 0;
  try {
    await startServerAndCapture();
  } catch (err) {
    console.error(err);
    exitCode = 1;
  }
  process.exit(exitCode);
}

main();
