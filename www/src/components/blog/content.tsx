import PageContent from "@/components/page/content";

function BlogContent({ children }: { children: string }) {
  return (
    <PageContent>
      <div dangerouslySetInnerHTML={{ __html: children }} />
    </PageContent>
  );
}

export default BlogContent;
