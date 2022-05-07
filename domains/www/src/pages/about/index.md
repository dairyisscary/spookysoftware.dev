---
title: About
layout: "@/layout/Page.astro"
setup: |
  import { computeYearsExperience, PINNED_PROJECTS } from "@/profession/facts";
  const exp = computeYearsExperience();
---

<p>
  Circa 2007, I stumbled upon the great wasteland known as <a href="https://myspace.com/">MySpace.com</a>.
  I wrote my first lines of CSS trying to make the background of my profile a baller shade of
  <span style="color:#FC3F93">Fuchsia</span>. As an adult, card-carrying Software Engineer
  {exp.casualYearsExperience} years later, I’m still trying to get that same high.
</p>

I have worked for the last {exp.professionalYearsExperience} years at a few web-SaaS [software][shoobx]
[startups][notarize] writing code that only just barely makes the thing work. In my defense, isn't that really what
engineering is -- making the cheapest solution that still works? You can read my [full résumé][resume] online.

These days I have been thinking more about educational content for the working practitioner and what it means to be an
engineer today. Hopefully this blog gives me a chance to occasionally dust off my Philosophy degree and share some
hard-earned lessons from my experience in the industry.

### Projects

<ul>
  {PINNED_PROJECTS.map((project) => (
    <li><a href={project.link}>{project.title}</a> — {project.description}</li>
  ))}
  <li><a href="https://github.com/dairyisscary/spookysoftware.dev">This Website's Source Code</a></li>
</ul>

### About this Website's Technology

This website is designed to be fast and accessible, utilizing [Astro][astro]. You can always find the source code on the
[Spooky Software GitHub][spooky_github]. It uses privacy-conscious, cookie-free [analytics][fathom] that respect Do Not
Track and are hosted in the EU. Please consider allowlisting this website from your adblocker so that I can use this
anonymous data to make better content.

[shoobx]: https://www.shoobx.com/
[notarize]: https://www.notarize.com/
[resume]: /about/resume/
[astro]: https://astro.build/
[spooky_github]: https://github.com/dairyisscary/spookysoftware.dev
[fathom]: https://usefathom.com/
