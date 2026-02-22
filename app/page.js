import { getLatestReports, getTeamInfo, getMembersAndCoaches } from '@/lib/microcms';
import HomeContent from '@/components/HomeContent';

export const revalidate = 60; // ISR: 60秒ごとに再生成

export default async function HomePage() {
  const [reports, team, { players, coaches }] = await Promise.all([
    getLatestReports(4),
    getTeamInfo(),
    getMembersAndCoaches(),
  ]);

  return (
    <HomeContent
      reports={reports}
      team={team}
      players={players.slice(0, 6)}
      coaches={coaches}
    />
  );
}
