import { Page, PageContent, PageHeader } from 'grommet';
import List from './workouts/List';

export default function Home() {
  return (
    <Page kind="narrow">
      <PageContent>
        <PageHeader title="Swim Dojo" subtitle="find your workout..." />
        <List />
      </PageContent>
    </Page>
  );
}
