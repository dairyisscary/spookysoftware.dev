import { chromium } from "playwright";

async function capture() {
  const { BASE_SERVER_URL, RESUME_PDF_FILE } = process.env;
  if (!BASE_SERVER_URL || !RESUME_PDF_FILE) {
    throw new Error(
      `Missing required env vars, server url: ${BASE_SERVER_URL}, pdf file path: ${RESUME_PDF_FILE}`,
    );
  }

  const browser = await chromium.launch({
    args: ["--disable-gpu", "--disable-dev-shm-usage"],
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log("Navigating to resume");
  await page.goto(`${BASE_SERVER_URL}/about/resume`, { waitUntil: "load" });
  const loadedTexts = await page.getByText("Software Engineer").allTextContents();
  if (!loadedTexts.length) {
    throw new Error("Expected some text to have loaded");
  }

  console.log("Creating PDF");
  await page.pdf({
    path: RESUME_PDF_FILE,
    printBackground: true,
    pageRanges: "1",
  });

  console.log("Closing browser");
  return browser.close();
}

async function main() {
  try {
    await capture();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
