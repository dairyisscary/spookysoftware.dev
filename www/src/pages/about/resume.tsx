import { useEffect, useState, type ReactNode } from "react";
import { Helmet } from "react-helmet";

import { Skill } from "@/components/resume/skills";
import { Projects, Project } from "@/components/resume/projects";
import {
  Roles,
  Role,
  RoleTitle,
  RoleDescription,
} from "@/components/resume/work-experience";
import { classnames } from "@/util/style";
import { computeYearsExperiance } from "@/util/profession";
import Avatar from "@/images/avatar.png";
import PDFResume from "@/pdfs/resume.pdf";

import { bodyOverride, clamped } from "./resume.module.scss";

function Icon({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classnames(className, "text-resume-highlight inline")}
      focusable="false"
      viewBox="0 0 448 512"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"
      />
    </svg>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-semibold text-3xl mb-3 print:mb-1.5 print:text-xl">
      {children}
      <Icon className="ml-2 mb-1 w-8 h-8 print:w-5 print:h-5" />
    </h2>
  );
}

function HeadingItem(props: {
  title: ReactNode;
  children: ReactNode;
  href: string;
  "data-testid"?: string;
}) {
  return (
    <li data-testid={props["data-testid"]}>
      <strong>{props.title}:</strong> <a href={props.href}>{props.children}</a>
    </li>
  );
}

function AntiSpamEmailHeadingItem() {
  const [email, setEmail] = useState("antispam@email.com");
  useEffect(() => {
    setEmail("eric@kimbutler.xyz");
  }, []);
  return (
    <HeadingItem
      data-testid="anti-spam-heading"
      title="Email"
      href={`mailto:${email}`}
    >
      {email}
    </HeadingItem>
  );
}

