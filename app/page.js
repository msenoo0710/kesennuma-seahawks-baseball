import { getLatestReports, getTeamInfo, getMembersAndCoaches } from '@/lib/microcms';
import HomeContent from '@/components/HomeContent';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  try {
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
  } catch (e) {
    return (
      <HomeContent
        reports={[]}
        team={{ teamName: '〇〇少年野球クラブ', introduction: '', schedule: '', location: '', target: '', contactInfo: '', mainVisual: null }}
        players={[]}
        coaches={[]}
      />
    );
  }
}