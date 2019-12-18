import React from "react";

import Layout from "@/components/layout";
import PageTitle from "@/components/page/title";

function NotFoundPage() {
  return (
    <Layout title="404: Not Found">
      <PageTitle>404 - That means not found, homie.</PageTitle>
      <p>
        You just hit a route that doesn&#39;t exist... where'd you get this
        link?
      </p>
    </Layout>
  );
}

export default NotFoundPage;
