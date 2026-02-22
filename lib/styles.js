export const categoryStyle = (cat) => {
  switch (cat) {
    case '試合': return { bg: '#FF1744', text: '#fff', icon: '⚾' };
    case '練習': return { bg: '#00C853', text: '#fff', icon: '💪' };
    case 'イベント': return { bg: '#FF9100', text: '#fff', icon: '🎉' };
    default: return { bg: '#78909C', text: '#fff', icon: '📝' };
  }
};

export const positionColor = (pos) => {
  if (pos === 'ピッチャー') return '#FF1744';
  if (pos === 'キャッチャー') return '#FF9100';
  if (['ファースト', 'セカンド', 'サード', 'ショート', '内野'].some((p) => pos.includes(p))) return '#0066FF';
  return '#00C853';
};

export const gradeColor = (g) => {
  switch (g) {
    case '6年': return { bg: '#FF1744', text: '#fff' };
    case '5年': return { bg: '#0066FF', text: '#fff' };
    case '4年': return { bg: '#00C853', text: '#fff' };
    case '3年': return { bg: '#FF9100', text: '#fff' };
    case '2年': return { bg: '#AA00FF', text: '#fff' };
    default: return { bg: '#78909C', text: '#fff' };
  }
};

export const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  const w = weekdays[d.getDay()];
  return {
    full: `${y}.${String(m).padStart(2, '0')}.${String(day).padStart(2, '0')}`,
    display: `${y}年${m}月${day}日（${w}）`,
    weekday: w,
    month: m,
    year: y,
    day,
  };
};
