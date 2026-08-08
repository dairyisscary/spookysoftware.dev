import type { JSX } from "@solidjs/web";

import { SUBGRID_SECTION_CX } from "#/page/layout/resume";
import { H2 } from "#/profession/resume/hierarchy";
import { NewTabLink } from "#/site/navigation";

function AsideSection(props: { children: JSX.Element; title: string }) {
  return (
    <section class="space-y-4">
      <H2>{props.title}</H2>
      <div aria-hidden="true" class="sps-rainbow h-1 border border-sps-bg-dark" />
      {props.children}
    </section>
  );
}

function Skill(props: { title: string; subSkills: string[] }) {
  return (
    <li>
      <h3 class="text-sps-fg-dark">{props.title}</h3>
      <span class="font-serif">{props.subSkills.join(", ")}</span>
    </li>
  );
}

function Skills() {
  return (
    <AsideSection title="Skills">
      <ul class="space-y-4">
        <Skill
          title="Web"
          subSkills={["HTML", "CSS", "React", "Solid", "A11y", "TypeScript", "Elixir"]}
        />
        <Skill title="DevOps" subSkills={["nix", "linux", "CI/CD", "Observability", "AWS"]} />
        <Skill title="Systems" subSkills={["Rust", "Zig"]} />
      </ul>
    </AsideSection>
  );
}

function ProjectItem(props: { href: string; title: string; description: string }) {
  return (
    <li>
      <h3>
        <NewTabLink href={props.href}>{props.title}</NewTabLink>
      </h3>
      <span class="font-serif">{props.description}</span>
    </li>
  );
}

function Projects() {
  return (
    <AsideSection title="Open Source">
      <ul class="space-y-4">
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
      </ul>
    </AsideSection>
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
      <p class="col-span-2 font-serif not-last:mb-4">{props.children}</p>
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
              I work for a on the monetization, user experimentation, and growth engineering team
              for a sales CMS product.
            </WorkExperienceItem>

            <WorkExperienceItem
              titles={["Founding Software Engineer"]}
              organization="Twelve AI"
              from={2024}
              to={2025}
            >
              I helped a dental practice management software company build an initial product and
              aquire our first customers. I contributed to the product's core features like clinical
              charting, xray capture, insurance estimation, and patient education and communication.
            </WorkExperienceItem>
            <WorkExperienceItem
              titles={["Staff Software Engineer", "Software Engineer"]}
              organization="Proof, Inc."
              from={2017}
              to={2024}
            >
              I worked as a lead product engineer an online notarization web app. I mentored,
              taught, conducted peer review, and drove modern engineering practices for a team of
              50+ engineers. I also managed tooling and handled our automated pipelines and
              deployments. I helped to establish our on-call rotation and processes.
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
          <div class="sps-temperature w-1 border border-sps-bg-dark" aria-hidden="true" />
        </div>
      </section>
    </main>
  );
}
