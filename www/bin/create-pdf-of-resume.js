const { exec } = require("child_process");
const { request } = require("http");
const { chromium } = require("playwright");

const HOSTNAME = "localhost";
const PORT = 9000;

function waitFor(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function isServerReady() {
  return new Promise((resolve) => {
    const req = request(
      { port: PORT, hostname: HOSTNAME, path: "/" },
      (res) => {
        resolve(true);
      },
    );
    req.on("error", (err) => resolve(false));
    req.end();
  });
}

async function startServer() {
  const serverProcess = exec("yarn run serve");
  let attempts = 1;
  console.log(`Waiting for server ${attempts}`);
  let isReady = await isServerReady();
  while (!isReady && attempts < 61) {
    await waitFor(500);
    attempts++;
    console.log(`Waiting for server ${attempts}`);
    isReady = await isServerReady();
  }

  const kill = () => {
    console.log("Killing the server");
    serverProcess.kill();
  };

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
      const antispamElement = window.document.querySelector(
        "*[data-testid='anti-spam-heading']",
      );
      return antispamElement?.textContent.includes("eric");
    }),
    page.goto(`http://${HOSTNAME}:${PORT}/about/resume/`, {
      waitUntil: "networkidle",
    }),
  ]);

  console.log("Creating PDF");
  await page.pdf({
    path: "src/pdfs/resume.pdf",
    printBackground: true,
    pageRanges: "1",
  });

  console.log("Closing browser");
  return browser.close();
}

async function main() {
  const kill = await startServer();
  try {
    await capture();
  } finally {
    kill();
  }
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
