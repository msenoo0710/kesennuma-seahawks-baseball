import { getReports } from '@/lib/microcms';
import ReportsContent from '@/components/ReportsContent';

export const revalidate = 60;

export default async function ReportsArchive() {
  const reports = await getReports();
  return <ReportsContent reports={reports} />;
}
