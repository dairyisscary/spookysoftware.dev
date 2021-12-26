import { Link } from "gatsby";

import Layout from "@/components/layout";
import NewTabLink from "@/components/new-tab-link";
import PageTitle from "@/components/page/title";
import PageContent from "@/components/page/content";
import { computeYearsExperiance } from "@/util/profession";

const FUCHSIA = "#FC3F93";

function About() {
  const years = computeYearsExperiance();
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
          . As an adult, card-carrying Software Engineer{" "}
          {years.casualYearsExperience} years later, I&#39;m still trying to get
          that same high.
        </p>
        <p>
          I have worked for the last {years.professionalYearsExperience} years
          at a few web-SaaS{" "}
          <NewTabLink href="https://www.shoobx.com/">software</NewTabLink>{" "}
          <NewTabLink href="https://www.notarize.com/">startups</NewTabLink>{" "}
          writing code that only just barely makes the thing work. In my
          defense, isn&#39;t that really what engineering is -- making the
          cheapest solution that still works? You can read my{" "}
          <Link to="/about/resume/">résumé</Link> online.
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
              This Website&#39;s Source Code
            </a>
          </li>
        </ul>
        <h3>About This Website&#39;s Technology</h3>
        <p>
          This website is designed to be fast and accessible, utilizing{" "}
          <a href="https://www.gatsbyjs.org">Gatsby</a>. You can always find the
          source code on{" "}
          <a href="https://github.com/dairyisscary/spookysoftware.dev">
            GitHub
          </a>
          . It uses privacy-conscious, cookie-free{" "}
          <a href="https://usefathom.com">analytics</a> that respect Do Not
          Track. Please consider whitelisting this website from your
          adblocker/DNT so that I can properly use this anonymous data to make
          better content.
        </p>
      </PageContent>
    </Layout>
  );
}

export default About;
