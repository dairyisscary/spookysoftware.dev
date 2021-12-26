export function classnames(...args: (string | false | undefined)[]): string {
  return args.filter(Boolean).join(" ");
}
