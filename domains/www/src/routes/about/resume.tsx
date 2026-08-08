import { Title } from "@solidjs/meta";

import { Grid } from "#/page/layout/resume";
import { Header } from "#/profession/resume/header";
import { Main } from "#/profession/resume/main";

export default function Résumé() {
  return (
    <Grid>
      {/* Uses @solidjs/meta Title so there's no prefix */}
      <Title>Eric Kim-Butler's Résumé</Title>
      <Header />
      <Main />
    </Grid>
  );
}
