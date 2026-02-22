import { getMembersAndCoaches, getTeamInfo } from '@/lib/microcms';
import MembersContent from '@/components/MembersContent';

export const revalidate = 60;

export default async function MembersPage() {
  const [{ players, coaches }, team] = await Promise.all([
    getMembersAndCoaches(),
    getTeamInfo(),
  ]);

  return <MembersContent players={players} coaches={coaches} team={team} />;
}
