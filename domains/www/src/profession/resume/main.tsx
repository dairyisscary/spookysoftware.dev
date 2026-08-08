import type { JSX } from "@solidjs/web";

import { SUBGRID_SECTION_CX } from "#/page/layout/resume";
import { H2 } from "#/profession/resume/hierarchy";

function AsideList(props: { children: JSX.Element; title: string }) {
  return (
    <section class="space-y-4 print:space-y-2">
      <H2>{props.title}</H2>
      <div
        aria-hidden="true"
        class="sps-rainbow h-1 border border-sps-bg-dark print:rounded-sm print:border-0"
      />
      <ul class="mt-4 space-y-4">{props.children}</ul>
    </section>
  );
}

function Skill(props: { title: string; subSkills: string[] }) {
  return (
    <li>
      <h3 class="text-sps-fg-dark">{props.title}</h3>
      <span class="font-serif text-base/[1.5]">{props.subSkills.join(", ")}</span>
    </li>
  );
}

function Skills() {
  return (
    <AsideList title="Skills">
      <Skill
        title="Web"
        subSkills={["HTML", "CSS", "React", "Solid", "A11y", "TypeScript", "Elixir"]}
      />
      <Skill title="DevOps" subSkills={["nix", "linux", "CI/CD", "Observability", "AWS"]} />
      <Skill title="Systems" subSkills={["Rust", "Zig"]} />
    </AsideList>
  );
}

function ProjectItem(props: { href: string; title: string; description: string }) {
  return (
    <li>
      <h3>
        <a target="_blank" href={props.href}>
          {props.title}
        </a>
      </h3>
      <span class="font-serif text-base/[1.5]">{props.description}</span>
    </li>
  );
}

function Projects() {
  return (
    <AsideList title="Open Source">
      <ProjectItem
        href="https://github.com/notarize/qlc"
        title="QLC"
        description="a Rust-based tool for compiling type definitions from GraphQL"
      />
      <ProjectItem
        href="https://solid-a11y.spookysoftware.dev/"
        title="solid-a11y"
        description="fully-accessible, unstyled component library for SolidJS"
      />
      <ProjectItem
        href="https://github.com/dairyisscary/lame-wasm"
        title="lame-wasm"
        description="WASM-compiled library for encoding MP3s in the browser"
      />
    </AsideList>
  );
}

function WorkExperienceItem(props: {
  children: JSX.Element;
  titles: string[];
  organization: string;
  from: number;
  to: number | "now";
}) {
  const years = () => {
    if (props.to === "now") {
      return `Since ${props.from}`;
    }
    const diff = props.to - props.from;
    return `${diff} year${diff === 1 ? "" : "s"}`;
  };
  return (
    <>
      <div>
        <h3 class="font-serif text-xl font-semibold text-sps-fg-dark text-shadow-xs">
          {props.organization}
        </h3>
        <p class="text-sm italic">{props.titles.join(", ")}</p>
      </div>
      <p class="text-right text-sm text-sps-fg-dark">{years()}</p>
      <p class="col-span-2 font-serif text-lg/[1.5] not-last:mb-4 print:text-base/[1.3]">
        {props.children}
      </p>
    </>
  );
}

export function Main() {
  return (
    <main class={SUBGRID_SECTION_CX}>
      <div class="space-y-8">
        <Skills />
        <Projects />
      </div>
      <section class="col-span-2 space-y-4">
        <H2>Work Experience</H2>
        <div class="grid gap-4" style={{ "grid-template-columns": "auto auto" }}>
          <div
            class="grid items-center gap-4 print:gap-2"
            style={{ "grid-template-columns": "minmax(0, 1fr) max-content" }}
          >
            <WorkExperienceItem
              titles={["Senior Software Engineer"]}
              organization="Close"
              from={2025}
              to="now"
            >
              I work on the monetization, user experimentation, and growth engineering team for a
              sales content management system company.
            </WorkExperienceItem>

            <WorkExperienceItem
              titles={["Founding Software Engineer"]}
              organization="Twelve AI"
              from={2024}
              to={2025}
            >
              I helped a dental practice management software company build an initial product and
              aquire the first customers. I contributed to the product's core features like clinical
              charting, xray capture, insurance estimation, and patient education and communication.
            </WorkExperienceItem>
            <WorkExperienceItem
              titles={["Staff Software Engineer", "Software Engineer"]}
              organization="Proof, Inc."
              from={2017}
              to={2024}
            >
              I worked as a lead product engineer on an online notarization web app. I mentored a
              team of 50+ engineers and drove modern architecture. I also managed tooling and
              handled our automated pipelines and deployments. I helped to establish our on-call
              rotation and processes.
            </WorkExperienceItem>
            <WorkExperienceItem
              titles={["Software Engineer"]}
              organization="Shoobx, Inc."
              from={2013}
              to={2017}
            >
              I conducted full-stack product development for a web-based corporate governance legal
              platform. Some projects I contributed to include multi-participant workflows for
              fundraising, equity management, HR, and board-member and stockholder relations. I led
              the design and development of a declarative form library for automatically generated
              and reusable HTML.
            </WorkExperienceItem>
          </div>
          <div
            class="sps-temperature w-1 border border-sps-bg-dark print:rounded-sm print:border-0"
            aria-hidden="true"
          />
        </div>
      </section>
    </main>
  );
}
