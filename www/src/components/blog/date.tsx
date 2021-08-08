type Props = {
  publishDate: string;
  modifiedDate: string;
};

function BlogDate({ publishDate, modifiedDate }: Props) {
  return (
    <div className="text-sm">
      <time dateTime={publishDate} aria-label="Publish Date">
        {publishDate}
      </time>
      {publishDate !== modifiedDate && (
        <>
          {" (updated "}
          <time dateTime={modifiedDate} aria-label="Modified Date">
            {modifiedDate}
          </time>
          {")"}
        </>
      )}
    </div>
  );
}

export default BlogDate;