function Resume() {
  const now = new Date().toISOString();
  const timeIndex = now.indexOf("T");
  const years = computeYearsExperiance();
  useEffect(() => {
    document.body.classList.add(bodyOverride);
    return () => document.body.classList.remove(bodyOverride);
  }, []);
  return (
    <>
      <Helmet title="Eric Kim-Butler's Résumé" />
      <header className="flex gap-6 print:gap-3 flex-col pt-5">
        <div className={classnames(clamped, "flex gap-6")}>
          <img
            className="w-32 h-32 md:w-40 md:h-40 print:w-24 print:h-24 print:md:w-24 print:md:h-24 rounded-lg"
            src={Avatar}
            alt="Resume avatar photo of Eric"
          />
          <div>
            <h1 className="text-3xl md:text-5xl print:text-4xl print:md:text-4xl text-resume-highlight mb-1">
              Eric{" "}
              <span className="block font-semibold print:inline">
                Kim-Butler
              </span>
            </h1>
            <p>
              Software Engineer{" "}
              <span className="block md:inline print:inline pt-1 md:pt-0 print:pt-0 md:pl-1 print:pl-1 italic text-sm text-resume-secondary">
                Amsterdam, The Netherlands
              </span>
            </p>
            <p className="absolute md:static md:mt-1 top-0 right-0 py-1 px-2 md:px-0 rounded-bl md:rounded-none bg-resume-context md:bg-inherit text-sm print:hidden">
              <a download href={PDFResume}>
                <span className="md:hidden">PDF</span>
                <span className="hidden md:inline">Download PDF Version</span>
              </a>
            </p>
            <p className="hidden print:inline text-xs mt-1">
              <span className="text-sm">*</span> This PDF was automatically
              generated from an{" "}
              <a href="https://www.spookysoftware.dev/about/resume/">
                online version
              </a>
              {` on ${now.slice(0, timeIndex)}.`}
            </p>
          </div>
        </div>
        <div className="bg-resume-context py-3 border-y border-resume-context-accent">
          <ul
            className={classnames(
              clamped,
              "flex flex-wrap sm:flex-nowrap text-sm gap-4 md:text-base print:md:text-sm text-center items-center justify-between",
            )}
          >
            <li className="hidden print:inline md:block">
              <Icon className="w-5 h-5" />
            </li>
            <AntiSpamEmailHeadingItem />
            <HeadingItem title="Web" href="https://www.spookysoftware.dev/">
              www.spookysoftware.dev
            </HeadingItem>
            <HeadingItem title="GitHub" href="https://github.com/dairyisscary">
              dairyisscary
            </HeadingItem>
            <li className="hidden print:inline md:block">
              <Icon className="w-5 h-5 rotate-180" />
            </li>
          </ul>
        </div>
      </header>
      <main
        className={classnames(
          clamped,
          "grid gap-9 lg:gap-7 print:gap-6 print:gap-y-4 md:grid-cols-2 lg:grid-cols-3 print:md:grid-cols-3 print:grid-cols-3 py-9 lg:py-7 print:py-5",
        )}
      >
        <section className="lg:col-span-full print:col-span-full">
          <SectionTitle>The Gist</SectionTitle>
          <p className="print:text-xs">
            I am a remote engineer with {years.professionalYearsExperience}+
            years of professional experience working on web technologies, mostly
            at startup-sized companies. I have a deep drive to create quality
            software that empowers its users. I also have a passion for DEI and
            have worked to make technology a more welcoming place for all.
          </p>
        </section>
        <section>
          <SectionTitle>Skills</SectionTitle>
          <ul>
            <Skill title="JavaScript &amp; TypeScript" value={0.9} />
            <Skill title="Accessibility" value={0.65} />
            <Skill title="React" value={1} />
            <Skill title="HTML &amp; CSS" value={0.8} />
            <Skill title="Sysadmin &amp; DevOps" value={0.75} />
            <Skill title="Elixir" value={0.7} />
            <Skill title="Python" value={0.6} />
            <Skill title="PostgreSQL" value={0.4} />
          </ul>
        </section>
        <section className="md:col-span-2 print:col-span-2 lg:row-span-3 print:row-span-3 flex flex-col p-5 md:p-7 print:p-5 print:md:p-5 rounded bg-resume-context">
          <SectionTitle>Work Experience</SectionTitle>
          <Roles>
            <Role>
              <RoleTitle
                start={2017}
                location={
                  <>
                    Boston, MA (Remote
                    <span className="hidden md:inline"> from Amsterdam</span>)
                  </>
                }
                organization="Notarize, Inc."
              >
                Staff Software Engineer
              </RoleTitle>
              <RoleDescription>
                I am a lead product engineer for the web client architecture on
                a team of 25+ engineers. I mentor, teach, conduct peer review,
                and drive modern engineering practices. I also manage much of
                the tooling (Webpack, Jest, Babel, etc.) and our DevOps
                automated processes and pipelines. I helped to establish our
                engineering support and on-call processes.
              </RoleDescription>
              <RoleDescription>
                As an individual contributor, I also write, design, and maintain
                many vertical, customer-facing features (TypeScript, GraphQL,
                React). Some notable features include our WebRTC audio and video
                calling, real-time PDF collaboration and signing experience,
                automated credential analysis, fraud protection, and
                mission-critical legal audit trailing.
              </RoleDescription>
            </Role>
            <Role>
              <RoleTitle
                start={2013}
                end={2017}
                location="Boston, MA"
                organization="Shoobx, Inc."
              >
                Software Engineer
              </RoleTitle>
              <RoleDescription>
                I was primarily responsible for full-stack product features for
                a web-based corporate governance legal platform. Some projects I
                contributed to include multi-participant workflows for
                fundraising, equity management, HR, and board-member and
                stockholder relations (Python and Angular 1). I also
                co-developed a full end-to-end capitalization table and legal
                document data drive. I led the design and development of a
                declarative form library for automatically generated and
                reusable HTML.
              </RoleDescription>
            </Role>
          </Roles>
        </section>
        <section>
          <SectionTitle>Projects</SectionTitle>
          <Projects>
            <Project
              href="https://github.com/notarize/qlc"
              description="Fast, multi-threaded compiler for TypeScript definitions from GraphQL"
              technology="Rust"
            >
              QLC
            </Project>
            <Project
              href="https://www.youtube.com/channel/UCuRHr-1aqro-UWcz36hkdoQ"
              description="Personal channel promoting career growth, pedagogical content, and inclusivity in engineering"
            >
              YouTube: Spooky Software
            </Project>
            <Project
              description="Internal, Jira-like tool for project prioritization at Notarize"
              technology="React, Elixir"
            >
              Notarize on Ice
            </Project>
            <Project description="Jest, eslint, gatsby, RxJS, terraform">
              Other Open-Source
            </Project>
          </Projects>
        </section>
        <section>
          <SectionTitle>Education</SectionTitle>
          <h3 className="font-semibold text-lg print:text-base">
            Bachelors of Science
          </h3>
          <h4 className="mb-3 text-resume-secondary print:text-sm">
            Wilkes University | 2009-2013
          </h4>
          <p className="text-sm print:text-xs">
            <span className="font-semibold">Majors:</span> Computer Science and
            Philosophy
          </p>
          <p className="text-sm print:text-xs">
            <span className="font-semibold">Coursework:</span> Algorithms &amp;
            Datastructures, Operating Systems, Networking, and Ethics
          </p>
        </section>
      </main>
    </>
  );
}

export default Resume;
