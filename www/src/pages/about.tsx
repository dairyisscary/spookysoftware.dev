import React from "react";

import Layout from "@/components/layout";
import NewTabLink from "@/components/new-tab-link";
import PageTitle from "@/components/page/title";
import PageContent from "@/components/page/content";

const FUCHSIA = "#FC3F93";

function About() {
  const thisYear = new Date().getFullYear();
  const yearsSince2007 = thisYear - 2007;
  const yearsSince2014 = thisYear - 2014;
  return (
    <Layout title="About">
      <PageTitle>About</PageTitle>
      <PageContent>
        <p>
          Circa 2007, I stumbled upon the great wasteland known as{" "}
          <NewTabLink href="https://myspace.com/">MySpace.com</NewTabLink>. I
          wrote my first lines of CSS trying to make the background of my
          profile a baller shade of{" "}
          <span title={FUCHSIA} style={{ color: FUCHSIA }}>
            Fuchsia
          </span>
          . As an adult, card-carrying Software Engineer {yearsSince2007} years
          later, I'm still trying to get that same high.
        </p>
        <p>
          I have worked for the last {yearsSince2014} years at a few web-SaaS{" "}
          <NewTabLink href="https://www.shoobx.com/">software</NewTabLink>{" "}
          <NewTabLink href="https://www.notarize.com/">startups</NewTabLink>{" "}
          writing code that only just barely makes the thing work. In my
          defense, isn’t that really what engineering is -- making the cheapest
          solution that still works?
        </p>
        <p>
          These days I have been thinking more about educational content for the
          working practitioner and what it means to be an engineer today.
          Hopefully this blog gives me a chance to occasionally dust off my
          Philosophy degree and share some hard-earned lessons from my
          experience in the industry.
        </p>
        <h3>Projects</h3>
        <ul>
          <li>
            <a href="https://github.com/notarize/qlc">QLC</a> (A GraphQL Code
            Generation Tool)
          </li>
          <li>
            <a href="https://www.youtube.com/playlist?list=PLEsBiOG9ZllOuN6RoDH8DAtbMVuzPDwyb">
              For Your Reference Video Series
            </a>{" "}
            (Rust Beginner Tutorial)
          </li>
          <li>
            <a href="https://github.com/dairyisscary/spookysoftware.dev">
              This Website's Source Code
            </a>
          </li>
        </ul>
      </PageContent>
    </Layout>
  );
}

export default About;
