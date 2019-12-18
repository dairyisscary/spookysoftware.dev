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
          <NewTabLink href="https://myspace.com/">MySpace</NewTabLink>. I wrote
          my first lines of CSS trying to make the background of my profile a
          baller shade of{" "}
          <span title={FUCHSIA} style={{ color: FUCHSIA }}>
            Fuchsia
          </span>
          . Needless to say, I blinked first, and {yearsSince2007} years later,
          I'm still trying to get that same high.
        </p>
        <p>
          Somewhere along the way, I studied Philosophy in college, which more
          than qualifies my disdain for your shitty startup. I still cannot
          bring myself to use the “it’s all Greek to me” joke because, well,
          most of the time it really <em>is</em> all Greek to me.
        </p>
        <p>
          I have worked for the last {yearsSince2014} years at a{" "}
          <NewTabLink href="https://www.shoobx.com/">few</NewTabLink> software{" "}
          <NewTabLink href="https://www.notarize.com/">startups</NewTabLink>{" "}
          writing code that only just barely makes the thing work. In my
          defense, isn’t that really what engineering is? Making the worst and
          cheapest solution to a problem that still works?
        </p>
        <p>
          These days I have been thinking more about educational content for the
          working engineer, with particular emphasis on whatever thing is
          currently upsetting me. This blog is that outlet. Here is to hoping
          it’s useful to you.
        </p>
      </PageContent>
    </Layout>
  );
}

export default About;
