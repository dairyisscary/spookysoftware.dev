import ResumePdf from "virtual:pdf-resume";

import { SUBGRID_SECTION_CX } from "#/page/layout/resume";
import { computeYearsExperience } from "#/profession";
import Avatar from "#/profession/resume/avatar.png";
import { H1, H2 } from "#/profession/resume/hierarchy";
import { encodedEmail } from "#/site/meta";
import { absoluteUrl, paths } from "#/site/navigation";

function Headshot() {
  return (
    <div class="relative grid items-end justify-center">
      <img alt="Headshot of Eric" class="rounded-t-full" src={Avatar} />
      <div class="sps-pile absolute -top-8 -right-3/4 hidden w-full place-items-center md:grid">
        <p class="text-center font-mono text-lg print:text-base">Software Engineer</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1240 600"
          aria-hidden="true"
          class="pointer-events-none -rotate-8"
        >
          <path
            d="M460.3 531c-106.7-3.3-217.2-12.7-315.6-56.5C88 448.7 32.7 394.4 37 327.8c3.2-36 29-64 53.5-88.3C191.8 144.2 332.1 108 465.9 86.2c164-25.2 332-22.5 495.8 2.7 15.7.9 175 34.4 136.2 49.7 73.3 30.4 139 103 86.1 181.7-32.6 46.3-85.7 73.2-135.4 97.6C963 457 870.8 479.5 779 498.6c-104.8 21.1-211.5 35-318.5 32.5Zm28.5-16.5c155.2 2.7 623.7-69.6 687.7-223.9 28.8-82.1-66-134.7-132.5-153a1727.2 1727.2 0 0 0-139-33.7c-6.6-1.8-18.7-1-17.8-10.6-216.3-22.4-493-11.6-689 89.6-56.6 31.2-163.8 103-138.7 178.2 13.4 45.7 52 79.2 94 98.8 105 45.6 222.2 53.2 335.3 54.6Z"
            class="fill-sps-bg-dark"
          />
        </svg>
      </div>
    </div>
  );
}

export function Header() {
  const years = computeYearsExperience();
  return (
    <header class={SUBGRID_SECTION_CX}>
      <div class="mt-auto">
        <H1 class="mb-2 md:mb-8 md:text-right print:mb-4">
          Eric <span class="block">Kim-Butler</span>
        </H1>
        <p class="mb-8 font-mono md:hidden">Software Engineer</p>
        <p class="print:text-sma text-justify font-serif">
          I have {years.professionalYearsExperience}+ years of professional experience working at
          startup-staged, software companies. I have a deep drive to create quality software that
          empowers its users and creators alike. I also have passion for sharing, pedagogy, and
          inclusivity.
        </p>
      </div>
      <Headshot />
      <div class="mt-auto space-y-8 text-sm">
        <H2 class="sr-only">Details</H2>
        <dl
          class="grid gap-x-8 gap-y-2 md:text-sm print:gap-x-4"
          style={{ "grid-template-columns": "min-content minmax(0, 1fr)" }}
        >
          <dt>Email</dt>
          <dd innerHTML={`<a href="${encodedEmail(true)}">mailto</a>`} />

          <dt>Web</dt>
          <dd>
            <a href={absoluteUrl(paths())}>spookysoftware.dev</a>
          </dd>

          <dt>GitHub</dt>
          <dd>
            <a href="https://github.com/dairyisscary">@dairyisscary</a>
          </dd>

          <dt>Location</dt>
          <dd>Philadelphia, USA</dd>

          <dt>Education</dt>
          <dd>
            Wilkes University
            <br />
            BS comp sci, philosophy
          </dd>

          <dt class="print:hidden">PDF</dt>
          <dd class="print:hidden">
            <a download="Eric Kim-Butler's Résumé.pdf" href={ResumePdf}>
              Download
            </a>
          </dd>
        </dl>
      </div>
    </header>
  );
}
