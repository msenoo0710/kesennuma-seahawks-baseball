import { getReports, getTeamInfo } from '@/lib/microcms';
import ReportsContent from '@/components/ReportsContent';

export const revalidate = 60;

export default async function ReportsArchive() {
  try {
    const [reports, team] = await Promise.all([
      getReports(),
      getTeamInfo(),
    ]);
    return <ReportsContent reports={reports} team={team} />;
  } catch (e) {
    return <ReportsContent reports={[]} />;
  }
}