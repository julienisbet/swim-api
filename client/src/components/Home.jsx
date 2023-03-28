import { Box, Image, Page, PageContent, PageHeader } from 'grommet';
import List from './workouts/List';
import AppHeader from './layout/AppHeader';

export default function Home() {
  return (
    <Page kind="narrow">
      <AppHeader />
      <PageContent>
        <PageHeader title="Swim Hub" subtitle="find your workout..." />
        <List />
      </PageContent>
    </Page>
  );
}
