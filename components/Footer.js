import BaseballIcon from './BaseballIcon';

export default function Footer({ team = {} }) {
  const teamName = team.teamName || '〇〇少年野球クラブ';
  const teamLabel = team.teamLabel || 'YOUR TEAM';
  const location = team.location || '';
  const schedule = team.schedule || '';
  const contactInfo = team.contactInfo || '';

  return (
    <footer
      style={{
        background: 'linear-gradient(135deg, #0052D4, #0040A8)',
        padding: '40px 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="stripe-bg-thin" />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'inline-flex',
            background: '#FFD600',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0052D4',
            marginBottom: '12px',
            boxShadow: '0 4px 16px rgba(255,214,0,0.3)',
          }}
        >
          <BaseballIcon size={28} />
        </div>
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '14px',
            color: '#FFD600',
            letterSpacing: '5px',
            marginBottom: '2px',
          }}
        >
          {teamLabel}
        </div>
        <div style={{ fontSize: '14px', color: '#fff', fontWeight: 900, marginBottom: '20px' }}>
          {teamName}
        </div>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', lineHeight: 2 }}>
          {location && <>活動場所：{location.replace(/\n/g, ' ')}<br /></>}
          {schedule && <>活動日時：{schedule.replace(/\n/g, ' ')}<br /></>}
          {contactInfo && <>お問い合わせ：{contactInfo.replace(/\n/g, ' ')}</>}
        </div>
        <div
          style={{
            fontSize: '10px',
            color: 'rgba(255,255,255,0.2)',
            marginTop: '24px',
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: '3px',
          }}
        >
          © {new Date().getFullYear()} {teamLabel} BASEBALL CLUB
        </div>
      </div>
    </footer>
  );
}
