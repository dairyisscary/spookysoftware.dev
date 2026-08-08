function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Default human readable date of YYYY-MM-DD as a `<time />` */
export function Date(props: { class?: string; children: Date }) {
  return (
    <time class={props.class} datetime={props.children.toISOString()}>
      {formatDate(props.children)}
    </time>
  );
}
