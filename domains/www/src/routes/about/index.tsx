import { H1 } from "#/page/hierarchy";
import { Root } from "#/page/layout/root";
import { computeYearsExperience } from "#/profession";
import { Title } from "#/site/meta";
import { paths, THIS_SITES_REPO_URL } from "#/site/navigation";

export default function About() {
  const exp = computeYearsExperience();
  return (
    <Root header={<H1>About Eric</H1>}>
      <Title>About</Title>
      <div class="sps-prose">
        <p>
          Circa 2007, I stumbled upon the great wasteland known as{" "}
          <a href="https://myspace.com/">MySpace.com</a>. I wrote my first lines of CSS trying to
          make the background of my profile a baller shade of{" "}
          <span style={{ color: "#FC3F93" }}>Fuchsia</span>. As an adult, card-carrying Software
          Engineer {exp.casualYearsExperience} years later, I’m still trying to get that same high.
        </p>
        <p>
          I have worked for the last {exp.professionalYearsExperience} years at a few moderately
          successful web-SaaS software startups writing code that only just barely makes the thing
          work. In my defense, isn’t that really what engineering is – making the cheapest solution
          that still works?
        </p>
        <p>
          You can read my <a href={paths.about.resume()}>résumé</a> online.
        </p>
        <p>
          These days I have been thinking about what it means to be an engineer today. why we do do
          those things we do? What values have served me, and do I want to pass those values on?
          Hopefully this blog gives me a chance to occasionally dust off my Philosophy degree and
          share some hard-earned lessons from my experience in the industry.
        </p>

        <h2>About this Website’s Technology</h2>
        <p>
          This website is designed to be fast and accessible, utilizing{" "}
          <a href="https://www.solidjs.com/">Solid</a>. You can always find the source code on the{" "}
          <a href={THIS_SITES_REPO_URL}>Spooky Software GitHub</a>.
        </p>
      </div>
    </Root>
  );
}
