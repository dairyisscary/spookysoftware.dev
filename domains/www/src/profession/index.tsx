export function computeYearsExperience() {
  const thisYear = new Date().getFullYear();
  return {
    casualYearsExperience: thisYear - 2007,
    professionalYearsExperience: thisYear - 2013,
  };
}
