export const PINNED_PROJECTS = [
  {
    title: "QLC",
    description: "Fast, multi-threaded compiler for TypeScript definitions from GraphQL",
    technologyDescription: "Rust",
    link: "https://github.com/notarize/qlc",
  },
  {
    title: "solid-a11y",
    description: "Fully accessible, unstyled component library for SolidJS",
    technologyDescription: "TypeScript, SolidJS",
    link: "https://solid-a11y.spookysoftware.dev/",
  },
  {
    title: "YouTube: Spooky Software",
    description:
      "Personal channel promoting career growth, pedagogical content, and inclusivity in engineering",
    link: "https://www.youtube.com/channel/UCuRHr-1aqro-UWcz36hkdoQ",
  },
];

export function computeYearsExperience() {
  const thisYear = new Date().getFullYear();
  return {
    casualYearsExperience: thisYear - 2007,
    professionalYearsExperience: thisYear - 2013,
  };
}
